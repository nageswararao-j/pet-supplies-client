app.factory('DataLoadService', [
		'$http',
		'$q',
		function($http, $q) {
			return {
				getAllCats : function() {

					var deferred = $q.defer();
					var promise = $http.get('/json/cats.json').success(
							function(response) {
								deferred.resolve(response);
							});
					// Return the promise to the controller
					return deferred.promise;
				},
				getAllDogs : function() {

					var deferred = $q.defer();
					var promise = $http.get('/json/products.json').success(
							function(response) {
								deferred.resolve(response);
							});
					// Return the promise to the controller
					return deferred.promise;
				}
			}
		} ]);
