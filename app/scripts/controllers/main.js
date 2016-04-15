'use strict';

/**
* @ngdoc function
* @name findPlayDate.controller:MainCtrl
* @description
* # MainCtrl
* Controller of the findPlayDate
*/
angular.module('findPlayDate')
    .controller('MainCtrl',['$rootScope', '$scope', '$modal', '$routeParams', 'Search', 'PlayDate', 'FlashMessage', 'PlatformService', '$location', '$window', '$sce', 'MessageService',  function ($rootScope, $scope, $modal, $routeParams, Search, PlayDate, FlashMessage, PlatformService, $location, $window, $sce, MessageService) {

    this.searchService = Search;
    this.flashMessage = FlashMessage;
    this.platforms = PlatformService.platforms;
    this.showShare = [];
    this.showMessage = {};
    this.cardForms = {};
    this.cardMessages = {};


    /*UTILITY FUNCTIONS*/
    this.getCardMessage = function(playdate) {
        return this.cardMessages[playdate._id];
    };
    this.getCardForm = function(playdate) {
        return this.cardForms[playdate._id];
    };
    this.shorten = function(str) {
        if (str.length > 40) {
            return str.slice(0, 40)+'...';
        } else {
            return str;
        }
    };
    this.isMessageShown = function(id) {
        if (this.showMessage[id]) {
            return true;
        } else {
            return false;
        }
    };

    this.shareClicked = function(ev) {
        ev.preventDefault();
        var el = angular.element(ev.target);
        el.parent().find( 'div' ).toggleClass( 'card__social--active' );
        el.toggleClass('share-expanded');
    };

    this.messageClicked = function(ev, playdate) {
        ev.preventDefault();
        var el = angular.element(ev.target);
        el.parent().parent().parent().parent().parent().parent().find('.shown').toggleClass( 'hidden-custom' );
        el.parent().parent().parent().parent().parent().parent().find('.shown').removeClass( 'shown' );
        el.parent().parent().parent().parent().parent().find('.paper').toggleClass( 'hidden-custom' );
        el.parent().parent().parent().parent().parent().find('.paper').toggleClass( 'shown' );
        this.showMessage[playdate._id] = true;
        this.startCardMessage(playdate);
    };

    this.cancelInnerClicked = function(ev, playdate) {
        ev.preventDefault();
        var el = angular.element(ev.target);
        el.parent().parent().parent().parent().parent().toggleClass( 'hidden-custom' );
        el.parent().parent().parent().parent().parent().toggleClass( 'shown' );

        this.showMessage[playdate._id] = false;
    };

    this.twitterLink = function() {
        $window.open('https://twitter.com/find_playdate', '_blank');
        this.menuState = "closed";
    };

    this.openCreateModal = function(){
        $rootScope.$emit('startCreate');
        this.menuState = "closed";
    };
    /*END UTILITY FUNCTIONS*/

    this.openModal = function (playdate) {

      var modalInstance = $modal.open({
            templateUrl: 'modal.html',
            controller: 'ModalCtrl',
            size: 'lg',
            backdrop: false,
            resolve: {
                message : function () {
                    return {to: playdate.name, playdate_id: playdate._id};
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
            templateUrl: 'updatemodal.html',
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
    /* When a user clicks messsage on a card directly*/
    this.startCardMessage = function(playdate) {
        if (this.cardMessages[playdate._id]) {
            return this.cardMessages[playdate._id];
        } else {
            var message = {to: playdate.name, playdateId: playdate._id};
            var messageService = new MessageService(playdate, message, this);
            this.cardMessages[playdate._id] = messageService;
            return this.cardMessages[playdate._id];
        }
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

    this.hasError = function(form, field) {
        if (!form[field].$dirty) {
            return false;
        } else {
            if (Object.keys(form[field].$error).length) {
                return true;
            }
        }
    };

    $scope.$on('$routeUpdate', function(scope, next, current) {
        if (next && next.hasOwnProperty('params') && next.params.hasOwnProperty('message')) {
            var pdId = next.params.message;
            $scope.main.prepareAndOpenMessageModal(pdId);
        }
    });

    this.prepareAndOpenMessageModal = function(id) {
        var pdId = id;
        var res = $scope.main.searchService.findByPk(pdId);
        if (res && res.hasOwnProperty('_id')) {
            $scope.main.openModal(res);
        } else {
            PlayDate.get({id: pdId}).$promise.then(function (playdate)
            {
              $scope.main.openModal(playdate);
            });
        }
        this.menuState = "closed";
    };

    $scope.$on('formLocator', function(event, playdate) {
        if (!$scope.main.cardForms[playdate._id]) {
            $scope.main.cardForms[playdate._id] = event.targetScope.messageForm;
        }
    });

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
    });
}]);
