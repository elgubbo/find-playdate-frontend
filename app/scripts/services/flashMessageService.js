'use strict';

angular.module("htdocsApp")
.factory('FlashMessage', function() {
	var Messages = {
		messages : [],
	};

	Messages.setMessage =  function(type, message)
	{
		console.log(this.messages);
		if((type === 'warning' || type === 'error' || type === 'success' || type === 'info') && message) {
			this.messages.push({type: type, title: message});
		}
	};
	Messages.getMessages =  function()
	{
		console.log(this.messages);
		var ret = this.messages;
		this.messages = [];
		return ret;
	};
	return Messages;

});
