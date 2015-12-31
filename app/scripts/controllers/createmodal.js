'use strict';

/**
 * @ngdoc function
 * @name findPlayDate.controller:CreatemodalCtrl
 * @description
 * # CreatemodalCtrl
 * Controller of the findPlayDate
 */
 angular.module('findPlayDate')
 .controller('CreatemodalCtrl', function ($scope, $modalInstance, Autocomplete, PlayDate, Search, newPlayDate, FlashMessage, PlatformService, $translate, vcRecaptchaService) {
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

    //this is ridiculous - find another solution
    $translate(['CREATEMODAL.REQUIRED_GAME',
            'CREATEMODAL.REQUIRED_TIMEZONE',
            'CREATEMODAL.REQUIRED_LANGUAGE',
            'CREATEMODAL.REQUIRED_EMAIL',
            'CREATEMODAL.REQUIRED_NAME',
            'CREATEMODAL.REQUIRED_INFO',
            'CREATEMODAL.ERR_GAME',
            'CREATEMODAL.ERR_REGION',
            'CREATEMODAL.ERR_EMAIL']).then(function (translations) {
            $scope.validateAttributes = [
                {'game' :
                    {
                        gameValidator : translations['CREATEMODAL.ERR_GAME'],
                        required : translations['CREATEMODAL.REQUIRED_GAME']
                    }

                },
                {'geoRegion' :
                    {
                        regionValidator : translations['CREATEMODAL.ERR_TIMEZONE'],
                        required : translations['CREATEMODAL.REQUIRED_TIMEZONE']
                    }

                },
                {'preferences.language' :
                    {
                        regionValidator : translations['CREATEMODAL.ERR_LANGUAGE'],
                        required : translations['CREATEMODAL.REQUIRED_LANGUAGE']
                    }

                },
                {'email' :
                    {
                        required : translations['CREATEMODAL.REQUIRED_EMAIL'],
                        pattern: translations['CREATEMODAL.ERR_EMAIL']
                    }

                },
                {'name' :
                    {required : translations['CREATEMODAL.REQUIRED_NAME']}
                },
                {'additional' :
                    {required : translations['CREATEMODAL.REQUIRED_INFO']}
                },
            ];
    });


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
                if ($scope.platforms[i].apiName === apiname)
                {
                    if ($scope.platforms[i].hasOwnProperty('name')) {
                        return $scope.platforms[i].name;
                    }
                }
            }
        }
    };

    $scope.setWidgetId = function (widgetId) {
        // store the `widgetId` for future usage.
        // For example for getting the response with
        $scope.newPlayDate.captcha = vcRecaptchaService.getResponse(widgetId);
        console.log($scope.newPlayDate.captcha);
    };

    $scope.setResponse = function (response) {
        // send the `response` to your server for verification.
    };

    $scope.cbExpiration = function() {
        $scope.newPlayDate.captcha = null;
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
