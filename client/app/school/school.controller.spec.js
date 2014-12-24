'use strict';

describe('Controller: SchoolCtrl', function () {

  // load the controller's module
  beforeEach(module('cruvitaApp'));

  var SchoolCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SchoolCtrl = $controller('SchoolCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
