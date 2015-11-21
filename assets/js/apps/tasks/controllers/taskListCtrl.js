var _ = require('lodash');
var util = require('../../../util');

module.exports = function($scope, $http, Flash, user, tasks, socket) {
  var self = this;
  self.loading = 0;
  self.user = user;
  self.tasks = tasks || [];

  if (!socket.listeningToTasks) {
    socket.listeningToTasks = true;

    // Get the tasks list even though we already have it
    // to subscribe to the collection.
    socket.get('/api/tasks', function(data, jwres) {
      // Do nothing
    });

    socket.on('task', function(msg) {
      switch(msg.verb) {
        case 'created':
          self.tasks.push(msg.data);
          $scope.$apply();
          break;

        case 'destroyed':
          removeTask(msg);
          $scope.$apply();
          break;

        default: return;
      }
    });
  }

  self.addTask = function() {
    if (self.newTask) {
      var task = {
        title: self.newTask
      };
      self.tasks.push(task);
      self.newTask = null;
      self.loading++;

      socket.post('/api/tasks', task, function(data, jwres) {
        self.loading--;
        if (_.inRange(jwres.statusCode, 200, 299)) {
          _.merge(task, data);
          $scope.$apply();
        } else {
          self.tasks.splice(self.tasks.indexOf(task), 1);
          util.flashError(Flash);
        }
      });
    }
  };

  self.deleteTask  = function(task) {
    var index = removeTask(task);
    self.loading++;

    socket.delete('/api/tasks/' + task.id, function(data, jwres) {
      self.loading--;
      if (_.inRange(jwres.statusCode, 200, 299)) {
        $scope.$apply();
      } else {
        self.tasks.splice(index, 0, task);
        util.flashError(Flash);
      }
    });
  };

  function removeTask(task) {
    var index = _.findIndex(self.tasks, {id: task.id});
    self.tasks.splice(index, 1);
    return index;
  }
};
