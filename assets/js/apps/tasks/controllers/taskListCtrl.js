var _ = require('lodash');

module.exports = function($scope, $http, user, tasks) {
  $scope.loading = 0;
  $scope.user = user;
  $scope.tasks = tasks || [];

  $scope.addTask = function() {
    if ($scope.newTask) {
      var task = {
        title: $scope.newTask
      };
      $scope.tasks.push(task);
      $scope.newTask = null;
      $scope.error = false;
      $scope.loading++;

      $http.post('/tasks', task).then(function(response) {
        _.merge(task, response.data);

      }).catch(function(response) {
        $scope.error = true;

      }).finally(function() {
        $scope.loading--;
      });
    }
  };

  $scope.deleteTask  = function(task) {
    $scope.tasks.splice($scope.tasks.indexOf(task), 1);
    $scope.error = false;
    $scope.loading++;

    $http.delete('/tasks/' + task.id, task).catch(function(response) {
      $scope.error = true;

    }).finally(function() {
      $scope.loading--;
    });
  };
};
