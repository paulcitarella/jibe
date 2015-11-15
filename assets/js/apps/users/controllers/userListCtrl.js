var _ = require('lodash');
var util = require('../../../util');

module.exports = function($scope, $window, Flash, userService) {
  var self = this;
  self.loading = 0;
  self.paging = 0;
  self.users = userService.users;
  self.paginator = userService.paginator;
  $scope.paginator = userService.paginator; // Required to watch service variables
  self.toPageNum = 1;

  self.roleList = function(user) {
    return _.map(user.roles, function(role) { return role.name; }).join(', ');
  };

  self.delete = function(user) {
    if ($window.confirm('Are you sure you want to delete this user? This operation can not be undone.')) {
      self.loading++;

      userService.delete(user).then(function() {
        util.flashSuccess(Flash, 'User has been deleted.');
      })
      .catch(function(err) {
        util.flashError(Flash);

      }).finally(function() {
        self.loading--;
      });
    }
  };

  self.nextPage = function() {
    self.paging++;

    userService.nextPage().catch(function(err) {
        util.flashError(Flash);

      }).finally(function() {
        self.paging--;
      });
  };

  self.previousPage = function() {
    self.paging++;

    userService.previousPage().catch(function(err) {
        util.flashError(Flash);

      }).finally(function() {
        self.paging--;
      });
  };

  self.toPage = _.debounce(function() {
    self.paging++;

    userService.toPage(self.toPageNum).catch(function(err) {
        util.flashError(Flash);

      }).finally(function() {
        self.paging--;
      });
  }, 500);

  self.resetPageNum = function() {
    self.toPageNum = self.paginator.currentPage;
  };

  $scope.$watch('paginator.currentPage', function(newValue, oldValue) {
    self.toPageNum = newValue;
  });

};
