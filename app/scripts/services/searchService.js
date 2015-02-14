'use strict';

angular.module('htdocsApp')
.factory('Search', function(PlayDate, FlashMessage) {
    var Search = {
        observerCallbacks : [],
        pushCallbacks : [],
        results : [],
        page : 1,
        finishedLoading : false,
        isLoading : false,
    };

    Search.findByPk = function(id)
    {
        var res = [];
        angular.forEach(this.results, function(value) {
            if (value.id === id) {
                this.push(value);
            }
        }, res);
        return res;
    };

    Search.loadMore = function()
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

    Search.findPlayDates = function(data)
    {

        if(data) {
            this.data = data;
        }
        var that = this;
        //return the this in case someone wants to handle the promise themselves
        return PlayDate.query(data).$promise.then(
            function(data){
                that.results = data;

            },
            function(error) {
                FlashMessage.setMessage('info', 'Unfortunately there has been an error, please try again later.');
            }
        );
    };

    return Search;
});
