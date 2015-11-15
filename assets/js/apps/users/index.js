var angular = require('angular');
var angularRoute = require('angular-route');
var angularAnimate = require('angular-animate');
var spinner = require('angular-spinner');
var flash = require('angular-flash-alert');
var util = require('../../util');
var app = angular.module('users', [angularRoute, angularAnimate, 'angularSpinner', 'flash']);

// Routes
app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl: '/js/apps/users/templates/userList.html',
      controller: 'UserListCtrl',
      controllerAs: 'userListCtrl'
    })
    .when('/edit/:id', {
      templateUrl: '/js/apps/users/templates/userEdit.html',
      controller: 'UserEditCtrl',
      controllerAs: 'userCtrl'
    })
    .when('/create', {
      templateUrl: '/js/apps/users/templates/userEdit.html',
      controller: 'UserCreateCtrl',
      controllerAs: 'userCtrl'
    })
    .otherwise({
        redirectTo: '/'
    });
  }
]);

// Set up spinner themes
app.config(['usSpinnerConfigProvider', util.configSpinnerThemes]);

// Preload angular templates into the cache
app.run(['$templateCache', require('./templates')]);

// Controllers
app.controller('UserListCtrl', ['$scope', '$window', 'Flash', 'userService', require('./controllers/userListCtrl')]);
app.controller('UserEditCtrl', ['$scope', '$routeParams', 'Flash', 'userService', require('./controllers/userEditCtrl')]);
app.controller('UserCreateCtrl', ['$scope', '$location', 'Flash', 'userService', require('./controllers/userCreateCtrl')]);
app.factory('userService', ['$http', '$q', 'data', 'dataTotalCount', require('./services/userService')]);
