module.exports = function($scope, $timeout, $http, $window) {
  $scope.loading = false;

  $scope.login = function() {
    $scope.loading = true;

    $http.post('/auth/local', {
      identifier: $scope.email,
      password: $scope.password
    }).then(function(response) {
      $window.location.href = '/tasks';
    }).catch(function(response) {
      $scope.error = response;
    });
  };

  $scope.signup = function() {
    // Do signup
    console.log('do signup');
  };
};
