'use strict';

/**
 * @ngdoc function
 * @name htdocsApp.controller:UpdatemodalCtrl
 * @description
 * # UpdatemodalCtrl
 * Controller of the htdocsApp
 */
angular.module('htdocsApp')
  .controller('UpdatemodalCtrl', function ($scope, $modalInstance, playdate, updateHash, Autocomplete) {
  	//these will be resolved when opening the modal
  	$scope.playdate = playdate;
  	$scope.updateHash = updateHash;
  	$scope.getSteamgame = Autocomplete.getSteamgame;
  	$scope.getLanguage = Autocomplete.getLanguage;
  	$scope.getRegion = Autocomplete.getRegion;
  	$scope.errorMessage = null;

	$scope.save = function () {
		if(!$scope.updateForm.$dirty || !$scope.updateForm.$valid) {
			$scope.errorMessage = "Please fill out all fields and try again";
			return;
		}
		$scope.playdate.updateHash = $scope.updateHash;
		$scope.playdate.$update().then(
			function(data){
				$modalInstance.close('success');
			},
			function(err) {
				$scope.errorMessage = err;
			}
		);
	};

	$scope.delete = function () {
		$scope.playdate.updateHash = $scope.updateHash;
		$scope.playdate.$disable(
			function(data){
				$modalInstance.close('success');
			});
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};

  });
