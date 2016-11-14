'use strict';

app.controller('OrderHistoryController', [ '$scope','$location','Session','OrderService',
		function($scope,$location,Session,OrderService) {
		$scope.orderedProducts = {};
		OrderService.loadOrders(Session.currentUser.data.userId).then(function(loadedOrders) {
			$scope.orderedProducts = loadedOrders.data;
		});
		$scope.load = function(type){
			$location.path("/main");
		};
		$scope.cartItems = {};
} ]);