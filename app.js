'use strict';

/**
 * @ngdoc overview
 * @name petApp
 * @description
 * # petApp
 *
 * Main module of the application.
 */
var app = angular.module('petApp', [
//'ngAnimate',
//'ngAria',
//'ngCookies',
//'ngMessages',
'ngResource', 'ngRoute','ui.bootstrap',
//'ngSanitize',
//'ngTouch'
]);
app.config([ '$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl : 'views/main.html',
		controller : 'MainCtrl',
		controllerAs : 'main'
	}).when('/header', {
		templateUrl : 'views/header.html',
		controller : 'controllers/TemplateController',
		controllerAs : 'header'
	}).otherwise({
		redirectTo : '/'
	});
} ]);
