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
    'headroom'
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
            {id: 5, name: 'PS4', apiName: 'ps4'}
        ]
    };
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

//Validators

  app.directive('gameValidator', function() {
    return {
      require : 'ngModel',
      link : function($scope, element, attrs, ngModel) {
        ngModel.$validators.gameValidator = function(value) {
            console.log(value);
          var status = true;
          if (!angular.isObject(value)) {
            status = false;
          } else {
            if ((!value.value)) {
                status = false;
            }
          }
          return status;
        };
      }
    };
  });
  app.directive('regionValidator', function() {
    return {
      require : 'ngModel',
      link : function($scope, element, attrs, ngModel) {
        ngModel.$validators.regionValidator = function(value) {
          var status = true;
          if (!angular.isObject(value)) {
            status = false;
          } else {
            if (!(value.value)) {
                status = false;
            }
          }
          return status;
        };
      }
    };
  });
