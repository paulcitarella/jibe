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
      $window.location.href = '/tasklist';
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

  $scope.register = function() {
    $scope.error = false;
    $scope.loading = true;

    $http.post('/register', {
      firstname: $scope.firstname,
      lastname: $scope.lastname,
      email: $scope.email,
      password: $scope.password

    }).then(function(response) {
      $window.location.href = '/tasklist';

    }).catch(function(response) {
      if (response.status === 400) {
        if (response.data.invalidAttributes.email) {
          $scope.registerForm.email.$setValidity('server', false);
        } else {
          $scope.error = true;
        }
      } else {
        $scope.error = true;
      }

    }).finally(function() {
      $scope.loading = false;
    });
  };
};
