'use strict';

app.factory('AuthService',['$http','$rootScope','Session','USER_ROLES','AUTH_EVENTS','ERROR',function($http,$rootScope, Session,USER_ROLES,AUTH_EVENTS,ERROR) {
	var authService = {};

	authService.login = function(credentials) {
		return $http.post($rootScope.baseUrl+'/login', credentials).success(function(res) {
			Session.create(res.data.emailId, res.data.userId, USER_ROLES.newUser);
			return res.data;
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
//		if (!angular.isArray(authorizedRoles)) {
//			authorizedRoles = [ authorizedRoles ];
//		}
		return (authService.isAuthenticated())// && authorizedRoles.indexOf(Session.userRole) !== -1);
	};

	return authService;
}])