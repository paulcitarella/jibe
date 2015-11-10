var angular = require('angular');
var angularRoute = require('angular-route');
var spinner = require('angular-spinner');
var util = require('../../util');
var app = angular.module('users', [angularRoute, spinner.name]);

// Routes
app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', {
      templateUrl: '/js/apps/users/templates/userList.html',
      controller: 'UserListCtrl'
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
app.factory('userService', ['$http', '$q', 'data', 'dataTotalCount', require('./services/userService')]);
