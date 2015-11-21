var angular = require('angular');
var angularRoute = require('angular-route');
var angularAnimate = require('angular-animate');
var spinner = require('angular-spinner');
var flash = require('angular-flash-alert');
var util = require('../../util');
var app = angular.module('tasks', [angularRoute, angularAnimate, 'angularSpinner', 'flash']);

// Routes
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl: '/js/apps/tasks/templates/taskList.html',
      controller: 'TaskListCtrl',
      controllerAs: 'taskListCtrl'
    })
    .otherwise({
        redirectTo: '/'
    });
  }
]);

// Set HTML5 URL mode
app.config(['$locationProvider', function($locationProvider) {
  $locationProvider.html5Mode(true);
}]);

// Set up spinner themes
app.config(['usSpinnerConfigProvider', util.configSpinnerThemes]);

// Preload angular templates into the cache
app.run(['$templateCache', require('./templates')]);

// Set up websocket factory
app.factory('socket', function() { return io.sails.connect(); });

// Controllers
app.controller('TaskListCtrl', ['$scope', '$http', 'Flash', 'user', 'data', 'socket', require('./controllers/taskListCtrl')]);
