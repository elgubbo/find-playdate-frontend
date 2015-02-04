'use strict';

angular.module('htdocsApp')
.factory('Search', function(PlayDate, FlashMessage) {
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
            if (data.length == 0) {
                FlashMessage.setMessage('warning', 'No PlayDates found, please try again.');
            }
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
});
