angular.module('apartmentManagement', ['ngRoute'])
.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
	$routeProvider
		.when('/', {
			templateUrl: '/templates/pages/menu/index.html'
		  })
		.when('/guests', {
			controller: 'guestsController',
			templateUrl: '/templates/pages/guests/index.html'
		  })
		.when('/apartments', {
			templateUrl : '/templates/pages/apartments/index.html',
			controller : 'ApartmentsIndexController'
		})
		.when('/apartments/:name/edit', {
			templateUrl : '/templates/pages/apartments/edit.html',
			controller : 'ApartmentsEditController'
		})
		.when('/apartments/new', {
			templateUrl : '/templates/pages/apartments/new.html',
			controller : 'ApartmentsNewController'
		})
		.when('/apartments/:name', {
			templateUrl : '/templates/pages/apartments/show.html',
			controller : 'ApartmentsShowController'
		})
		.when('/bookings', {
				templateUrl : '/templates/pages/bookings/index.html',
				controller : 'BookingsIndexController'
		});

		// .otherwise({redirectTo : '/guests'});
}]);
