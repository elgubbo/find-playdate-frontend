'use strict';

describe('Controller: DeletemodalCtrl', function () {

  // load the controller's module
  beforeEach(module('htdocsApp'));

  var DeletemodalCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DeletemodalCtrl = $controller('DeletemodalCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
