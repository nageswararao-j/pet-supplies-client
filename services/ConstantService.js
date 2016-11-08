'use strict';

app.constant('AUTH_EVENTS', {
	loginSuccess : 'auth-login-success',
	loginFailed : 'auth-login-failed',
	logoutSuccess : 'auth-logout-success',
	sessionTimeout : 'auth-session-timeout',
	notAuthenticated : 'auth-not-authenticated',
	notAuthorized : 'auth-not-authorized'
});
app.constant('USER_ROLES', {
	all : '*',
	admin : 'admin',
	editor : 'editor',
	guest : 'guest',
	newUser : 'newUser'
})
app.constant('ENVIRONMENT', {
	mode : 'dev',
	baseUrl : 'http://localhost:8080'
})
app.constant('ERROR', {

})
app.constant('ORDERS', {
	received : 'Order received',
	readyToShip : 'Ready to ship',
	shipped : 'Shipped',
	delivered  : 'Delivered',
	cancelled : 'Cancelled'
})

