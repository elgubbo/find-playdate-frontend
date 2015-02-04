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
		getMessages: function() {
			var ret = messages;
			messages = [];
			return ret;
		}
	};
});
