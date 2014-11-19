'use strict';

angular.module('htdocsApp')
.factory('Autocomplete', function($http) {
    var autocomplete = {

        //getters for autocomplete fields
        getSteamgame : function(val) {
            return $http.get('api/steamapps', {
              params: {
                q: val,
              }
            }).then(function(response){
                return response.data;
            });
        },

        //getters for autocomplete fields
        getLanguage : function(val) {
            if(val && val.length > 2) {
                return $http.get('api/languages', {
                  params: {
                    q: val,
                  }
                }).then(function(response){
                    return response.data;
                });
            }
        },

        getRegion : function(val) {
            return $http.get('api/regions', {
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
