'use strict';

describe('Directive: result', function () {

  // load the directive's module and view
  beforeEach(module('cruvitaApp'));
  beforeEach(module('app/result/result.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<result></result>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the result directive');
  }));
});