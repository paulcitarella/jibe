var _ = require('lodash');

module.exports = function($http, $q, data, dataTotalCount) {
  var userService = {
    users: data || [],
    currentPage: 1,
    totalCount: dataTotalCount,
    pageSize: data.length, // Set page size based on init data size

    delete: function(user) {
      _.remove(userService.users, function(it) { return it.id === user.id; });
      return $http.delete('/users/' + user.id);
    },

    nextPage: function() {
      if (!userService.hasNextPage()) return $q.resolve(false);

      return $q(function(resolve, reject) {
        $http.get('/users?skip=' + (userService.pageSize * userService.currentPage))
          .then(function(response) {
            setCount(response);
            userService.currentPage++;
            replaceUsers(response.data);
            resolve(response.data);
          }).catch(function(err) {
            reject(err);
          });
      });
    },

    previousPage: function() {
      if (userService.currentPage <= 1) return $q.resolve(false);

      return $q(function(resolve, reject) {
        $http.get('/users?skip=' + (userService.pageSize * (userService.currentPage - 2)))
          .then(function(response) {
            setCount(response);
            userService.currentPage--;
            replaceUsers(response.data);
            resolve(response.data);
          }).catch(function(err) {
            reject(err);
          });
      });
    },

    toPage: function(toPageNum) {
      if (toPageNum < 1 || toPageNum > userService.getPageCount()) return $q.resolve(false);

      return $q(function(resolve, reject) {
        $http.get('/users?skip=' + (userService.pageSize * (toPageNum - 1)))
          .then(function(response) {
            setCount(response);
            userService.currentPage = toPageNum;
            replaceUsers(response.data);
            resolve(response.data);
          }).catch(function(err) {
            reject(err);
          });
      });

    },

    hasNextPage: function() {
      var hasNext = userService.totalCount > (userService.pageSize * userService.currentPage);
      return hasNext;
    },

    hasPreviousPage: function() {
      return userService.currentPage > 1;
    },

    getPageCount: function() {
      return Math.ceil(userService.totalCount / userService.pageSize);
    }
  };

  function replaceUsers(data) {
    userService.users.splice(0, userService.users.length);
    _.each(data, function(it) {
      userService.users.push(it);
    });
  }

  function setCount(response) {
    var totalCount = response.headers('X-Total-Count');
    if (totalCount) userService.totalCount = totalCount;
  }

  return userService;
};
