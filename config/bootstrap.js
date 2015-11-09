/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

var Promise = require('bluebird');
var _ = require('lodash');

module.exports.bootstrap = function(cb) {

  // Use the x-forwarded-proto to determine HTTP vs HTTPS requests
  sails.hooks.http.app.set('trust proxy', true);

  // Register custom Handlebars helpers
  var helpers = require('include-all')({
    dirname: __dirname + '/../api/helpers',
    filter: /(.+)\.js$/
  }) || {};
  var handlebars = require('sails/node_modules/express-handlebars/node_modules/handlebars');
  for (var helperName in helpers) {
    handlebars.registerHelper(helperName, helpers[helperName]);
  }

  // Set up the admin role and user if there are no roles in the DB
  Role.count(function(err, count) {
    if (err) return sails.log.error(err);
    if (count) return;

    Promise.bind({}, Role.create({name:'Administrator'})
      .then(function(role) {
        this.role = role;
        return User.register({
          firstname: 'Ron',
          lastname: 'Burgundy',
          email: 'ron@asdf.com',
          password: 'asdf1234'
        });

      }).then(function(user) {
        user.roles.add(this.role.id);
        user.save(function(err, user) {
          if (err) return sails.error.log(err);
          sails.log.info('Admin role and user created');
        });

      }).catch(function(err) {
        sails.log.error(err);
      })
    );

    // Create some dummy users for testing
    _.times(50, function(n) {
      User.register({
        firstname: 'Test' + (n + 1),
        lastname: 'User',
        email: 'user' + (n + 1) + '@asdf.com',
        password: 'asdf1234'
      });
    });
  });


  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
  cb();
};
