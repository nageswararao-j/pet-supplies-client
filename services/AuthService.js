'use strict';

app.factory('AuthService',['$http','$rootScope','Session', function($http,$rootScope, Session) {
	var authService = {};

	authService.login = function(credentials) {
		return $http.post($rootScope.baseUrl+'/login', credentials).then(function(res) {
			Session.create(res.data.emailId, res.data.userId, 'admin');
			return res.data;
		});
	};

	authService.isAuthenticated = function() {
		return !!Session.userId;
	};

	authService.currentUser = function(user) {
		Session.currentUser = user;
	};
	
	authService.isAuthorized = function(authorizedRoles) {
//		if (!angular.isArray(authorizedRoles)) {
//			authorizedRoles = [ authorizedRoles ];
//		}
		return (authService.isAuthenticated())// && authorizedRoles.indexOf(Session.userRole) !== -1);
	};

	return authService;
}])