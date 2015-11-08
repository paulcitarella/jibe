/**
* Role.js
*
* @description :: A role to be assigned to users for role-based
* privileges.
*/

module.exports = {
  attributes: {
    name: {
      type: 'string',
      notNull: true,
      unique: true
    },
    users: {
      collection: 'user',
      via: 'roles'
    }
  },
};
