// api/controllers/AuthController.js

var _ = require('lodash');
var _super = require('sails-permissions/api/controllers/AuthController');

_.merge(exports, _super);
_.merge(exports, {

  logout: function (req, res) {
    req.logout();
    delete req.user;
    delete req.session.passport;
    req.session.authenticated = false;

    if (!req.isSocket) {
      res.redirect(req.query.next || '/');
    }
    else {
      res.ok();
    }
  }

});
