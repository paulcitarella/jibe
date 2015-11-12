/**
 * Overridden update bluprint
 *
 * Adds any criteria found in req.options.where to the find query and
 * looks for req.options.where and forces any values found into
 * the created instance. Useful in scoping updated objects to
 * an owner.
 */

var actionUtil = require('sails/lib/hooks/blueprints/actionUtil');
var util = require('util');
var _ = require('lodash');

module.exports = function updateOneRecord (req, res) {

  var Model = actionUtil.parseModel(req);
  var pk = actionUtil.requirePk(req);
  var values = actionUtil.parseValues(req);

  // Omit the path parameter `id` from values, unless it was explicitly defined
  // elsewhere (body/query):
  var idParamExplicitlyIncluded = ((req.body && req.body.id) || req.query.id);
  if (!idParamExplicitlyIncluded) delete values.id;

  // Explicitly set the values in where options to override
  // value given in the request
  _.each(req.options.where, function(value, key) {
    values[key] = value;
  });

  var query = Model.find({id: pk})
  .where(req.options.where) // Only look for explicit scoping options
  .populateAll().exec(function found(err, matchingRecords) {
    if (err) return res.serverError(err);
    if (!matchingRecords.length) return res.notFound();

    var matchingRecord = matchingRecords[0];
    Model.update(pk, values).exec(function updated(err, records) {
      if (err) return res.negotiate(err);

      if (!records || !records.length || records.length > 1) {
        req._sails.log.warn(util.format('Unexpected output from `%s.update`.', Model.globalId));
      }

      var updatedRecord = records[0];

      if (req._sails.hooks.pubsub) {
        if (req.isSocket) { Model.subscribe(req, records); }
        Model.publishUpdate(pk, _.cloneDeep(values), !req.options.mirror && req, {
          previous: matchingRecord.toJSON()
        });
      }

      var query = Model.findOne(updatedRecord[Model.primaryKey]);
      if (req.options.populateOnly) req.params.populate = req.options.populateOnly;
      query = actionUtil.populateEach(query, req);
      query.exec(function foundAgain(err, populatedRecord) {
        if (err) return res.serverError(err);
        if (!populatedRecord) return res.serverError('Could not find record after updating!');
        res.ok(populatedRecord);
      });

    });
  });
};
