// Libraries
var jQuery = require('jquery');
window.$ = window.jQuery = jQuery;
var Bootstrap = require('bootstrap');

// Apps
var login = require('./apps/login');
var users = require('./apps/users');
var tasks = require('./apps/tasks');

// Global code
$(document).ready(function() {
  $('body').tooltip({
    container: 'body',
    selector: '.with-tooltip',
    delay: { "show": 500, "hide": 100 }
  });
});
