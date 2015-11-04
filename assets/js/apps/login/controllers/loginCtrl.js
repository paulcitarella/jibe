module.exports = function($scope, $timeout, $http, $window, user) {
  $scope.loading = false;
  $scope.user = user;

  $scope.login = function() {
    $scope.error = false;
    $scope.invalid = false;
    $scope.loading = true;

    $http.post('/auth/local', {
      identifier: $scope.email,
      password: $scope.password
    }).then(function(response) {
      $window.location.href = '/tasks';
    }).catch(function(response) {
      if (response.status === 403) {
        $scope.invalid = true;
      } else {
        $scope.error = true;
      }
    }).finally(function() {
      $scope.loading = false;
    });
  };

  $scope.signup = function() {
    // Do signup
    console.log('do signup');
  };
};
