var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;
var Promise = require('bluebird');

exports.up = function(db, callback) {
  var adb = Promise.promisifyAll(db);
  adb.createTableAsync('role', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: 'text',
      notNull: true,
      unique: true
    },
    createdAt: 'timestamptz',
    updatedAt: 'timestamptz'

  }).then(function() {
    return adb.createTableAsync('role_users__user_roles', {
      id: {
        type: 'int',
        primaryKey: true,
        autoIncrement: true
      },
      role_users: {
        type: 'int'
      },
      user_roles: {
        type: 'int'
      }
    });

  }).then(function() {
    return [
      adb.addForeignKeyAsync('role_users__user_roles', 'role', 'role_users__user_roles_role_fk',
        { 'role_users': 'id' }, { onDelete: 'CASCADE' }),
      adb.addForeignKeyAsync('role_users__user_roles', 'person', 'role_users__user_roles_person_fk',
        { 'user_roles': 'id' }, { onDelete: 'CASCADE' })
    ];

  }).all()
  .finally(callback);
};

exports.down = function(db, callback) {
  var adb = Promise.promisifyAll(db);
  adb.dropTableAsync('role_users__user_roles')
  .then(function() {
    return adb.dropTableAsync('role');

  }).finally(callback);
};
