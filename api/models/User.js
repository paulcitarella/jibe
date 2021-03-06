// api/models/User.js

var _ = require('lodash');
var _super = require('sails-auth/api/models/User');

_.merge(exports, _super);
_.merge(exports, {

  tableName: 'person',
  attributes: {
    firstname: {
      type: 'string',
      notNull: true
    },
    lastname: {
      type: 'string',
      notNull: true
    },
    tasks: {
      collection: 'task',
      via: 'owner'
    },
    roles: {
      collection: 'role',
      via: 'users'
    }
  }

});
