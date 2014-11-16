'use strict';

describe('Directive: agents', function () {

  // load the directive's module and view
  beforeEach(module('cruvitaApp'));
  beforeEach(module('app/agents/agents.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<agents></agents>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the agents directive');
  }));
});