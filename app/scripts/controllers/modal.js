'use strict';

/**
 * @ngdoc function
 * @name findPlayDate.controller:ModalCtrl
 * @description
 * # ModalCtrl
 * Controller of the findPlayDate
 */
angular.module('findPlayDate')
  .controller('ModalCtrl', function ($scope, $http, $modalInstance, message, playdate, $location) {
    $scope.message = message;
    $scope.playdate = playdate;
    $scope.errorMessage = null;

    $scope.setResponse = function (response) {
        $scope.message.captcha = response;
    };

    $scope.cbExpiration = function() {
        $scope.message.captcha = null;
    };
    $scope.send = function () {
        if(!$scope.messageForm.$dirty || !$scope.messageForm.$valid) {
            $scope.errorMessage = "Please fill out all fields and try again";
            return;
        }
        // Simple POST request example (passing data) :
        $http.post('api/message', $scope.message, {params: {'playdate_id': message.playdate_id}}).
          success(function() {
            $modalInstance.dismiss('Your message was sent successfully.');
        }).error(function(err) {
            $scope.errorMessage = err;
        });
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('There has been an error. Please try again later.');
        $location.search({});
    };

  });
