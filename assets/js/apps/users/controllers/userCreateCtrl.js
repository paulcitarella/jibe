var _ = require('lodash');
var util = require('../../../util');

module.exports = function($scope, $location, Flash, userService) {
  var self = this;
  self.loading = 0;
  self.initializing = 0;
  self.user = {};
  self.msg = null;

  self.save = function() {
    self.msg = null;
    self.loading++;

    userService.create(self.user)
      .then(function(user) {
        util.flashSuccess(Flash, 'User has been created.');
        $location.path('/');
      })
      .catch(function(err) {
        if (err.status === 400) {
          if (err.invalidAttributes.email || err.invalidAttributes.username) {
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
