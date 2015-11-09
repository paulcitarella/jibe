/**
 * Overridden findOne bluprint
 *
 * Adds any criteria found in req.options.where to the find query.
 * Useful in scoping the findOne action to a given user's instances.
 */

var actionUtil = require('sails/lib/hooks/blueprints/actionUtil');

module.exports = function(req, res) {

  var Model = actionUtil.parseModel(req);
  var pk = actionUtil.requirePk(req);

  var query = Model.find({id: pk})
  .where(actionUtil.parseCriteria(req));
  if (req.options.populateOnly) req.params.populate = req.options.populateOnly;
  query = actionUtil.populateEach(query, req);
  query.exec(function found(err, matches) {
    if (err) return res.serverError(err);
    if (!matches.length) return res.notFound('No record found with the specified `id`.');
    var record = matches[0];

    if (sails.hooks.pubsub && req.isSocket) {
      Model.subscribe(req, record);
      actionUtil.subscribeDeep(req, record);
    }

    res.ok(record);
  });

};
