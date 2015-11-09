/**
 * Overridden find bluprint
 *
 * Adds an optional `populateOnly` request option to selectively
 * populate associations.
 */

var actionUtil = require('sails/lib/hooks/blueprints/actionUtil');
var _ = require('lodash');

module.exports = function findRecords (req, res) {
  var DEFAULT_POPULATE_LIMIT = sails.config.blueprints.defaultLimit || 30;
  var Model = actionUtil.parseModel(req);

  if ( actionUtil.parsePk(req) ) {
    return require('./findOne')(req,res);
  }

  var query = Model.find()
  .where( actionUtil.parseCriteria(req) )
  .limit( actionUtil.parseLimit(req) )
  .skip( actionUtil.parseSkip(req) )
  .sort( actionUtil.parseSort(req) );
  if (req.options.populateOnly) req.params.populate = req.options.populateOnly;
  query = actionUtil.populateEach(query, req);

  query.exec(function found(err, matchingRecords) {
    if (err) return res.serverError(err);

    if (req._sails.hooks.pubsub && req.isSocket) {
      Model.subscribe(req, matchingRecords);
      if (req.options.autoWatch) { Model.watch(req); }
      _.each(matchingRecords, function (record) {
        actionUtil.subscribeDeep(req, record);
      });
    }

    res.ok(matchingRecords);
  });
};
