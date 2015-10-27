module.exports = function taskListCtrl($scope) {
  $scope.tasks = [];

  $scope.addTask = function addTask() {
    if ($scope.newTask) {
      $scope.tasks.push({title:$scope.newTask});
      $scope.newTask = null;
    }
  };

  $scope.deleteTask  = function deleteTask(task) {
    $scope.tasks.splice($scope.tasks.indexOf(task), 1);
  };
};
