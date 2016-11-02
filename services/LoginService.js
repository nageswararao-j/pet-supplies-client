'use strict';

app.service('LoginService', [ '$http', '$q','$rootScope', function($http, $q,$rootScope) {
	var deferred = $q.defer();
	var loginToApp = function(user) {
		var promise = $http({
			url : $rootScope.baseUrl+'/login',
			dataType : 'json',
			method : 'POST',
			data : user,
			headers : {
				'Content-Type' : 'application/json'
			}
		}).success(function(response) {
			deferred.resolve(response);
		}).error(function(error) {
			deferred.reject();
			console.log("Failed to login");
		});
		return deferred.promise;
	}

	return {
		loginToApp : loginToApp
	}
} ]);