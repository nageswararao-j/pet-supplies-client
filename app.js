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
app.config([ '$routeProvider', '$stateProvider', 'USER_ROLES','ENVIRONMENT',
		function($routeProvider, $stateProvider, USER_ROLES,ENVIRONMENT) {
			var baseUrl = ''; 
			if(ENVIRONMENT.mode === 'prod'){
				baseUrl	= ENVIRONMENT.baseUrl;
			}
			$routeProvider.when('/login', {
				templateUrl : baseUrl+'/views/login.html',
				controller : 'LoginController',
				controllerAs : 'login'
			}).when('/signUp', {
				templateUrl :  baseUrl+'/views/signUp.html',
				controller : 'SignUpController',
				controllerAs : 'signUp'
			}).when('/main', {
				templateUrl :  baseUrl+'/views/main.html',
				controller : 'MainCtrl',
				controllerAs : 'main'
			}).when('/order', {
				templateUrl :  baseUrl+'/views/order.html',
				controller : 'OrderController',
				controllerAs : 'order'
			}).when('/orderHistory', {
				templateUrl :  baseUrl+'/views/orderHistory.html',
				controller : 'OrderHistoryController',
				controllerAs : 'orderHistory'
			}).otherwise({
				redirectTo : '/login'
			});
			$stateProvider.state('index', {
				url : '/views',
				templateUrl : baseUrl+'/index.html',
				data : {
					authorizedRoles : [ USER_ROLES.admin, USER_ROLES.editor,USER_ROLES.newUser ]
				}
			});
		} ]);

app.run([ '$rootScope', 'ENVIRONMENT', function($rootScope, ENVIRONMENT) {
	$rootScope.baseUrl = ENVIRONMENT.baseUrl;
} ]);