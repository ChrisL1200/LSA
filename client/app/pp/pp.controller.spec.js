'use strict';

describe('Controller: PpCtrl', function () {

  // load the controller's module
  beforeEach(module('cruvitaApp'));

  var PpCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PpCtrl = $controller('PpCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
