/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 */

module.exports = {
  register: function (req, res, next) {
    sails.services.passport.protocols.local.register(req.body, function (err, user) {
      if (err) return next(err);

      req.login(user, function (err) {
        if (err) return next(err);

        req.session.authenticated = true;
        res.ok(user);
      });
    });
  },

  create: function (req, res, next) {
    sails.services.passport.protocols.local.register(req.body, function (err, user) {
      if (err) return next(err);

      res.ok(user);
    });
  },

  me: function (req, res) {
    res.ok(req.user);
  }
};
