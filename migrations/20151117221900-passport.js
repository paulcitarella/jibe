var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;
var Promise = require('bluebird');

exports.up = function(db, callback) {
  var adb = Promise.promisifyAll(db);
  adb.createTableAsync('passport', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true
    },
    user: {
      type: 'int'
    },
    protocol: {
      type: 'text'
    },
    password: {
      type: 'text'
    },
    provider: {
      type: 'text'
    },
    identifier: {
      type: 'text'
    },
    tokens: {
      type: 'json'
    },
    createdAt: 'timestamptz',
    updatedAt: 'timestamptz'

  }).then(function() {
      return adb.addForeignKeyAsync('passport', 'person', 'passport_person_fk', { 'user': 'id' });

  }).finally(callback);

};

exports.down = function(db, callback) {
  var adb = Promise.promisifyAll(db);
  adb.dropTableAsync('passport').finally(callback);
};
