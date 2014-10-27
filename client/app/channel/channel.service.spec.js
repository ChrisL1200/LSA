'use strict';

describe('Service: channel', function () {

  // load the service's module
  beforeEach(module('lsaApp'));

  // instantiate service
  var channel;
  beforeEach(inject(function (_channel_) {
    channel = _channel_;
  }));

  it('should do something', function () {
    expect(!!channel).toBe(true);
  });

});
