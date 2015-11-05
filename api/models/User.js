// api/models/User.js

var _ = require('lodash');
var _super = require('sails-permissions/api/models/User');

_.merge(exports, _super);
_.merge(exports, {

  attributes: {
    firstname: {
      type: 'string',
      notNull: true
    },
    lastname: {
      type: 'string',
      notNull: true
    },
  }

});
