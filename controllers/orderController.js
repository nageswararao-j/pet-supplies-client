'use strict';

app.controller('OrderController', [ '$scope','$location','Session','OrderService',
		function($scope,$location,Session,OrderService) {
			var empty = ' ';
			$scope.currentUser = Session.currentUser;
			$scope.cartItems = Session.cartItems;
			$scope.userName = Session.currentUser.userName;
			$scope.cartItemSize = Object.keys($scope.cartItems).length;
			
			if ($scope.cartItemSize > 0) {
				$scope.isItemsPresent = true;
			};
			
			$scope.load = function(type){
				$location.path("/main");
			};
			var address = Session.currentUser.address;
			$scope.address = address.address;
			$scope.userName = $scope.currentUser.userName;
			$scope.city = address.city;
			$scope.state = address.state;
			$scope.zipCode = address.zipCode;
			$scope.email = address.email;
			$scope.phone = address.phone;
			$scope.country = address.country;
			
			$scope.payAndPlaceOrder = function(){
				var orders = [];
				angular.forEach($scope.cartItems,function(value, key){
					if(value != undefined){
						orders.push(prepareOrder(value));
					};
				});
				if(orders.length > 0){
					OrderService.placeOrder(orders);
				}
			};
			
			var prepareOrder = function(item){
				var order = {};
					order.userId = $scope.currentUser.userId;
					order.productId = item.productId;
				    order.productName = item.productName;
				    order.productPrice = item.price;
				    order.currency = item.currency;
				    order.quantity = item.quantity;
				    order.status = $scope.userName;
				    order.shippingAddress = prepareShippingAddress();
				    order.orderDate = new Date();
				    return order;
			};
			
			var prepareShippingAddress = function() {
				var delim = ' , ';
				return $scope.userName+delim+
//				$scope.address+delim+
//				$scope.city+delim+
//				$scope.state+delim+
//				$scope.zipCode+delim+
//				$scope.email+delim+
//				$scope.phone+delim+
				$scope.country;
			};
		} ]);