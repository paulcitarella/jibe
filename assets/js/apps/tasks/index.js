var angular = require('angular');
var app = angular.module('tasks', [require('angular-route')]);

app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', {
      templateUrl: 'assets/templates/tasks/taskList.html',
      controller: 'TaskListCtrl'
    })
    .otherwise({
        redirectTo: '/'
    });
  }
]);

app.config(['$provide', require('../util').jstCache]);

app.controller('TaskListCtrl', ['$scope', require('./controllers/taskListCtrl')]);
