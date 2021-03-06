var angular = require('angular');
var angularRoute = require('angular-route');
var spinner = require('angular-spinner');
var util = require('../../util');
var app = angular.module('login', [angularRoute, spinner.name]);

// Routes
app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
    .when('/', {
      templateUrl: '/js/apps/login/templates/index.html',
      controller: ['user', function(user) { this.user = user; }],
      controllerAs: 'loginCtrl'
    })
    .when('/login', {
      templateUrl: '/js/apps/login/templates/login.html',
      controller: 'LoginCtrl',
      controllerAs: 'loginCtrl'
    })
    .when('/register', {
      templateUrl: '/js/apps/login/templates/register.html',
      controller: 'LoginCtrl',
      controllerAs: 'loginCtrl'
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

// Controllers
app.controller('LoginCtrl', ['$scope', '$http', '$window', 'user', require('./controllers/loginCtrl')]);
