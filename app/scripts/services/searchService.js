'use strict';

angular.module('findPlayDate')
.factory('Search', function(PlayDate, FlashMessage) {
    var Search = {
        data : {},
        observerCallbacks : [],
        pushCallbacks : [],
        results : [],
        isLoading : true,
        lastTime : '',
    };

    Search.findByPk = function(id)
    {
        for (var i = this.results.length - 1; i >= 0; i--) {
            if (this.results[i]._id === id) {
                return this.results[i];
            }
        }
    };

    Search.loadMore = function()
    {
        if(!this.isLoading) {
            this.isLoading = true;
            var lastResult = this.results.slice(-1)[0];

            if (!lastResult) return;
            this.data.after = lastResult._id;
            //if this happens, then we are done here
            if (this.lastTime === this.data.after) {
                return;
            }

            var that = this;

            PlayDate.query(this.data).$promise.then(
                function(data){
                    that.appendResults(data);
                    that.lastTime = that.data.after;
                    that.isLoading = false;
                },
                function(err){
                    console.log(err);
                    that.isLoading = false;
                }
            );
        }
    };

    Search.appendResults = function(items) {
        this.results.push.apply(this.results, items);
    };

    Search.findPlayDates = function(data)
    {
        if(data) {
            this.data = data;
        }
        var that = this;
        //return the this in case someone wants to handle the promise themselves
        return PlayDate.query(data).$promise.then(
            function(results){
                FlashMessage.flush();
                if (results.length === 0) {
                    FlashMessage.setMessage('info', 'Unfortunately no playdates have been found for your search. Be the first and add one. Just click "ADD PLAYDATE"!');
                }
                that.results = results;
                that.isLoading = false;
            },
            function(error) {
                FlashMessage.setMessage('info', 'Unfortunately there has been an error, please try again later.');
            }
        );
    };

    return Search;
});
