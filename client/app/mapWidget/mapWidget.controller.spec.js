'use strict';

describe('Controller: MapwidgetCtrl', function () {

  // load the controller's module
  beforeEach(module('lsaApp'));

  var MapwidgetCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MapwidgetCtrl = $controller('MapwidgetCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
