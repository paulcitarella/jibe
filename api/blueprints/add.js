/**
 * Overridden add bluprint
 *
 * Adds any criteria found in req.options.where to the find query.
 * Useful in scoping the add action to a given user's instances.
 */

var actionUtil = require('sails/lib/hooks/blueprints/actionUtil');
var _ = require('lodash');
var async = require('async');

module.exports = function addToCollection (req, res) {

  // Ensure a model and alias can be deduced from the request.
  var Model = actionUtil.parseModel(req);
  var relation = req.options.alias;
  if (!relation) {
    return res.serverError(new Error('Missing required route option, `req.options.alias`.'));
  }

  // The primary key of the parent record
  var parentPk = req.param('parentid');

  // Get the model class of the child in order to figure out the name of
  // the primary key attribute.
  var associationAttr = _.findWhere(Model.associations, { alias: relation });
  var ChildModel = sails.models[associationAttr.collection];
  var childPkAttr = ChildModel.primaryKey;


  // The child record to associate is defined by either...
  var child;

  // ...a primary key:
  var supposedChildPk = actionUtil.parsePk(req);
  if (supposedChildPk) {
    child = {};
    child[childPkAttr] = supposedChildPk;
  }
  // ...or an object of values:
  else {
    req.options.values = req.options.values || {};
    req.options.values.blacklist = req.options.values.blacklist || ['limit', 'skip', 'sort', 'id', 'parentid'];
    child = actionUtil.parseValues(req);
  }

  if (!child) {
    res.badRequest('You must specify the record to add (either the primary key of an existing record to link, or a new object without a primary key which will be used to create a record then link it.)');
  }

  var createdChild = false;

  async.auto({

    // Look up the parent record
    parent: function (cb) {
      Model.find({id: parentPk})
      .where(req.options.where) // Support filterByOwner policy
      .exec(function foundParent(err, parentRecords) {
        if (err) return cb(err);
        if (!parentRecords.length) return cb({status: 404});
        var parentRecord = parentRecords[0];
        if (!parentRecord[relation]) return cb({status: 404});
        cb(null, parentRecord);
      });
    },

    // If a primary key was specified in the `child` object we parsed
    // from the request, look it up to make sure it exists.  Send back its primary key value.
    // This is here because, although you can do this with `.save()`, you can't actually
    // get ahold of the created child record data, unless you create it first.
    actualChildPkValue: ['parent', function(cb) {

      // Below, we use the primary key attribute to pull out the primary key value
      // (which might not have existed until now, if the .add() resulted in a `create()`)

      // If the primary key was specified for the child record, we should try to find
      // it before we create it.
      if (child[childPkAttr]) {
        ChildModel.find({id: child[childPkAttr]})
        .where(req.options.where) // Support filterByOwner policy
        .exec(function foundChild(err, childRecords) {
          if (err) return cb(err);
          // Didn't find it?  Then try creating it.
          if (!childRecords.length) {return createChild();}
          // Otherwise use the one we found.
          return cb(null, childRecords[0][childPkAttr]);
        });
      }
      // Otherwise, it must be referring to a new thing, so create it.
      else {
        return createChild();
      }

      // Create a new instance and send out any required pubsub messages.
      function createChild() {
        // Explicitly set the values in where options to override
        // data given in the request
        _.each(req.options.where, function(value, key) {
          child[key] = value;
        });

        ChildModel.create(child).exec(function createdNewChild (err, newChildRecord){
          if (err) return cb(err);
          if (req._sails.hooks.pubsub) {
            if (req.isSocket) {
              ChildModel.subscribe(req, newChildRecord);
              ChildModel.introduce(newChildRecord);
            }
            ChildModel.publishCreate(newChildRecord, !req.options.mirror && req);
          }

          createdChild = true;
          return cb(null, newChildRecord[childPkAttr]);
        });
      }

    }],

    // Add the child record to the parent's collection
    add: ['parent', 'actualChildPkValue', function(cb, async_data) {
      try {
        // `collection` is the parent record's collection we
        // want to add the child to.
        var collection = async_data.parent[relation];
        collection.add(async_data.actualChildPkValue);
        return cb();
      }
      // Ignore `insert` errors
      catch (err) {
        // if (err && err.type !== 'insert') {
        if (err) {
          return cb(err);
        }
        // else if (err) {
        //   // if we made it here, then this child record is already
        //   // associated with the collection.  But we do nothing:
        //   // `add` is idempotent.
        // }

        return cb();
      }
    }]
  },

  // Save the parent record
  function readyToSave (err, async_data) {

    if (err) return res.negotiate(err);
    async_data.parent.save(function saved(err) {

      // Ignore `insert` errors for duplicate adds
      // (but keep in mind, we should not publishAdd if this is the case...)
      var isDuplicateInsertError = (err && typeof err === 'object' && err.length && err[0] && err[0].type === 'insert');
      if (err && !isDuplicateInsertError) return res.negotiate(err);

      // Only broadcast an update if this isn't a duplicate `add`
      // (otherwise connected clients will see duplicates)
      if (!isDuplicateInsertError && req._sails.hooks.pubsub) {

        // Subscribe to the model you're adding to, if this was a socket request
        if (req.isSocket) { Model.subscribe(req, async_data.parent); }
          // Publish to subscribed sockets
        Model.publishAdd(async_data.parent[Model.primaryKey], relation, async_data.actualChildPkValue, !req.options.mirror && req, {noReverse: createdChild});
      }

      // Finally, look up the parent record again and populate the relevant collection.
      // TODO: populateEach
      Model.findOne(parentPk).populate(relation).exec(function(err, matchingRecord) {
        if (err) return res.serverError(err);
        if (!matchingRecord) return res.serverError();
        if (!matchingRecord[relation]) return res.serverError();
        return res.ok(matchingRecord);
      });
    });

  }); // </async.auto>
};
