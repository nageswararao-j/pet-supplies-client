'use strict';

app.factory('AuthService',['$http','$rootScope','Session','USER_ROLES','AUTH_EVENTS','ERROR',function($http,$rootScope, Session,USER_ROLES,AUTH_EVENTS,ERROR) {
	var authService = {};

	authService.login = function(credentials) {
		return $http.post($rootScope.baseUrl+'/login', credentials).success(function(res) {
			Session.create(res.emailId, res.userId, USER_ROLES.newUser);
			return res;
		}).error(function(error) {
			if(error.present){
				console.log(ERROR.EMAIL_EXISTS);
				// firing an event downwards
				$rootScope.$broadcast(AUTH_EVENTS.existingUser, {
				  errorMsg:  ERROR.EMAIL_EXISTS
				});
			}
		});
	};
	
	authService.isAuthenticated = function() {
		return !!Session.userId;
	};

	authService.currentUser = function(user) {
		Session.currentUser = user;
	};
	
	authService.isAuthorized = function(authorizedRoles) {
		return (authService.isAuthenticated());
	};

	return authService;
}])