module.exports = function taskListCtrl($scope) {
  $scope.tasks = [];

  $scope.addTask = function addTask() {
    if ($scope.newTask) {
      $scope.tasks.push({title:$scope.newTask});
      $scope.newTask = null;
    }
  };
};
