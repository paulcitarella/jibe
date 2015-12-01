var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require("sinon-chai");
chai.should();
chai.use(sinonChai);

var filterByOwner = require('../../../api/policies/filterByOwner');

describe('filterByOwner', function() {

  describe('when no user on request', function() {
    var req = {
      options: {}
    };
    var next = sinon.stub();

    it('should not add where criteria', function () {
      filterByOwner(req, {}, next);

      req.options.should.not.have.property('where');
      next.should.have.callCount(1);
    });
  });

  describe('when user present on request', function() {
    var req = {
      user: {id: 999},
      options: {}
    };

    it('should add where criteria with no existing where options', function () {
      var next = sinon.stub();
      filterByOwner(req, {}, next);

      req.options.where.owner.should.equal(999);
      next.should.have.callCount(1);
    });

    it('should merge where criteria with existing where options', function () {
      var next = sinon.stub();
      req.options.where.foo = 'bar';
      filterByOwner(req, {}, next);

      req.options.where.owner.should.equal(999);
      req.options.where.foo.should.equal('bar');
      next.should.have.callCount(1);
    });
  });
});
