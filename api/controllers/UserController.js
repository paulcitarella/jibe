/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 */

var actionUtil = require('sails/lib/hooks/blueprints/actionUtil');

module.exports = {
  list: function (req, res, next) {
    var query = User.find()
    .where(req.options.where) // Support filterByOwner policy
    .limit( actionUtil.parseLimit(req) )
    .skip( actionUtil.parseSkip(req) )
    .sort( actionUtil.parseSort(req) );
    if (req.options.populateOnly) req.params.populate = req.options.populateOnly;
    query = actionUtil.populateEach(query, req);

    query.then(function(matchingRecords) {
      if (req._sails.hooks.pubsub && req.isSocket) {
        User.subscribe(req, matchingRecords);
        if (req.options.autoWatch) { User.watch(req); }
        _.each(matchingRecords, function (record) {
          actionUtil.subscribeDeep(req, record);
        });
      }
      return matchingRecords;

    }).then(function(matchingRecords) {
      return User.count()
        .where(req.options.where)
        .then(function(count) {
        res.set('X-Total-Count', count);
        res.ok(matchingRecords);
      });

    }).catch(function(err) {
      res.serverError(err);
    });
  },

  register: function (req, res, next) {
    sails.services.passport.protocols.local.register(req.body, function (err, user) {
      if (err) return next(err);

      req.login(user, function (err) {
        if (err) return next(err);

        req.session.authenticated = true;
        res.ok(user);
      });
    });
  },

  create: function (req, res, next) {
    sails.services.passport.protocols.local.register(req.body, function (err, user) {
      if (err) return next(err);

      res.ok(user);
    });
  },

  me: function (req, res) {
    res.ok(req.user);
  }
};
