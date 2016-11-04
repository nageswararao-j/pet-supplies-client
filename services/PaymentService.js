'use strict';

app.factory('PaymentService', [
		'$http',
		'$q','$rootScope',
		function($http, $q,$rootScope) {
			var savePayment = function(payment) {
				return $http.post($rootScope.baseUrl+'/payment/place', payment)
						.success(function(res) {
							console.log("Saved Cart Item successfully!");
						}).error(function(error) {
							console.log("Error while saving Cart Item");
						});
			};
			
			return {
				savePayment : savePayment
			};
		} ]);