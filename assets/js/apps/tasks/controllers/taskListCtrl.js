module.exports = function($scope) {
  $scope.tasks = [];

  $scope.addTask = function() {
    if ($scope.newTask) {
      $scope.tasks.push({title:$scope.newTask});
      $scope.newTask = null;
    }
  };

  $scope.deleteTask  = function(task) {
    $scope.tasks.splice($scope.tasks.indexOf(task), 1);
  };
};
