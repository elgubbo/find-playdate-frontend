'use strict';

/**
 * @ngdoc function
 * @name findPlayDate.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the findPlayDate
 */
 angular.module('findPlayDate')
 .controller('HeaderCtrl', function ($scope, $http, $modal, PlayDate, Search, Autocomplete, FlashMessage, $rootScope, $anchorScroll, $location) {
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
        $scope.header.search = message;
        $scope.header.doSearch();
        });
    };

    this.resetSearch = function() {
        if (!angular.equals(this.search, {})) {
            this.search = {};
            Search.findPlayDates({});
        }
    };

    this.savePlayDate = function() {
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
                FlashMessage.setMessage('warning', err.data);
            }
        );
    };
    this.doSearch = function() {
        if (this.search.game || this.search.geoRegion || this.search.preferences.language.label) {
            Search.findPlayDates(this.search);
        } else {
            FlashMessage.setMessage('warning', 'Please select game and timezone from the dropdowns!');
        }
    };

    //compile valid search for each field that gets completed
    $scope.$watch('header.search', function(newVal, oldVal){
        var tempSearch = {};
        angular.forEach(newVal, function(value, key) {
            if (typeof value === 'object') {
                if (value.hasOwnProperty('language')) {
                    if (typeof value.language === 'object') {
                        tempSearch[key] = value;
                    }
                } else {
                    tempSearch[key] = value;
                }
            }
        });
        Search.findPlayDates(tempSearch);
        if (!angular.equals({}, tempSearch)) {
            var old = $location.hash();
            $location.hash('topanchor');
            $anchorScroll();
            $location.hash(old);
        }
    }, true);
});
