var _ = require('lodash');

module.exports = function($routeParams, userService) {
  var self = this;
  self.error = false;
  self.loading = 0;
  self.initializing = 1;
  self.user = null;
  self.msg = null;

  userService.get(parseInt($routeParams.id)).then(function(user) {
    self.user = user;
  }).catch(function(error) {
    self.error = true;
  }).finally(function() {
    self.initializing--;
  });

  self.isAdmin = function() {
    return self.user && self.user.roles &&
      _.any(self.user.roles, function(role) { return role.name === 'Administrator'; });
  };

  self.save = function() {
    self.error = false;
    self.msg = null;
    self.loading++;

    userService.update(self.user)
      .then(function(user) {
        self.msg = 'Changes saved.';
      })
      .catch(function(err) {
        self.error = true;

      }).finally(function() {
        self.loading--;
      });
  };
};
