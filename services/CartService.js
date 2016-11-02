'use strict';

app.factory('CartService', [
		'$http',
		'$q','$rootScope',
		function($http, $q,$rootScope) {
			var saveCartItem = function(cartItem) {
				return $http.post($rootScope.baseUrl+'/cart/save', cartItem)
						.success(function(res) {
							console.log("Saved Cart Item successfully!");
						}).error(function(error) {
							console.log("Error while saving Cart Item");
						});
			};
			var deleteCartItem = function(cartItem) {
				return $http
						.post($rootScope.baseUrl+'/cart/delete', cartItem)
						.success(function(res) {
							console.log("Deleted Cart Item successfully!");
						}).error(function(error) {
							console.log("Error while Delete Cart Item");
						});
			};
			
			var updateCartItem = function(cartItem) {
				return $http
						.post($rootScope.baseUrl+'/cart/update', cartItem)
						.success(function(res) {
							console.log("Updated Cart Item successfully!");
						}).error(function(error) {
							console.log("Error while updating Cart Item");
						});
			};
			
			var loadCartItems = function(userId) {
				return $http({
						url : $rootScope.baseUrl+'/cart/load/'+userId,
						dataType : 'json',
						data : '',
						headers : {
							'Content-Type' : 'application/json'
						}})
						.success(function(res) {
							console.log("Loaded Cart Items successfully!");
						}).error(function(error) {
							console.log("Error while loading Cart Items");
						});
			};

			return {
				saveCartItem : saveCartItem,
				deleteCartItem : deleteCartItem,
				loadCartItems : loadCartItems,
				updateCartItem : updateCartItem
			};
		} ]);