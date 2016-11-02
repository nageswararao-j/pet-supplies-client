'use strict';

app.controller('CheckoutController', [ '$scope', '$modal', function($scope, $modal) {
	$scope.open = function() {
		var $modalInstance = $modal.open({
			templateUrl : 'views/checkout.html',
		});
	}
	$scope.close = function() {
		$modalInstance.dismiss('cancel');
	};
} ]);