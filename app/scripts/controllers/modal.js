'use strict';

/**
 * @ngdoc function
 * @name findPlayDate.controller:ModalCtrl
 * @description
 * # ModalCtrl
 * Controller of the findPlayDate
 */
angular.module('findPlayDate')
  .controller('ModalCtrl', function ($scope, $http, $modalInstance, message) {
    $scope.message = message;
    $scope.errorMessage = null;

    $scope.send = function () {
        if(!$scope.messageForm.$dirty || !$scope.messageForm.$valid) {
            $scope.errorMessage = "Please fill out all fields and try again";
            return;
        }
        // Simple POST request example (passing data) :
        $http.post('api/message', $scope.message, {params: {'playdate_id': message.playdateId}}).
          success(function() {
            $modalInstance.close();
        }).error(function(err) {
            $scope.errorMessage = err;
        });
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

  });
