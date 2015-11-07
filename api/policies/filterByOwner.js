/**
 * filterByOwner
 *
 * @module      :: Policy
 * @description :: Adds current user as "owner" in criteria to be applied
 *                 in any queries for this request.
 *
 */

module.exports = function(req, res, next) {
  if (req.user) {
    req.options.where = req.options.where || {};
    req.options.where.owner = req.user.id;
  }

  return next();
};
