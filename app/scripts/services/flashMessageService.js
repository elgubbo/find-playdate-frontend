'use strict';

angular.module("htdocsApp")
.factory('FlashMessage', function() {
	var messages = [];
	return {
		setMessage: function(type, message)
		{
			if((type === 'warning' || type === 'error' || type === 'success' || type === 'info') && message) {
				messages.push({type: type, title: message});
			}
		},
		getMessage: function(type)
		{
			if((type === 'warning' || type === 'error' || type === 'success' || type === 'info')) {
				return messages[type].pop();
			}
		},
		getMessages: function() {
			var ret = messages;
			messages = [];
			return ret;
		}
	};
});
