var _ = require('lodash');
var util = require('../../../util');

module.exports = function($http, $q, data, dataTotalCount) {
  var paginator = util.paginator(dataTotalCount, data.length); // Set page size based on init data size

  var userService = {
    users: data || [],

    get: function(id) {
      var user = _.find(userService.users, function(it) { return it.id === id; });
      if (user) return $q.resolve(_.merge({}, user)); // Deep copy so unsaved edits aren't cached

      return $q(function(resolve, reject) {
        $http.get('/users/' + id)
          .then(function(response) {
            resolve(response.data);

          }).catch(function(response) {
            reject(response.data);
          });
      });
    },

    update: function(user) {
      return $q(function(resolve, reject) {
        $http.put('/users/' + user.id, user)
          .then(function(response) {
            var index = _.findIndex(userService.users, function(it) { return it.id === user.id; });
            if (index > -1) userService.users[index] = response.data;
            resolve(response.data);

          }).catch(function(response) {
            reject(response.data);
          });
      });
    },

    delete: function(user) {
      _.remove(userService.users, function(it) { return it.id === user.id; });

      return $q(function(resolve, reject) {
        $http.delete('/users/' + user.id)
          .then(function(response) {
            resolve(response.data);

          }).catch(function(response) {
            reject(response.data);
          });
      });
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

          }).catch(function(response) {
            reject(response.data);
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

          }).catch(function(response) {
            reject(response.data);
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

          }).catch(function(response) {
            reject(response.data);
          });
      });

    },

    paginator: paginator
  };

  return userService;
};
