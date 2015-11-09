/**
 * populateUser
 *
 * @description :: Seletively populates user models with only the roles
 * association.
 */

module.exports = function(req, res, next) {
  req.options.populateOnly = 'roles';
  return next();
};
