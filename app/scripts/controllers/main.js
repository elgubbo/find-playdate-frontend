'use strict';

/**
* @ngdoc function
* @name htdocsApp.controller:MainCtrl
* @description
* # MainCtrl
* Controller of the htdocsApp
*/
angular.module('htdocsApp')
    .controller('MainCtrl',['$scope', '$modal', '$routeParams', 'Search', 'PlayDate', 'FlashMessage',  function ($scope, $modal, $routeParams, Search, PlayDate, FlashMessage) {

    this.searchService = Search;
    this.flashMessage = FlashMessage;

    this.openModal = function (playdate) {

      var modalInstance = $modal.open({
            templateUrl: 'views/modal.html',
            controller: 'ModalCtrl',
            size: 'lg',
            backdrop: false,
            resolve: {
                message : function () {
                    return {to: playdate.name, playdateId: playdate._id};
                }
            }
        });

      modalInstance.result.then(function (message) {
      });
    };

    this.openUpdateModal = function (playdate, mUpdateHash) {

        var modalInstance = $modal.open({
            templateUrl: 'views/updatemodal.html',
            controller: 'UpdatemodalCtrl',
            size: 'lg',
            backdrop: false,
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
                this.searchService.findPlayDates({});
            }
        });
    };

    $scope.$on('$viewContentLoaded', function() {
        console.log('[WELCOME TO FIND-PLAYDATE.COM]');
        if($routeParams.hash && $routeParams.id){
            PlayDate.getForUpdate({id: $routeParams.id, updateHash: $routeParams.hash}).$promise.then(function (playdate)
            {
              $scope.main.openUpdateModal(playdate, $routeParams.hash);
          });
        }
        $scope.main.searchService.findPlayDates();
    });
}]);
