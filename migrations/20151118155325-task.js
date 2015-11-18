var dbm = global.dbm || require('db-migrate');
var type = dbm.dataType;
var Promise = require('bluebird');

exports.up = function(db, callback) {
  var adb = Promise.promisifyAll(db);
  adb.createTableAsync('task', {
    id: {
      type: 'int',
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: 'text',
      notNull: true
    },
    owner: {
      type: 'int',
      notNull: true
    },
    createdAt: 'timestamptz',
    updatedAt: 'timestamptz'

  }).then(function() {
      return adb.addForeignKeyAsync('task', 'person', 'task_person_fk',
        { 'owner': 'id' }, { onDelete: 'CASCADE' });

  }).finally(callback);
};

exports.down = function(db, callback) {
  var adb = Promise.promisifyAll(db);
  adb.dropTableAsync('task').finally(callback);
};
