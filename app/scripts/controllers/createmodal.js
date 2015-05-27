'use strict';

/**
 * @ngdoc function
 * @name findPlayDate.controller:CreatemodalCtrl
 * @description
 * # CreatemodalCtrl
 * Controller of the findPlayDate
 */
 angular.module('findPlayDate')
 .controller('CreatemodalCtrl', function ($scope, $modalInstance, Autocomplete, PlayDate, Search, newPlayDate, FlashMessage, PlatformService) {
    //these will be resolved when opening the modal
    $scope.newPlayDate = angular.copy(newPlayDate);
    $scope.playDateMaster = {};
    $scope.errorMessage = null;
    $scope.successMessage = null;
    $scope.saving = false;
    $scope.getGame = Autocomplete.getGame;
    $scope.getLanguage = Autocomplete.getLanguage;
    $scope.getRegion = Autocomplete.getRegion;
    $scope.platforms = PlatformService.platforms;
    $scope.validateAttributes = [
        {'game' :
            {
                gameValidator : 'Select a game from the Dropdown',
                required : 'You have not entered a game'
            }

        },
        {'geoRegion' :
            {
                regionValidator : 'Select a region from the Dropdown',
                required : 'You have not entered a region'
            }

        },
        {'preferences.language' :
            {
                regionValidator : 'Select a language from the Dropdown',
                required : 'You have not entered a language'
            }

        },
        {'email' :
            {
                required : 'You have not entered an email',
                pattern: 'This is not a valid e-mail address'
            }

        },
        {'name' :
            {required : 'You must enter a name'}
        },
        {'additional' :
            {required : 'You have not entered additional info'}
        },
    ];

    $scope.save = function () {
        if($scope.createForm.$invalid) {
            $scope.errorMessage = "Please fill out all fields and try again";
            return;
        }
        $scope.saving = true;
        $scope.errorMessage = null;
        $scope.successMessage = null;
        var that = $scope;
        PlayDate.save($scope.newPlayDate).$promise.then(
            function(playdate){
                //success
                that.saving = false;
                that.newPlayDate = angular.copy(that.playDateMaster);
                Search.findPlayDates({});
                $modalInstance.dismiss('success');
            },
            function(err){
                that.saving = false;
                FlashMessage.setMessage('warning', err.data);
            }
            );
    };

    $scope.goToSearch = function() {
        $modalInstance.close($scope.searchQuery);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.getPlatformPrettyName = function (apiname) {
        for (var i = $scope.platforms.length - 1; i >= 0; i--) {
            if ($scope.platforms[i].hasOwnProperty('apiName')) {
                console.log($scope.platforms[i]);
                if ($scope.platforms[i].apiName === apiname)
                {
                    if ($scope.platforms[i].hasOwnProperty('name')) {
                        return $scope.platforms[i].name;
                    }
                }
            }
        }
    };

    //this
    $scope.$watch('newPlayDate', function(newVal, oldVal) {
        if (newVal) {
            if (newVal.game && newVal.geoRegion) {
                if (oldVal.game && oldVal.geoRegion) {
                    if (angular.equals(oldVal.game, newVal.game) && angular.equals(oldVal.geoRegion, newVal.geoRegion)) {
                        //nothing to do here, search has not changed
                        return;
                    }
                }
                var search = {game : newVal.game, geoRegion: newVal.geoRegion};
                PlayDate.query(search).$promise.then(
                    function(data){
                        if (data.length > 0) {
                            $scope.searchQuery = search;
                        } else {
                            $scope.searchQuery = null;
                        }
                    }
                );
            }
        }
    }, true);


});
