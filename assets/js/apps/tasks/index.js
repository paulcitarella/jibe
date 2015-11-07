var angular = require('angular');
var angularRoute = require('angular-route');
var spinner = require('angular-spinner');
var util = require('../../util');
var app = angular.module('tasks', [angularRoute, spinner.name]);

// Routes
app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', {
      templateUrl: '/js/apps/tasks/templates/taskList.html',
      controller: 'TaskListCtrl'
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
app.controller('TaskListCtrl', ['$scope', '$http', 'user', 'tasks', require('./controllers/taskListCtrl')]);
