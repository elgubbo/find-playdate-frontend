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
    'ngTouch',
    'ui.bootstrap',
    'ngTagsInput',
    'wu.masonry',
    'angular-loading-bar',
    'infinite-scroll',
    'modeloptions'
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

 app.directive('errSrc', function() {
    return {
        link: function(scope, element, attrs) {
            element.bind('error', function() {
                if (attrs.src !== attrs.errSrc) {
                    attrs.$set('src', attrs.errSrc);
                    element.css('visibility', 'initial');
                    element.css('margin-top', '-53.73%');
                }
            });
        }
    };
});

 app.directive('backImg', function(){
    return function(scope, element, attrs){
        attrs.$observe('backImg', function(value) {
            element.css({
                'background-image': 'url(' + value +')',
                'background-size' : 'cover'
            });
        });
    };
});