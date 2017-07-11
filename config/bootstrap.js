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
  var handlebars = require('handlebars');
  for (var helperName in helpers) {
    handlebars.registerHelper(helperName, helpers[helperName]);
  }

  if (sails.config.environment !== 'test') {

    // Set up the admin role and user if there are no roles in the DB
    Role.count(function(err, count) {
      if (err) return cb();
      if (count) return cb();

      Promise.all(_.flatten([
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
            return new Promise(function(resolve, reject) {
              user.save(function(err, user) {
                if (err) return reject(err);
                resolve(user);
              });
            });
          })
        ),
        _.times(50, function(n) {
          return User.register({
            firstname: 'Test' + (n + 1),
            lastname: 'User',
            email: 'user' + (n + 1) + '@asdf.com',
            password: 'asdf1234'
          });
        })

      ])).catch(sails.log.bind(sails.log))
      .finally(cb);
    });

  } else {
    cb();
  }
};
