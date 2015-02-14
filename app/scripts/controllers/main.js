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

    this.searchService = new Search();
    this.data = {
        flashMessages: []
    };

    this.openModal = function (playdate) {

      var modalInstance = $modal.open({
            templateUrl: 'views/modal.html',
            controller: 'ModalCtrl',
            size: 'lg',
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
        console.log(this);
        console.log($scope);
        if($routeParams.hash && $routeParams.id){
            PlayDate.getForUpdate({id: $routeParams.id, updateHash: $routeParams.hash}).$promise.then(function (playdate)
            {
              $scope.main.openUpdateModal(playdate, $routeParams.hash);
          });
        }
        $scope.main.searchService.findPlayDates();
    });

    // //self executing init function
    // (function() {
    //     console.log(this);
    //     // $scope.main.searchService.registerObserverCallback(function(data){
    //     //     $scope.main.updateSearchData(data);
    //     // });
    //     // $scope.main.searchService.registerPushCallback(function(data){
    //     //     $scope.main.receiveMore(data);
    //     // });
    //     console.log('[INIT MAIN]');
    //     if($routeParams.hash && $routeParams.id){
    //         PlayDate.getForUpdate({id: $routeParams.id, updateHash: $routeParams.hash}).$promise.then(function (playdate)
    //         {
    //           $scope.main.openUpdateModal(playdate, $routeParams.hash);
    //       });
    //     }
    //     $scope.main.searchService.findPlayDates();
    // })();
}]);
