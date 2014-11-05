'use strict';

describe('Service: Drawchannel', function () {

  // load the service's module
  beforeEach(module('cruvitaApp'));

  // instantiate service
  var Drawchannel;
  beforeEach(inject(function (_Drawchannel_) {
    Drawchannel = _Drawchannel_;
  }));

  it('should do something', function () {
    expect(!!Drawchannel).toBe(true);
  });

});
