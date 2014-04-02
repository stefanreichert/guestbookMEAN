'use strict'

var guestbookApp = angular.module('guestbookApp', ['controllers', 'ngRoute']);

guestbookApp.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
		when('/guestbook', {
			templateUrl: 'partials/buttonBar.html'
		}).
		when('/guestbook/dedication', {
			templateUrl: 'partials/dedicationNew.html',
			controller: 'newDedicationController'
		}).
		otherwise({
			redirectTo: '/guestbook'
		});
	}]);