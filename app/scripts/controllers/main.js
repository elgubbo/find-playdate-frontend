'use strict';

/**
* @ngdoc function
* @name findPlayDate.controller:MainCtrl
* @description
* # MainCtrl
* Controller of the findPlayDate
*/
angular.module('findPlayDate')
    .controller('MainCtrl',['$scope', '$modal', '$routeParams', 'Search', 'PlayDate', 'FlashMessage', 'PlatformService', '$location',  function ($scope, $modal, $routeParams, Search, PlayDate, FlashMessage, PlatformService, $location) {

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
                },
                playdate : function () {
                    return playdate;
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

    this.openMessage = function(id) {
        $location.search({'message': id});
    };

    $scope.$on('$routeUpdate', function(scope, next, current) {
        if (next && next.hasOwnProperty('params') && next.params.hasOwnProperty('message')) {
            var pdId = next.params.message;
            $scope.main.prepareAndOpenMessageModal(pdId);
        }
    });

    this.prepareAndOpenMessageModal = function(id) {
        var pdId = id;
        var resArray = $scope.main.searchService.findByPk(pdId);
        if (resArray.length > 0) {
            $scope.main.openModal(resArray[0]);
        } else {
            PlayDate.get({id: pdId}).$promise.then(function (playdate)
            {
              $scope.main.openModal(playdate);
            });
        }
    };

    $scope.$on('$viewContentLoaded', function() {
        console.log('[WELCOME TO FIND-PLAYDATE.COM]');
        Search.findPlayDates({});
        if ($routeParams.hash && $routeParams.id) {
            PlayDate.getForUpdate({id: $routeParams.id, updateHash: $routeParams.hash}).$promise.then(function (playdate)
            {
              $scope.main.openUpdateModal(playdate, $routeParams.hash);
          });
        }
        var searchParams = $location.search();
        if (searchParams.hasOwnProperty('message')) {
            $scope.main.prepareAndOpenMessageModal(searchParams.message);
        }
        // $scope.main.searchService.findPlayDates();
    });
}]);
