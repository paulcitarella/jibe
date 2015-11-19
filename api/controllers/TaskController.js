/**
 * TaskController
 *
 * @description :: Server-side logic for managing Tasks
 */

var actionUtil = require('sails/lib/hooks/blueprints/actionUtil');

module.exports = {
  list: function (req, res, next) {
    var query = Task.find();
    if (req.options.where) {
      // Support filterByOwner policy
      query = query.where(req.options.where);
    }
    query.limit( actionUtil.parseLimit(req) )
    .skip( actionUtil.parseSkip(req) )
    .sort( actionUtil.parseSort(req) );
    if (req.options.populateOnly) req.params.populate = req.options.populateOnly;
    query = actionUtil.populateEach(query, req);

    query.then(function(matchingRecords) {
      if (req._sails.hooks.pubsub && req.isSocket) {
        Task.subscribe(req, matchingRecords);
        if (req.options.autoWatch) { Task.watch(req); }
        _.each(matchingRecords, function (record) {
          actionUtil.subscribeDeep(req, record);
        });
      }
      return matchingRecords;

    }).then(function(matchingRecords) {
      return Task.count().then(function(count) {
        res.set('X-Total-Count', count);
        res.ok(matchingRecords);
      });

    }).catch(function(err) {
      res.serverError(err);
    });
  }
};
