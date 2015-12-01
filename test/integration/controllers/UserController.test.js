var Promise = require('bluebird');
var request = require('supertest');
var chai = require('chai');
chai.should();

describe('UserController', function() {
   before(function(done) {
    this.timeout(5000);

    Promise.all(
      _.times(50, function(n) {
        return User.register({
          firstname: 'Test' + (n + 1),
          lastname: 'User',
          email: 'user' + (n + 1) + '@asdf.com',
          password: 'asdf1234'
        });
      })

    ).then(function() {
      done();

    }).catch(done);
   });

   after(function(done) {
    User.destroy(
      {firstname: {startsWith: 'Test'}}

    ).then(function() {
      done();

    }).catch(done);
   });

  describe('#list()', function() {
    it('should return 403 when called without authentication', function(done) {
      request(sails.hooks.http.app)
        .get('/users')
        .end(function(err, res) {
          res.status.should.equal(403);
          done(err);
        });
    });

    it('should return the first page of the list of users', function(done) {
      request(sails.hooks.http.app)
        .get('/users')
        .auth('ron@asdf.com', 'asdf1234')
        .end(function(err, res) {
          res.status.should.equal(200);
          res.body.length.should.equal(30);
          res.headers.should.have.property('x-total-count');
          res.headers['x-total-count'].should.equal('51');
          done(err);
        });
    });
  });

});
