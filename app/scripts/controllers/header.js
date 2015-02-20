'use strict';

/**
 * @ngdoc function
 * @name findPlayDate.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the findPlayDate
 */
angular.module('findPlayDate')
  .controller('HeaderCtrl', function ($scope, $http, $modal, PlayDate, Search, Autocomplete, FlashMessage) {
  	this.search = {};
  	this.getSteamgame = Autocomplete.getSteamgame;
  	this.getLanguage = Autocomplete.getLanguage;
  	this.getRegion = Autocomplete.getRegion;

	this.openCreateModal = function (prefill) {
      var modalInstance = $modal.open({
        templateUrl: 'views/createmodal.html',
        controller: 'CreatemodalCtrl',
        size: 'lg',
        backdrop: false,
        resolve: {
            newPlayDate : function () {
                return prefill;
            },
        },
      });

      modalInstance.result.then(function (message) {
        console.log("[MODAL WAS CLOSED]");
      });
    };

	this.savePlayDate = function(){
		this.saving = true;
		this.errorMessage = null;
		this.successMessage = null;
		var that = this;
		PlayDate.save(this.newPlayDate).$promise.then(
			function(playdate){
			//success
				console.log(playdate);
				that.saving = false;
				that.newPlayDate = angular.copy(that.playDateMaster);
				Search.findPlayDates({});
			},
			function(err){
				that.saving = false;
				that.errorMessage = err.data;
				//error
			}
		);
	};

	this.doSearch = function(){
		if (this.search.game || this.search.geoRegion) {
			Search.findPlayDates(this.search);
		} else {
			FlashMessage.setMessage('warning', 'Please select game and timezone from the dropdowns!');
		}
	};

  });
