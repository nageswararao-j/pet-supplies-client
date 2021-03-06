'use strict';

app.controller('SignUpController', [ '$scope','$location','Session','AuthService','USER_ROLES','AUTH_EVENTS',
		function($scope,$location,Session,AuthService,USER_ROLES,AUTH_EVENTS) {
		
	
	$scope.signUpToApp = function(){
		$scope.user = prepareUserToRegister();
		AuthService.login($scope.user).then(function(user){
			if(user != undefined && user.active){
				$scope.currentUser = user;
				AuthService.currentUser(user);
				$location.path("/main");	
			}
		});
		
	};
	
	var prepareUserToRegister = function(){
		var user = {};
		user.userName = $scope.userName;
		user.password = $scope.password;
		user.emailId = $scope.email;
		user.address = prepareAddress();
		user.phone = $scope.phone;
		user.register = true;
		user.profile = USER_ROLES.newUser;
		return user;
	};
	
	var prepareAddress = function(){
		var address = {};
		address.address = $scope.doorNum;
		address.city = $scope.city;
		address.state = $scope.state;
		address.zipCode = $scope.zipCode
		address.email = $scope.email;
		address.phone = $scope.phone;
		address.country = $scope.country;
		return address;
	};
	
	$scope.login = function(){
		$location.path('/login');
	};
	

	$scope.$on(AUTH_EVENTS.existingUser, function(event, data) {
		console.log(data.errorMsg); // 'Data to send'
		$scope.emailPresent = data.errorMsg;
	});
} ]);