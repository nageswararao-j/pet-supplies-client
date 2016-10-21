'use strict';

app.controller('MainCtrl', [ '$scope','ReferentialDataService','DataLoadService', function($scope,ReferentialDataService,DataLoadService) {
	$scope.cartItems = []; 
	$scope.isItemsPresent = false;
	
	$scope.load = function(type) {
		$scope.pettype = type;
		$scope.products = type;
		if ($scope.pettype == 'Dogs') {
			DataLoadService.getAllDogs().then(function(data) {
				$scope.petsDetail = data;
			}, function(errResponse) {
				console.error('Error while fetching dogs');
			});
		} else {
			DataLoadService.getAllCats().then(function(data) {
				$scope.petsDetail = data;
			}, function(errResponse) {
				console.error('Error while fetching cats');
			});
		}
	};
	$scope.petsList = ReferentialDataService.getAllPets();
	
	$scope.addToCart = function(item) {
		$scope.isItemsPresent = true;
		if($scope.cartItems.length == 0){
			$scope.cartItems.push(item);	
		}else if(!isItemFoundInCart(item.id)){	
			$scope.cartItems.push(item);	
		}
	}
	
	function isItemFoundInCart(itemId){
		var isPresent = false;
		$scope.cartItems.find(function(element){
		    if(element.id == itemId) 
		    	isPresent = true;
		})
		return isPresent;
	}
	
	$scope.showCartItems = function(){
		if($scope.cartItems.length != 0){
			$scope.isItemsPresent = true;	
		}
		
	}
	
	$scope.removeCartItem = function(item){
		if(isItemFoundInCart(item.id)){
			$scope.cartItems.splice($scope.cartItems.indexOf(item), 1);
		}
		if($scope.cartItems.length == 0){
			$scope.isItemsPresent = false;
		}
	}
	
//	$scope.updateItemQty = function(item){
//		console.log(item.name + ' == '+item.quantity);
//	}
	
} ]);