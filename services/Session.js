'use strict';

app.service('Session', function() {
	this.currentUser = {};
	this.cartItems = {};
	this.isItemsPresent = {};
	this.create = function(sessionId, userId, userRole) {
		this.id = sessionId;
		this.userId = userId;
		this.userRole = userRole;
	};
	this.destroy = function() {
		this.id = null;
		this.userId = null;
		this.userRole = null;
	};
})