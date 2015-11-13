var angular = require('angular');
var angularRoute = require('angular-route');
var spinner = require('angular-spinner');
var util = require('../../util');
var app = angular.module('users', [angularRoute, spinner.name]);

// Routes
app.config(['$routeProvider', '$locationProvider', '$httpProvider',
  function($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
    .when('/', {
      templateUrl: '/js/apps/users/templates/userList.html',
      controller: 'UserListCtrl',
      controllerAs: 'userListCtrl'
    })
    .when('/edit/:id', {
      templateUrl: '/js/apps/users/templates/userEdit.html',
      controller: 'UserEditCtrl',
      controllerAs: 'userEditCtrl'
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
app.controller('UserListCtrl', ['$scope', '$window', 'userService', require('./controllers/userListCtrl')]);
app.controller('UserEditCtrl', ['$scope', '$routeParams', 'userService', require('./controllers/userEditCtrl')]);
app.factory('userService', ['$http', '$q', 'data', 'dataTotalCount', require('./services/userService')]);
