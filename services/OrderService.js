'use strict';

app.factory('OrderService', [
		'$http',
		'$q','$rootScope',
		function($http, $q,$rootScope) {
			var placeOrder = function(orders) {
				return $http.post($rootScope.baseUrl+'/order/save', orders)
						.success(function(res) {
							console.log("Saved Order successfully!");
						}).error(function(error) {
							console.log("Error while saving Order");
						});
			};
			
			var loadOrders = function(userId) {
				return $http({
						url : $rootScope.baseUrl+'/order/load/'+userId,
						dataType : 'json',
						method : 'GET',
						data : '',
						headers : {
							'Content-Type' : 'application/json'
						}})
						.success(function(res) {
							console.log("Loaded order successfully!");
						}).error(function(error) {
							console.log("Error while loading orders !");
						});
			};
			
			return {
				placeOrder : placeOrder,
				loadOrders : loadOrders
			};
		} ]);