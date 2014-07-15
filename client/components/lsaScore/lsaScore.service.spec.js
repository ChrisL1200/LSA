'use strict';

describe('Service: Lsascore', function () {

  // load the service's module
  beforeEach(module('lsaApp'));

  // instantiate service
  var Lsascore;
  beforeEach(inject(function (_Lsascore_) {
    Lsascore = _Lsascore_;
  }));

  it('should do something', function () {
    expect(!!Lsascore).toBe(true);
  });

});
