var assert = require('chai').assert;

describe('UserModel', function() {

  describe('#find()', function() {
    it('should check count function', function (done) {
      User.count().then(function(count) {
          assert(count === 51, 'there are 51 users');
          done();
        }).catch(done);
    });
  });

});
