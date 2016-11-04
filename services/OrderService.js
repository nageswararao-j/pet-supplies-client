'use strict';

app.factory('OrderService', [
		'$http',
		'$q','$rootScope',
		function($http, $q,$rootScope) {
			var placeOrder = function(orders) {
				return $http.post($rootScope.baseUrl+'/order/save', orders)
						.success(function(res) {
							console.log("Saved Cart Item successfully!");
						}).error(function(error) {
							console.log("Error while saving Cart Item");
						});
			};
			
			return {
				placeOrder : placeOrder
			};
		} ]);