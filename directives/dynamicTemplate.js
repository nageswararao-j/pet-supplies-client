app.directive('dynatemplate', function() {
  return {
    template: '<ng-include src="getTemplateUrl()"/>',
    scope: {
    	catagory: '=catagory'
    },
    restrict: 'E',
    controller: function($scope) {
      //function used on the ng-include to resolve the template
      $scope.getTemplateUrl = function() {
        //basic handling
        if ($scope.catagory == 'BIRDS')
          return "birds.html";
        if ($scope.catagory == 'CATS')
          return "views/cats/cats.html";
        
        //return "views/cats/cats.html";
        //http://bootsnipp.com/tags/menu
        //http://bootsnipp.com/snippets/featured/dropdown-menu-ui
      }
    }
  };
});