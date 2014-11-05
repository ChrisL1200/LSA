'use strict';

describe('Service: Clearchannel', function () {

  // load the service's module
  beforeEach(module('cruvitaApp'));

  // instantiate service
  var Clearchannel;
  beforeEach(inject(function (_Clearchannel_) {
    Clearchannel = _Clearchannel_;
  }));

  it('should do something', function () {
    expect(!!Clearchannel).toBe(true);
  });

});
