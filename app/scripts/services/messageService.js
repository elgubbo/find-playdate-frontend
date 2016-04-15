angular.module('findPlayDate')
.factory('MessageService', function($http) {

   return function(playdate, message, scope) {
       return {
            message : message,
            playdate : playdate,
            errorMessage : null,
            scope : null,

            setResponse : function (response) {
                this.message.captcha = response;
            },

            cbExpiration : function() {
                this.message.captcha = null;
            },

            send : function () {
                if(!scope.messageForm.$dirty || !scope.messageForm.$valid) {
                    this.errorMessage = "Please fill out all fields and try again";
                    return;
                }
                // Simple POST request example (passing data) :
                return $http.post('api/message', this.message, {params: {'playdate_id': this.playdate._id}}).
                success(function() {
                    //success
                }).error(function(err) {
                    this.errorMessage = err;
                    //error
                }.bind(this));
            },
        };
   };

});
