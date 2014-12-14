'use strict';

describe('Directive: generalContact', function () {

  // load the directive's module and view
  beforeEach(module('cruvitaApp'));
  beforeEach(module('components/generalContact/generalContact.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<general-contact></general-contact>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the generalContact directive');
  }));
});