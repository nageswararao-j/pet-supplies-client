'use strict';

app.controller('LoginController', ['$scope',
		'$location',
		'$rootScope',
		'AuthService',
		'AUTH_EVENTS','USER_ROLES',
		function($scope, $location, $rootScope, AuthService,
				AUTH_EVENTS,USER_ROLES) {
			var credentials = {
				emailId : '',
				password : ''
			};
			$scope.credentials = credentials;
			$scope.invalidCredentials = '';
			$scope.currentUser = null;
			$scope.userRoles = USER_ROLES;
			$scope.isAuthorized = AuthService.isAuthorized(USER_ROLES);
			
			$scope.loginApp = function() {
				AuthService.login($scope.credentials).then(function(user) {
					$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
					$scope.setCurrentUser(user);
					if(AuthService.isAuthorized()){
						AuthService.currentUser($scope.currentUser);
						$location.path("/main");
					}else{
						$scope.invalidCredentials = 'Invalid credentials! Please check username & paswword';
						$scope.credentials = credentials;
						$location.path('/login');
					}
				}, function() {
					$rootScope.$broadcast(AUTH_EVENTS.loginFailed);
				});
			};
			
			$scope.setCurrentUser = function(user) {
				$scope.currentUser = user;
			};
			
			$scope.signUp = function(){
				$location.path('/signUp');
			};

		} ]);