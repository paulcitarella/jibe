/**
 * Custom handlebars helper that renders the contents of
 * the helper if the current user has the Administrator
 * role. Requires a user instance to be passed in.
 */

var _ = require('lodash');

module.exports = function (user, options) {
  var isAdmin = user && user.roles && _.any(user.roles, 'name', 'Administrator');
  if (isAdmin) return options.fn(this);
};
