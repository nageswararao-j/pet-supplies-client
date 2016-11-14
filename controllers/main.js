'use strict';

app.controller('MainCtrl', [
		'$scope',
		'ProductsService',
		'CartService',
		'USER_ROLES',
		'AuthService',
		'$location',
		'Session',
		function($scope, ProductsService, CartService,
				USER_ROLES, AuthService, $location, Session) {
			$scope.cartItems = {};
			$scope.petsList = {};
			CartService.loadCartItems(Session.currentUser.data.userId).then(function(loadedItems) {
				var cartItems = loadedItems.data;
				if(cartItems != undefined && cartItems.length > 0){
					angular.forEach(cartItems,function(cartItem){
						$scope.cartItems[cartItem.id] = cartItem;
					});
				}
				updateCartCount();
			});
			$scope.isItemsPresent = false;
			$scope.currentUser = null;
			ProductsService.loadAllPets('ALL').then(function(data) {
				$scope.petsList = data;
			});
			$scope.userName = Session.currentUser.data.userName;
			$scope.load = function(type) {
				$scope.pettype = type;
				$scope.products = type;
				ProductsService.loadAllPets(type).then(function(data) {
					$scope.catagories = data;
				});
			};

			$scope.addToCart = function(item) {
				$scope.isItemsPresent = true;
				var cartItem = prepareCartItem(item);
				//Add item to cart
				if (!isItemFoundInCart(cartItem)) {
					CartService.saveCartItem(cartItem).then(function(savedItem) {
						$scope.cartItems[savedItem.data.id]  = savedItem.data;
						updateCartCount();
					});
				}else{	
					//update item quantity
					angular.forEach($scope.cartItems,function(value, key){
						if(compareQuantity(value,cartItem)){
							value.quantity = cartItem.quantity;
							CartService.updateCartItem(cartItem);
						}
					});
				}
			};

			var isItemFoundInCart = function(item) {
				var isPresent = false;
				angular.forEach($scope.cartItems,function(value, key){
					if(compareUserIdAndProductId(value,item)){
						isPresent = true;
					}
				});
				return isPresent;
			};
			
			$scope.showCartItems = function() {
				if ($scope.cartItems.length != 0) {
					$scope.isItemsPresent = true;
				};
			};

			$scope.removeCartItem = function(item) {
				if (isItemFoundInCart(item)) {
					delete $scope.cartItems[item.id];
					deleteCartItem(item);
				}
				if ($scope.cartItems.length === 0) {
					$scope.isItemsPresent = false;
				}
			};

			var deleteCartItem = function(cartItem) {
				CartService.deleteCartItem(cartItem);
				updateCartCount();
			};

			$scope.setCurrentUser = function(user) {
				$scope.currentUser = user;
			};

			var prepareCartItem = function(item) {
				var cartItem = {
					id : item.id,
					productId : item.productId,
					quantity : item.quantity,
					productName : item.productName,
					price : item.price,
					currency : item.currency,
					userId : Session.currentUser.data.userId
				};
				return cartItem;
			};
			
			var updateCartCount = function(){
				$scope.cartItemSize = Object.keys($scope.cartItems).length;
			};
			
			var compareQuantity = function(savedCartItem,cartItemToBeSaved){
				return compareUserIdAndProductId(savedCartItem,cartItemToBeSaved) && savedCartItem.quantity != cartItemToBeSaved.quantity;
			};
			
			var compareUserIdAndProductId = function(savedCartItem,cartItemToBeSaved){
				return savedCartItem.productId === cartItemToBeSaved.productId && savedCartItem.userId === cartItemToBeSaved.userId;
			};
			
			$scope.navToOrderHistory = function(){
				$location.path("/orderHistory");
			};
			
			Session.cartItems = $scope.cartItems;
			
			$scope.signOut = function(){
				Session.currentUser = null;
				$location.path("/login");
			};
		} ]);