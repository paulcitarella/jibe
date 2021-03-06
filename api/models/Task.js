/**
* Task.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    title: {
      type: 'string',
      notNull: true
    },
    owner: {
      model: 'user',
      notNull: true
    }
  },

  /* Static method that creates a query scoped to the given user
   */
  ownedBy: function(user) {
    return Task.find().where({owner: user.id});
  }
};
