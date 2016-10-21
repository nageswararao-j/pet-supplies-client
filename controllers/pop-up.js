app.controller('PopupDemoCont', [ '$scope', '$modal', function($scope, $modal) {
	$scope.open = function() {
		console.log('opening pop up');
		var $modalInstance = $modal.open({
			templateUrl : 'views/popup.html',
		});
	}
	$scope.close = function() {
		$modalInstance.dismiss('cancel');
	};
} ]);