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

console.log($scope.playdate);
	$scope.save = function () {
		$scope.playdate.updateHash = $scope.updateHash;
		$scope.playdate.$update().then(function(data){
			console.log(data);
			$modalInstance.close('success');
		});
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};

  });
