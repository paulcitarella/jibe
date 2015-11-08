/**
 * isAdmin
 *
 * @description :: Enforces that the current user has the
 * Adminstrator role.
 */

var _ = require('lodash');

module.exports = function(req, res, next) {
  var isAdmin = req.user && req.user.roles && _.any(req.user.roles, 'name', 'Administrator');
  return isAdmin ? next() : res.forbidden();
};
