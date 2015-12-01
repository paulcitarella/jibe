var chai = require('chai');
chai.should();

describe('UserModel', function() {

  describe('#count()', function() {
    it('should return the count', function (done) {
      User.count().then(function(count) {
          count.should.equal(1);
          done();
        }).catch(done);
    });
  });

});
