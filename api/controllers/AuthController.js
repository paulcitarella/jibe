// api/controllers/AuthController.js

var _ = require('lodash');
var _super = require('sails-auth/api/controllers/AuthController');

_.merge(exports, _super);
_.merge(exports, {

  // Fix a bug in the current logout implementation
  logout: function (req, res) {
    req.logout();
    delete req.user;
    delete req.session.passport;
    req.session.authenticated = false;

    if (!req.isSocket && !req.wantsJSON) {
      res.redirect(req.query.next || '/');
    }
    else {
      res.ok();
    }
  }

});
