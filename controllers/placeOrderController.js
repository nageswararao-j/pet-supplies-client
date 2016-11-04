'use strict';

app.controller('PlaceOrderController', [ '$scope', '$modalInstance', 'items','CartService','$location',
		function($scope, $modalInstance, items,CartService,$location) {
			$scope.itemsInPopup = items;
			$scope.totalPrice = function() {
				var total = 0;
				var quantity = 1
				angular.forEach(items, function(value, key) {
					if (value != undefined) {
						quantity = parseInt(value.quantity);
						total += (quantity * parseInt(value.price));
						$scope.currencyToPay = value.currency;
					}
				});
				return total;
			}();
			
			$scope.onChangeQuantity = function(cartItem){
				CartService.updateCartItem(cartItem);
			};
			
			$scope.deleteCartItem = function(cartItem){
				CartService.deleteCartItem(cartItem);
			};
			
			$scope.proceedToPay = function(){
				$location.path('/order');
				$modalInstance.dismiss('cancel');
			};
			
			$scope.close = function() {
				$modalInstance.dismiss('cancel');
			};
		} ]);