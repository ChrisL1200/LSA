'use strict';

describe('Directive: advertisement', function () {

  // load the directive's module and view
  beforeEach(module('cruvitaApp'));
  beforeEach(module('components/advertisement/advertisement.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<advertisement></advertisement>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the advertisement directive');
  }));
});