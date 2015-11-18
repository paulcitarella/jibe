module.exports = function($scope, $http, $window, user) {
  var self = this;
  self.loading = false;
  self.user = user;

  self.login = function() {
    self.error = false;
    self.invalid = false;
    self.loading = true;

    $http.post('/auth/local', {
      identifier: self.email,
      password: self.password

    }).then(function(response) {
      $window.location.href = '/tasks';

    }).catch(function(response) {
      if (response.status === 403) {
        self.invalid = true;
      } else {
        self.error = true;
      }

    }).finally(function() {
      self.loading = false;
    });
  };

  self.register = function() {
    self.error = false;
    self.loading = true;

    $http.post('/register', {
      firstname: self.firstname,
      lastname: self.lastname,
      email: self.email,
      password: self.password

    }).then(function(response) {
      $window.location.href = '/tasks';

    }).catch(function(response) {
      if (response.status === 400) {
        if (response.data.invalidAttributes.email || response.data.invalidAttributes.username) {
          $scope.registerForm.email.$setValidity('server', false);
        } else {
          self.error = true;
        }
      } else {
        self.error = true;
      }

    }).finally(function() {
      self.loading = false;
    });
  };
};
