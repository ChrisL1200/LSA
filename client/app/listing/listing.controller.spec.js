'use strict';

describe('Controller: ListingCtrl', function () {

  // load the controller's module
  beforeEach(module('cruvitaApp'));

  var ListingCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ListingCtrl = $controller('ListingCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
