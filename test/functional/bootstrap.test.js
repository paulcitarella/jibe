var Promise = require('bluebird');
var Sails = require('sails'),
  sails;

before(function(client, done) {
  // Increase the Mocha timeout so that Sails has enough time to lift.
  this.timeout(5000);

  Sails.lift({
    environment: 'test'

  }, function(err, server) {
    sails = server;
    if (err) return done(err);

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
            if (err) reject(err);
            resolve(user);
          });
        });
      })

    ).then(function() {
      done(err, sails);

    }).catch(function(err) {
      done(err, sails);
    });

  });
});

after(function(client, done) {
  Promise.resolve().then(function() {
    return User.destroy({id: {not: null}});

  }).then(function() {
    return Passport.destroy({id: {not: null}});

  }).then(function() {
    return Role.destroy({id: {not: null}});

  }).then(function() {
    Sails.lower(done);

  }).catch(done);
});
