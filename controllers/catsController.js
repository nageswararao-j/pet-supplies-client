app.controller("CatsController", [ "$scope", 'DataLoadService',
		function($scope, DataLoadService) {
			var catsList = [];
			DataLoadService.getAllCats().then(function(data) {
				console.log(data);
				$scope.catsList = data;
			}, function(errResponse) {
				console.error('Error while fetching cats');
			});

			$scope.addToCart = function(cat){
				console.log(cat);
			}
		} ]);