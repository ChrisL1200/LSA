'use strict';

describe('Directive: ads', function () {

  // load the directive's module and view
  beforeEach(module('cruvitaApp'));
  beforeEach(module('app/ads/ads.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<ads></ads>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the ads directive');
  }));
});