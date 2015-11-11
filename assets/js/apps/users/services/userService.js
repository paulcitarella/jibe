var _ = require('lodash');
var util = require('../../../util');

module.exports = function($http, $q, data, dataTotalCount) {
  var paginator = util.paginator(dataTotalCount, data.length); // Set page size based on init data size

  var userService = {
    users: data || [],

    delete: function(user) {
      _.remove(userService.users, function(it) { return it.id === user.id; });
      return $http.delete('/users/' + user.id);
    },

    nextPage: function() {
      if (!paginator.hasNextPage()) return $q.resolve(false);

      return $q(function(resolve, reject) {
        $http.get('/users?skip=' + (paginator.pageSize * paginator.currentPage))
          .then(function(response) {
            paginator.setCount(response);
            paginator.currentPage++;
            angular.copy(response.data, userService.users);
            resolve(response.data);
          }).catch(function(err) {
            reject(err);
          });
      });
    },

    previousPage: function() {
      if (paginator.currentPage <= 1) return $q.resolve(false);

      return $q(function(resolve, reject) {
        $http.get('/users?skip=' + (paginator.pageSize * (paginator.currentPage - 2)))
          .then(function(response) {
            paginator.setCount(response);
            paginator.currentPage--;
            angular.copy(response.data, userService.users);
            resolve(response.data);
          }).catch(function(err) {
            reject(err);
          });
      });
    },

    toPage: function(toPageNum) {
      if (toPageNum < 1 || toPageNum > paginator.getPageCount()) return $q.resolve(false);

      return $q(function(resolve, reject) {
        $http.get('/users?skip=' + (paginator.pageSize * (toPageNum - 1)))
          .then(function(response) {
            paginator.setCount(response);
            paginator.currentPage = toPageNum;
            angular.copy(response.data, userService.users);
            resolve(response.data);
          }).catch(function(err) {
            reject(err);
          });
      });

    },

    paginator: paginator
  };

  return userService;
};
