'use strict';

/**
 * @ngdoc function
 * @name htdocsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the htdocsApp
 */
angular.module('htdocsApp')
  .controller('MainCtrl',['$scope', '$modal', '$routeParams', 'Search', 'PlayDate',  function ($scope, $modal, $routeParams, Search, PlayDate) {
  	this.data = {playdates: []};

    this.updateSearchData = function(data){
      console.log('updatesearchdata called');
      console.log(data);
      this.data.playdates = data;
    };

    this.openModal = function (playdate) {

      var modalInstance = $modal.open({
        templateUrl: 'views/modal.html',
        controller: 'ModalCtrl',
        size: 'lg',
        resolve: {
          message: function () {
            return {to: playdate.name, playdateId: playdate._id};
          }
        }
      });

      modalInstance.result.then(function (message) {
        console.log(message);
      });
    };

    this.openUpdateModal = function (playdate, mUpdateHash) {

      var modalInstance = $modal.open({
        templateUrl: 'views/updatemodal.html',
        controller: 'UpdatemodalCtrl',
        size: 'lg',
        resolve: {
          playdate: function () {
            return playdate;
          },
          updateHash: function() {
            return mUpdateHash;
          }
        }
      });

      modalInstance.result.then(function (message) {
        if(message === 'success') {
          Search.findPlayDates({});
        }
      });
    };

    this.receiveMore = function(data){
      console.log('receive more called');
      console.log(data);
    };


  	//self executing init function
    (function() {
        Search.registerObserverCallback(function(data){
            $scope.main.updateSearchData(data);
        });
        Search.registerPushCallback(function(data){
            $scope.main.receiveMore(data);
        });
        console.log('[INIT MAIN]');
        if($routeParams.hash && $routeParams.id){
            PlayDate.getForUpdate({id: $routeParams.id, updateHash: $routeParams.hash}).$promise.then(function (playdate)
            {
              $scope.main.openUpdateModal(playdate, $routeParams.hash);
            });
            PlayDate.getForUpdate({id: $routeParams.id, updateHash: $routeParams.hash}).$promise.then(function (playdate)
            {
              $scope.main.openDeleteModal(playdate, $routeParams.hash);
            });
        }
        Search.findPlayDates();
    })();
}]);
