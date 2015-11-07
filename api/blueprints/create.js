/**
 * Overridden create bluprint
 *
 * Looks for req.options.where and forces any values found into
 * the created instance. Useful in scoping created objects to
 * an owner.
 */

var actionUtil = require('sails/lib/hooks/blueprints/actionUtil');

module.exports = function(req, res) {

	var Model = actionUtil.parseModel(req);
	var data = actionUtil.parseValues(req);

  // Explicitly set the values in where options to override
  // data given in the request
  _.each(req.options.where, function(value, key) {
    data[key] = value;
  });

	Model.create(data).exec(function created (err, newInstance) {
		if (err) return res.negotiate(err);

		if (req._sails.hooks.pubsub) {
			if (req.isSocket) {
				Model.subscribe(req, newInstance);
				Model.introduce(newInstance);
			}
			Model.publishCreate(newInstance, !req.options.mirror && req);
		}

		res.created(newInstance);
	});
};
