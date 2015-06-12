'use strict';
/**
 * @ngdoc overview
 * @name findPlayDate
 * @description
 * # findPlayDate
 *
 * Main module of the application.
 */
 var app = angular
 .module('findPlayDate', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngMessages',
    'ngTouch',
    'ui.bootstrap',
    'ngTagsInput',
    'wu.masonry',
    'angular-loading-bar',
    'infinite-scroll',
    'headroom',
    'pascalprecht.translate'
    ])
 .config(function ($routeProvider, $locationProvider, $httpProvider) {
    $httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

    $routeProvider
    .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl as main',
    })
    .when('/update/:id/:hash', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl as main',
    })
    .when('/tos', {
        templateUrl: 'views/tos.html',
    })
    .otherwise({
        redirectTo: '/'
    });

    $locationProvider.html5Mode(false);


});

 app.factory('PlayDate', function($resource) {

    return $resource('/api/playdate/:id/:parname/:updateHash/',
    {
        id: '@id',
        updateHash: '@updateHash',
    },
    {
        getForUpdate: {
            method: 'GET',
            params: {
                parname: 'hash',
                id: '@_id',
                updateHash: '@updateHash',
            }
        },
        update: {
            method: 'POST',
            params: {
                parname: 'hash',
                id: '@_id',
                updateHash: '@updateHash',
            }
        },
        disable: {
            method: 'DELETE',
            params: {
                parname: 'hash',
                id: '@_id',
                updateHash: '@updateHash',
            }
        }
    });
});

app.factory('PlatformService', function() {
    return {
        platforms : [
            {id: 1, name: 'Steam', apiName: 'steam'},
            {id: 2, name: 'XBOX360', apiName: 'xbox'},
            {id: 3, name: 'XBOXOne', apiName: 'xboxOne'},
            {id: 4, name: 'PS3', apiName: 'ps3'},
            {id: 5, name: 'PS4', apiName: 'ps4'},
            {id: 6, name: 'WiiU', apiName: 'wiiu'},
            {id: 7, name: '3DS', apiName: 'threeds'}
        ]
    };
});