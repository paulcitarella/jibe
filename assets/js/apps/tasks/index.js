var angular = require('angular');
var app = angular.module('tasks', [require('angular-route')]);

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

// Preload angular templates into the cache
app.run(['$templateCache', require('./templates')]);

// Controllers
app.controller('TaskListCtrl', ['$scope', require('./controllers/taskListCtrl')]);
