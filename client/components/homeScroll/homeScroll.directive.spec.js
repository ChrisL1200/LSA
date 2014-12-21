'use strict';

describe('Directive: homeScroll', function () {

  // load the directive's module
  beforeEach(module('cruvitaApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<home-scroll></home-scroll>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the homeScroll directive');
  }));
});