var _ = require('lodash');

module.exports = function($window, userService) {
  var self = this;
  self.error = false;
  self.loading = 0;
  self.users = userService.users;

  self.roleList = function(user) {
    return _.map(user.roles, function(role) { return role.name; }).join(', ');
  };

  self.delete = function(user) {
    if ($window.confirm('Are you sure you want to delete this user? This operation can not be undone.')) {
      self.error = false;
      self.loading++;

      userService.delete(user).catch(function(response) {
        self.error = true;

      }).finally(function() {
        self.loading--;
      });
    }
  };
};
