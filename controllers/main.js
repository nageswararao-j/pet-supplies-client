'use strict';

app.controller('MainCtrl', ['$scope',function ($scope) {
    $scope.load = function(type){
    	$scope.pettype = type;
    	$scope.products = type;
    	
    };
    
  }]);