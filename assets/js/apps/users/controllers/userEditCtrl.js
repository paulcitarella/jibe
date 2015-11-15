var _ = require('lodash');
var util = require('../../../util');

module.exports = function($scope, $routeParams, Flash, userService) {
  var self = this;
  self.loading = 0;
  self.initializing = 1;
  self.user = null;

  userService.get(parseInt($routeParams.id)).then(function(user) {
    self.user = user;
  }).catch(function(error) {
    util.flashError(Flash);
  }).finally(function() {
    self.initializing--;
  });

  self.isAdmin = function() {
    return self.user && self.user.roles &&
      _.any(self.user.roles, function(role) { return role.name === 'Administrator'; });
  };

  self.save = function() {
    self.loading++;

    userService.update(self.user)
      .then(function(user) {
        util.flashSuccess(Flash, 'Changes have been saved.');
      })
      .catch(function(err) {
        if (err.error === 'E_VALIDATION') {
          if (err.invalidAttributes.email) {
            $scope.userForm.email.$setValidity('server', false);
          } else {
            util.flashError(Flash);
          }
        } else {
          util.flashError(Flash);
        }

      }).finally(function() {
        self.loading--;
      });
  };
};
