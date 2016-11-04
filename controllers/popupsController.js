'use strict';

app.controller('PopupsController', [ '$scope', '$modal', function($scope, $modal) {
	$scope.openPlaceOrder = function(cartItems) {
		var $modalInstance = $modal.open({
			templateUrl : 'views/checkout.html',
			controller : 'PlaceOrderController',
			resolve : {
				items : function(){
					return cartItems;
				}
			}
		});
	};
} ]);