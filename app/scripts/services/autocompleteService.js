'use strict';

angular.module('findPlayDate')
.factory('Autocomplete', function($http) {
    var autocomplete = {

        //getters for autocomplete fields
        getGame: function(val, platform) {
            return $http.get('/api/games', {
              params: {
                q: val,
                platform: platform
              }
            }).then(function(response){
                return response.data;
            });
        },
        //getters for autocomplete fields
        getLanguage : function(val) {
            return $http.get('/api/languages', {
              params: {
                q: val,
              }
            }).then(function(response){
                return response.data;
            });
        },

        getRegion : function(val) {
            return $http.get('/api/regions', {
              params: {
                q: val,
              }
            }).then(function(response){
                return response.data;
            });
        }

    };
    return autocomplete;
});
