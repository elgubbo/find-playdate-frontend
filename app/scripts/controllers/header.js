'use strict';

/**
 * @ngdoc function
 * @name htdocsApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the htdocsApp
 */
angular.module('htdocsApp')
  .controller('HeaderCtrl', function ($scope, $http, $modal, PlayDate, Search) {
  	this.search = {};


  	//getters for autocomplete fields
  	this.getSteamgame = function(val) {
	    return $http.get('api/steamapps', {
	      params: {
	        q: val,
	      }
	    }).then(function(response){
	    	return response.data;
	    });
	};

  	//getters for autocomplete fields
  	this.getLanguage = function(val) {
  		console.log(this.newPlayDate);
  		if(val && val.length > 2) {
		    return $http.get('api/languages', {
		      params: {
		        q: val,
		      }
		    }).then(function(response){
		    	return response.data;
		    });
  		}
	};

	this.openCreateModal = function () {

      var modalInstance = $modal.open({
        templateUrl: 'views/createmodal.html',
        controller: 'CreatemodalCtrl',
        size: 'lg',
      });

      modalInstance.result.then(function (message) {
        console.log(message);
      });
    };

  	this.getRegion = function(val) {
	    return $http.get('api/regions', {
	      params: {
	        q: val,
	      }
	    }).then(function(response){
	    	return response.data;
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
		Search.findPlayDates(this.search);
	};

  });
