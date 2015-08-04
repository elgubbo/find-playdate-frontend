'use strict';

angular.module("findPlayDate")
.factory('FlashMessage', function() {
	var Messages = {
		messages : [],
	};

	Messages.setMessage =  function(type, message)
	{
		if((type === 'warning' || type === 'error' || type === 'success' || type === 'info') && message) {
			this.messages.push({type: type, title: message});
		}
	};

	Messages.flush = function() {
		this.messages = [];
	};

	return Messages;

});
