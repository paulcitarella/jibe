var _ = require('lodash');
var util = require('../../../util');

module.exports = function($http, Flash, user, tasks) {
  var self = this;
  self.loading = 0;
  self.user = user;
  self.tasks = tasks || [];

  self.addTask = function() {
    if (self.newTask) {
      var task = {
        title: self.newTask
      };
      self.tasks.push(task);
      self.newTask = null;
      self.loading++;

      $http.post('/tasks', task).then(function(response) {
        _.merge(task, response.data);

      }).catch(function(response) {
        util.flashError(Flash);

      }).finally(function() {
        self.loading--;
      });
    }
  };

  self.deleteTask  = function(task) {
    self.tasks.splice(self.tasks.indexOf(task), 1);
    self.loading++;

    $http.delete('/tasks/' + task.id, task).catch(function(response) {
      util.flashError(Flash);

    }).finally(function() {
      self.loading--;
    });
  };
};
