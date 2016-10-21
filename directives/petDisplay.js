app.directive('petDisplay', function() {
	return {
		template : '<ng-include src="displayPet()"/>',
		scope : false,
		restrict : 'E',
		controller : function($scope) {
			$scope.displayPet = function() {
					return "views/pet-display.html";
			}
		}
	};
});