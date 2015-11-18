var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;
var Promise = require('bluebird');

exports.up = function(db, callback) {
  var adb = Promise.promisifyAll(db);
  adb.createTableAsync('person', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: 'text',
      notNull: true,
      unique: true
    },
    email: {
      type: 'text',
      notNull: true,
      unique: true
    },
    firstname: {
      type: 'text',
      notNull: true
    },
    lastname: {
      type: 'text',
      notNull: true
    },
    createdAt: 'timestamptz',
    updatedAt: 'timestamptz'

  }).then(function() {
    return [
      adb.addIndexAsync('person', 'person_email', ['email'], true),
      adb.addIndexAsync('person', 'person_username', ['username'], true)
    ];
  }).all()

  .finally(callback);
};

exports.down = function(db, callback) {
  var adb = Promise.promisifyAll(db);
  Promise.all([
    adb.removeIndexAsync('person', 'person_email'),
    adb.removeIndexAsync('person', 'person_username')

  ]).then(function() {
    return adb.dropTableAsync('person');

  }).finally(callback);
};
