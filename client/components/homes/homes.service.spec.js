'use strict';

describe('Service: Homes', function () {

  // load the service's module
  beforeEach(module('cruvitaApp'));

  // instantiate service
  var Homes;
  beforeEach(inject(function (_Homes_) {
    Homes = _Homes_;
  }));

  it('should do something', function () {
    expect(!!Homes).toBe(true);
  });

});
