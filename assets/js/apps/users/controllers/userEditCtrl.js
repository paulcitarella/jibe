var _ = require('lodash');

module.exports = function($routeParams, userService) {
  var self = this;
  self.error = false;
  self.loading = 1;
  self.user = null;

  userService.get(parseInt($routeParams.id)).then(function(user) {
    self.user = user;
  }).catch(function(error) {
    self.error = true;
  }).finally(function() {
    self.loading--;
  });

  self.isAdmin = function() {
    return self.user.roles && _.any(self.user.roles, function(role) { return role.name === 'Administrator'; });
  };

  self.update = function() {
    console.log('saving...');
  };
};
