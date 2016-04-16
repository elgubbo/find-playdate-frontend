angular.module('findPlayDate')
.factory('MessageService', function($http, Notification) {

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
                if(!scope.getCardForm(playdate).$dirty || !scope.getCardForm(playdate).$valid) {
                    this.errorMessage = "Please fill out all fields and try again";
                    return;
                }
                // Simple POST request example (passing data) :
                return $http.post('api/message', this.message, {params: {'playdate_id': this.playdate._id}}).
                success(function() {
                    Notification.primary("Message sent");
                }).error(function(err) {
                    this.errorMessage = err;
                    //error
                }.bind(this));
            },
        };
   };

});
