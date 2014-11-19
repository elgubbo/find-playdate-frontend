'use strict';
/**
 * @ngdoc overview
 * @name htdocsApp
 * @description
 * # htdocsApp
 *
 * Main module of the application.
 */
var app = angular
  .module('htdocsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'ngTagsInput',
    'wu.masonry',
  ])
  .config(["$routeProvider", "$locationProvider", "$httpProvider", function ($routeProvider, $locationProvider, $httpProvider) {
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
      .otherwise({
        redirectTo: '/'
      });

      $locationProvider.html5Mode(true);


  }]);

app.factory('PlayDate', ["$resource", function($resource) {

  return $resource(':port/api/playdate/:id/:parname/:updateHash/',
    {
      port: ':3000',
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
      }
    });
}]);


'use strict';

/**
 * @ngdoc function
 * @name htdocsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the htdocsApp
 */
angular.module('htdocsApp')
  .controller('MainCtrl',['$scope', '$modal', '$routeParams', 'Search', 'PlayDate',  function ($scope, $modal, $routeParams, Search, PlayDate) {
  	this.data = {playdates: []};

    this.updateSearchData = function(data){
      console.log('updatesearchdata called');
      console.log(data);
      this.data.playdates = data;
    };

    this.openModal = function (playdate) {

      var modalInstance = $modal.open({
        templateUrl: 'views/modal.html',
        controller: 'ModalCtrl',
        size: 'lg',
        resolve: {
          message: function () {
            return {to: playdate.name, playdateId: playdate._id};
          }
        }
      });

      modalInstance.result.then(function (message) {
        console.log(message);
      });
    };

    this.openUpdateModal = function (playdate, mUpdateHash) {

      var modalInstance = $modal.open({
        templateUrl: 'views/updatemodal.html',
        controller: 'UpdatemodalCtrl',
        size: 'lg',
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
          Search.findPlayDates({});
        }
      });
    };

    this.receiveMore = function(data){
      console.log('receive more called');
      console.log(data);
    };


  	//self executing init function
    (function() {
        Search.registerObserverCallback(function(data){
            $scope.main.updateSearchData(data);
        });
        Search.registerPushCallback(function(data){
            $scope.main.receiveMore(data);
        });
        console.log('[INIT MAIN]');
        console.log($routeParams);
        //545e632310ac81372c000001
        //3490ca258f0b5d86f24fe8fb2374644f
        if($routeParams.hash && $routeParams.id){
            PlayDate.getForUpdate({id: $routeParams.id, updateHash: $routeParams.hash}).$promise.then(function (playdate)
            {
              $scope.main.openUpdateModal(playdate, $routeParams.hash);
              console.log(playdate);
            });
        }
        Search.findPlayDates();
    })();
}]);

'use strict';

/**
 * @ngdoc function
 * @name htdocsApp.controller:HeaderCtrl
 * @description
 * # HeaderCtrl
 * Controller of the htdocsApp
 */
angular.module('htdocsApp')
  .controller('HeaderCtrl', ["$scope", "$http", "$modal", "PlayDate", "Search", function ($scope, $http, $modal, PlayDate, Search) {
  	this.search = {};


  	//getters for autocomplete fields
  	this.getSteamgame = function(val) {
	    return $http.get('api/steamapps', {
	      params: {
	        q: val,
	      }
	    }).then(function(response){
	    	return response.data;
	    });
	};

  	//getters for autocomplete fields
  	this.getLanguage = function(val) {
  		console.log(this.newPlayDate);
  		if(val && val.length > 2) {
		    return $http.get('api/languages', {
		      params: {
		        q: val,
		      }
		    }).then(function(response){
		    	return response.data;
		    });
  		}
	};

	this.openCreateModal = function () {

      var modalInstance = $modal.open({
        templateUrl: 'views/createmodal.html',
        controller: 'CreatemodalCtrl',
        size: 'lg',
      });

      modalInstance.result.then(function (message) {
        console.log(message);
      });
    };

  	this.getRegion = function(val) {
	    return $http.get('api/regions', {
	      params: {
	        q: val,
	      }
	    }).then(function(response){
	    	return response.data;
	    });
	};

	this.savePlayDate = function(){
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
				that.errorMessage = err.data;
				//error
			}
		);
	};

	this.doSearch = function(){
		Search.findPlayDates(this.search);
	};

  }]);

'use strict';

