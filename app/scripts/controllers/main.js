'use strict';

/**
* @ngdoc function
* @name findPlayDate.controller:MainCtrl
* @description
* # MainCtrl
* Controller of the findPlayDate
*/
angular.module('findPlayDate')
    .controller('MainCtrl',['$scope', '$modal', '$routeParams', 'Search', 'PlayDate', 'FlashMessage', 'PlatformService',  function ($scope, $modal, $routeParams, Search, PlayDate, FlashMessage, PlatformService) {

    this.searchService = Search;
    this.flashMessage = FlashMessage;
    this.platforms = PlatformService.platforms;

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
        FlashMessage.setMessage(message);
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
                $scope.main.searchService.findPlayDates();
            }
        });
    };

    this.getPlatformPrettyName = function (apiname) {
        for (var i = this.platforms.length - 1; i >= 0; i--) {
            if (this.platforms[i].hasOwnProperty('apiName')) {
                if (this.platforms[i].apiName === apiname)
                {
                    if (this.platforms[i].hasOwnProperty('name')) {
                        return this.platforms[i].name;
                    }
                }
            }
        }
    };

    $scope.$on('$viewContentLoaded', function() {
        console.log('[WELCOME TO FIND-PLAYDATE.COM]');
        Search.findPlayDates({});
        if($routeParams.hash && $routeParams.id){
            PlayDate.getForUpdate({id: $routeParams.id, updateHash: $routeParams.hash}).$promise.then(function (playdate)
            {
              $scope.main.openUpdateModal(playdate, $routeParams.hash);
          });
        }
        // $scope.main.searchService.findPlayDates();
    });
}]);
