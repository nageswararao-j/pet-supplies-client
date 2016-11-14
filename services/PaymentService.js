'use strict';

app.factory('PaymentService', [
		'$http',
		'$q','$rootScope',
		function($http, $q,$rootScope) {
			var savePayment = function(payment) {
				return $http.post($rootScope.baseUrl+'/payment/place', payment)
						.success(function(res) {
							console.log("payment successfully!");
						}).error(function(error) {
							console.log("Error while payment!");
						});
			};
			return {
				savePayment : savePayment
			};
		} ]);