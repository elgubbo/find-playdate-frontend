'use strict';

angular.module('htdocsApp')
.factory('Search', function(PlayDate, FlashMessage) {
    var Search = function(){
        this.observerCallbacks = [];
        this.pushCallbacks = [];
        this.results = [];
        this.page = 1;
        this.finishedLoading = false;
        this.isLoading = false;
    };



    Search.prototype.findByPk = function(id)
    {
        var res = [];
        angular.forEach(this.results, function(value) {
            if (value.id === id) {
                this.push(value);
            }
        }, res);
        return res;
    };

    //register an observer
    Search.prototype.registerObserverCallback = function(callback)
    {
        this.observerCallbacks.push(callback);
    };

    Search.prototype.registerPushCallback = function(callback)
    {
        this.pushCallbacks.push(callback);
    };

    Search.prototype.pushObservers = function(data)
    {
        angular.forEach(this.pushCallbacks, function(callback){
            callback(data);
        });
    };

    //call this when you know 'Search results have changed' has been changed
    Search.prototype.notifyObservers = function(data)
    {
        if (data.length === 0) {
            FlashMessage.setMessage('warning', 'No PlayDates found, please try again.');
        }
        angular.forEach(this.observerCallbacks, function(callback){
            callback(data);
        });
    };

    Search.prototype.loadMore = function()
    {
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
    };

    Search.prototype.findPlayDates = function(data)
    {

        if(data) {
            this.data = data;
        }
        var that = this;
        //return the this in case someone wants to handle the promise themselves
        return PlayDate.query(data).$promise.then(
            function(data){
                that.notifyObservers(data);
                that.results = data;

            },
            function(error) {
                FlashMessage.setMessage('info', 'Unfortunately there has been an error, please try again later.');
                that.notifyObservers([]);
            }
        );
    };

    return Search;
});
