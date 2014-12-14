'use strict';

describe('Controller: TosCtrl', function () {

  // load the controller's module
  beforeEach(module('cruvitaApp'));

  var TosCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TosCtrl = $controller('TosCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
