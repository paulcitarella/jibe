var Promise = require('bluebird');
var chai = require('chai');
var sinon = require('sinon');
var sinonChai = require("sinon-chai");
chai.should();
chai.use(sinonChai);

var userServiceFactory = require('../../../assets/js/apps/users/services/userService');

describe('userService', function() {

  describe('#get()', function() {
    var data = [
      {
        id: 1,
        name: 'one'
      },
      {
        id: 2,
        name: 'two'
      },
      {
        id: 3,
        name: 'three'
      }
    ];
    var userService = userServiceFactory({}, Promise, data, 3);

    it('should return a deep copied cached user when user is in current result set page', function () {
      userService.get(2).then(function(user) {
        user.id.should.equal(2);
        user.name.should.equal('two');

        user.name = 'asdf';
        data[1].name.should.equal('two');
      });
    });
  });

});
