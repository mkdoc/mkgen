var expect = require('chai').expect
  , mkgen = require('../../index');

describe('mkgen:', function() {

  it('should append to stream', function(done) {
    var stream = mkgen();
    expect(stream).to.be.an('object');
    done();
  });

});
