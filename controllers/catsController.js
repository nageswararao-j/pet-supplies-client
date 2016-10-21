app.controller("CatsController", [ "$scope", 'DataLoadService',
		function($scope, DataLoadService) {
			if ($scope.pettype == 'Dogs') {
				DataLoadService.getAllDogs().then(function(data) {
					console.log(data);
					$scope.petsDetail = data;
				}, function(errResponse) {
					console.error('Error while fetching dogs');
				});
			} else {
				DataLoadService.getAllCats().then(function(data) {
					console.log(data);
					$scope.petsDetail = data;
				}, function(errResponse) {
					console.error('Error while fetching cats');
				});
			}
			$scope.addToCart = function(cat) {
				console.log(cat);
			}
		} ]);