angular.module('htdocsApp')
.factory('Search', ["PlayDate", function(PlayDate) {
    var search = {
        observerCallbacks : [],
        pushCallbacks : [],
        results : [],
        page : 1,
        finishedLoading: false,
        isLoading: false,

        findByPk : function(id)
        {
            var res = [];
            angular.forEach(this.results, function(value) {
                if (value.id === id) {
                    this.push(value);
                }
            }, res);
            return res;
        },

        //register an observer
        registerObserverCallback : function(callback){
            this.observerCallbacks.push(callback);
        },

        registerPushCallback: function(callback) {
            this.pushCallbacks.push(callback);
        },

        pushObservers : function(data) {
            angular.forEach(this.pushCallbacks, function(callback){
                callback(data);
            });
        },

        //call this when you know 'Search results have changed' has been changed
        notifyObservers : function(data){
            angular.forEach(this.observerCallbacks, function(callback){
                callback(data);
            });
        },

        loadMore: function(){
            if(!this.isLoading && !this.finishedLoading) {
                var that = this;
                this.page++;
                this.data.page = this.page;
                //return the this in case someone wants to handle the promise themselves
                PlayDate.query(this.data).$promise.then(
                    function(data){
                        if(!data.length) {
                            that.finishedLoading = true;
                        }
                        that.pushObservers(data);
                    }
                );
            }
        },

        findPlayDates : function(data)
        {
            console.log(data);
            if(data) {
                this.data = data;
            }
            var that = this;
            //return the this in case someone wants to handle the promise themselves
            return PlayDate.query(data).$promise.then(
                function(data){
                    that.notifyObservers(data);
                    that.results = data;
                }
            );
        },
    };
    return search;
}]);

'use strict';

angular.module('htdocsApp')
.factory('Autocomplete', ["$http", function($http) {
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
}]);

'use strict';

/**
 * @ngdoc function
 * @name htdocsApp.controller:ModalCtrl
 * @description
 * # ModalCtrl
 * Controller of the htdocsApp
 */
angular.module('htdocsApp')
  .controller('ModalCtrl', ["$scope", "$http", "$modalInstance", "message", function ($scope, $http, $modalInstance, message) {
  	$scope.message = message;
	$scope.send = function () {
		// Simple POST request example (passing data) :
		$http.post('api/message', $scope.message, {params: {'playdate_id': message.playdateId}}).
		  success(function() {
			$modalInstance.close();
		}).error(function() {
			console.log('fail');
		});
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};

  }]);

'use strict';

/**
 * @ngdoc function
 * @name htdocsApp.controller:UpdatemodalCtrl
 * @description
 * # UpdatemodalCtrl
 * Controller of the htdocsApp
 */
angular.module('htdocsApp')
  .controller('UpdatemodalCtrl', ["$scope", "$modalInstance", "playdate", "updateHash", "Autocomplete", function ($scope, $modalInstance, playdate, updateHash, Autocomplete) {
  	//these will be resolved when opening the modal
  	$scope.playdate = playdate;
  	$scope.updateHash = updateHash;
  	$scope.getSteamgame = Autocomplete.getSteamgame;
  	$scope.getLanguage = Autocomplete.getLanguage;
  	$scope.getRegion = Autocomplete.getRegion;

console.log($scope.playdate);
	$scope.save = function () {
		$scope.playdate.updateHash = $scope.updateHash;
		$scope.playdate.$update().then(function(data){
			console.log(data);
			$modalInstance.close('success');
		});
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};

  }]);

'use strict';

/**
 * @ngdoc function
 * @name htdocsApp.controller:CreatemodalCtrl
 * @description
 * # CreatemodalCtrl
 * Controller of the htdocsApp
 */
angular.module('htdocsApp')
  .controller('CreatemodalCtrl', ["$scope", "$modalInstance", "Autocomplete", "PlayDate", "Search", function ($scope, $modalInstance, Autocomplete, PlayDate, Search) {
  	//these will be resolved when opening the modal
  	$scope.newPlayDate = {};
  	$scope.playDateMaster = {};
  	$scope.errorMessage = null;
  	$scope.successMessage = null;
  	$scope.saving = false;
  	$scope.getSteamgame = Autocomplete.getSteamgame;
  	$scope.getLanguage = Autocomplete.getLanguage;
  	$scope.getRegion = Autocomplete.getRegion;

	$scope.save = function () {
		$scope.saving = true;
		$scope.errorMessage = null;
		$scope.successMessage = null;
		var that = $scope;
		PlayDate.save($scope.newPlayDate).$promise.then(
			function(playdate){
			//success
				console.log(playdate);
				that.saving = false;
				that.newPlayDate = angular.copy(that.playDateMaster);
				Search.findPlayDates({});
				$modalInstance.dismiss('success');
			},
			function(err){
				that.saving = false;
				that.errorMessage = err.data;
				//error
			}
		);
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};

  }]);
