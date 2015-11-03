var angular = require('angular');
var app = angular.module('login', [require('angular-route')]);

// Routes
app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', {
      templateUrl: '/js/apps/login/templates/index.html'
    })
    .when('/login', {
      templateUrl: '/js/apps/login/templates/login.html',
      controller: 'LoginCtrl'
    })
    .when('/signup', {
      templateUrl: '/js/apps/login/templates/signup.html',
      controller: 'LoginCtrl'
    })
    .otherwise({
        redirectTo: '/'
    });
  }
]);

// Preload angular templates into the cache
app.run(['$templateCache', require('./templates')]);

// Controllers
app.controller('LoginCtrl', ['$scope', require('./controllers/loginCtrl')]);
