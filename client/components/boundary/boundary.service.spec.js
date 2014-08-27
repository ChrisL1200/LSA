'use strict';

describe('Service: Boundary', function () {

  // load the service's module
  beforeEach(module('lsaApp'));

  // instantiate service
  var Boundary;
  beforeEach(inject(function (_Boundary_) {
    Boundary = _Boundary_;
  }));

  it('should do something', function () {
    expect(!!Boundary).toBe(true);
  });

});
