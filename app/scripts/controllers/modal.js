'use strict';

/**
 * @ngdoc function
 * @name htdocsApp.controller:ModalCtrl
 * @description
 * # ModalCtrl
 * Controller of the htdocsApp
 */
angular.module('htdocsApp')
  .controller('ModalCtrl', function ($scope, $http, $modalInstance, message) {
  	$scope.message = message;
	$scope.send = function () {
		// Simple POST request example (passing data) :
		$http.post('api/message', $scope.message, {params: {'playdate_id': message.playdateId}}).
		  success(function() {
			$modalInstance.close();
		}).error(function() {
			console.log('fail');
		});
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};

  });
