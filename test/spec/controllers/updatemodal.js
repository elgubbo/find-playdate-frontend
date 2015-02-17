'use strict';

describe('Controller: UpdatemodalCtrl', function () {

  // load the controller's module
  beforeEach(module('htdocsApp'));

  var UpdatemodalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    UpdatemodalCtrl = $controller('UpdatemodalCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
