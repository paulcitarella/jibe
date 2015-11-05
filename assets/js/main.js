// Libraries
var jQuery = require('jquery');
window.$ = window.jQuery = jQuery;
var Bootstrap = require('bootstrap');

// Apps
var tasks = require('./apps/tasks');
var login = require('./apps/login');

// Global code
$(document).ready(function() {
  $('body').tooltip({
    container: 'body',
    selector: '.with-tooltip',
    delay: { "show": 500, "hide": 100 }
  });
});
