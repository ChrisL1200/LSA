'use strict';

describe('Directive: cruGallery', function () {

  // load the directive's module and view
  beforeEach(module('cruvitaApp'));
  beforeEach(module('components/cruGallery/cruGallery.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<cru-gallery></cru-gallery>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the cruGallery directive');
  }));
});