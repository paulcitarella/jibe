var _ = require('lodash');

module.exports = function($http, $q, users) {
  var userService = {
    users: users || [],
    delete: function(user) {
      _.remove(userService.users, function(it) { return it.id === user.id; });
      return $http.delete('/users/' + user.id);
    }
  };

  return userService;
};
