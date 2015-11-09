/**
 * Overridden destroy bluprint
 *
 * Adds any criteria found in req.options.where to the find query.
 * Useful in scoping the destroy action to a given user's instances.
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

    Model.destroy(pk).exec(function destroyedRecord (err) {
      if (err) return res.negotiate(err);

      if (sails.hooks.pubsub) {
        Model.publishDestroy(pk, !sails.config.blueprints.mirror && req, {previous: record});
        if (req.isSocket) {
          Model.unsubscribe(req, record);
          Model.retire(record);
        }
      }

      return res.ok(record);
    });
  });
};
