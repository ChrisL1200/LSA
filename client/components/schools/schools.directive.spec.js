'use strict';

describe('Directive: schools', function () {

  // load the directive's module and view
  beforeEach(module('cruvitaApp'));
  beforeEach(module('app/schools/schools.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<schools></schools>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the schools directive');
  }));
});