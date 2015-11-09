var _ = require('lodash');

module.exports = function($scope, $http, $window, users) {
  $scope.loading = 0;
  $scope.users = users || [];

  $scope.roleList = function(user) {
    return _.map(user.roles, function(role) { return role.name; }).join(', ');
  };

  $scope.delete = function(user) {
    if ($window.confirm('Are you sure you want to delete this user? This operation can not be undone.')) {
      console.log('deleting');
    }
  };
};
