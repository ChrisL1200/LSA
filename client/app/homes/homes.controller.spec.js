'use strict';

describe('Controller: HomesCtrl', function () {

  // load the controller's module
  beforeEach(module('lsaApp'));

  var HomesCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HomesCtrl = $controller('HomesCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
