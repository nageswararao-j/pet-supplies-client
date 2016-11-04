'use strict';

/**
 * @ngdoc overview
 * @name petApp
 * @description # petApp
 * 
 * Main module of the application.
 */
var app = angular.module('petApp', [
// 'ngAnimate',
// 'ngAria',
// 'ngCookies',
// 'ngMessages',
'ngResource', 'ngRoute', 'ui.bootstrap', 'ui.router',
// 'ngSanitize',
// 'ngTouch'
]);
app.config([ '$routeProvider', '$stateProvider', 'USER_ROLES',
		function($routeProvider, $stateProvider, USER_ROLES) {
			$routeProvider.when('/login', {
				templateUrl : 'views/login.html',
				controller : 'LoginController',
				controllerAs : 'login'
			}).when('/main', {
				templateUrl : 'views/main.html',
				controller : 'MainCtrl',
				controllerAs : 'main'
			}).when('/order', {
				templateUrl : 'views/order.html',
				controller : 'OrderController',
				controllerAs : 'order'
			}).when('/orderHistory', {
				templateUrl : 'views/orderHistory.html',
				controller : 'OrderHistoryController',
				controllerAs : 'orderHistory'
			}).otherwise({
				redirectTo : '/login'
			});
			$stateProvider.state('index', {
				url : '/views',
				templateUrl : 'views/index.html',
				data : {
					authorizedRoles : [ USER_ROLES.admin, USER_ROLES.editor ]
				}
			});
		} ]);

app.run([ '$rootScope', 'ENVIRONMENT', function($rootScope, ENVIRONMENT) {
	$rootScope.baseUrl = ENVIRONMENT.baseUrl;
} ]);