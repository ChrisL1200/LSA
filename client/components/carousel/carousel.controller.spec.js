'use strict';

describe('Controller: CarouselCtrl', function () {

  // load the controller's module
  beforeEach(module('cruvitaApp'));

  var CarouselCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CarouselCtrl = $controller('CarouselCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
