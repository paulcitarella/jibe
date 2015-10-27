var app = require('angular').module('tasks', []);

app.controller('TaskListCtrl', ['$scope', require('./controllers/taskListCtrl')]);
