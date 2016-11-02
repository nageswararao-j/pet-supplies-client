'use strict';

app.factory('ProductsService', [ '$http', '$q','$rootScope', function($http, $q, $rootScope) {
	return {
		loadAllPets : function(type) {
			var deferred = $q.defer();
			var promise = $http({
				url : $rootScope.baseUrl + '/category/' + type,
				dataType : 'json',
				method : 'GET',
				data : '',
				headers : {
					'Content-Type' : 'application/json'
				}

			}).success(function(response) {
				deferred.resolve(response);
			}).error(function(error) {
				deferred.reject(error);
			});
			return deferred.promise;
		}
	}
	// http://localhost:8080/data/category replace with rootscope - url
} ]);
