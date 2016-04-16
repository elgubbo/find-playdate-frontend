'use strict';

angular.module('findPlayDate')
.factory('CardService', function(MessageService, Notification) {
    var CardService = {
        showMessage : {},
        cardForms : {},
        cardMessages : {},
    };

    CardService.hasError = function(form, field) {
        if (!form[field].$dirty) {
            return false;
        } else {
            if (Object.keys(form[field].$error).length) {
                return true;
            }
        }
    };

    CardService.hideMessage = function(playdate) {
        this.showMessage[playdate._id] = false;
    };

    CardService.getCardMessage = function(playdate) {
        return this.cardMessages[playdate._id];
    };
    CardService.getCardForm = function(playdate) {
        return this.cardForms[playdate._id];
    };
    CardService.isMessageShown = function(id) {
        if (this.showMessage[id]) {
            return true;
        } else {
            return false;
        }
    };
    CardService.startCardMessage = function(playdate) {
        if (this.cardMessages[playdate._id]) {
            return this.cardMessages[playdate._id];
        } else {
            var message = {to: playdate.name, playdateId: playdate._id};
            var messageService = new MessageService(playdate, message, this);
            this.cardMessages[playdate._id] = messageService;
            return this.cardMessages[playdate._id];
        }
    };

    return CardService;
});
