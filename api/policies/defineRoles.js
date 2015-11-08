/**
 * defineRoles
 *
 * @module      :: Policy
 * @description :: Fills in the roles on req.user.
 */

module.exports = function(req, res, next) {
  if (!req.user) return next();

  User.findOne(req.user.id)
    .populate('roles')
    .then(function (user) {
      req.user = res.locals.user = user;
    })
    .catch(sails.log.error)
    .finally(function (error) {
      next();
    });
};
