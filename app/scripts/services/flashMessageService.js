'use strict';

angular.module("htdocsApp", [])
.factory('FlashMessage', function() {
	var messages = {
		warning : [],
		error : [],
		success: [],
		info: [],};
	return {
		hasMessage: function(type){
			if((type === 'warning' || type === 'error' || type === 'success' || type === 'info')) {

				return messages[type].length;
			}
		},
		setMessage: function(type, message)
		{
			if((type === 'warning' || type === 'error' || type === 'success' || type === 'info') && message) {
				messages[type].push(message);
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
