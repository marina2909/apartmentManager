angular.module('apartmentManagement', ['ngRoute'])
    .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: '/templates/pages/menu/index.html'
            })
            .when('/guests', {
                controller: 'guestsController',
                templateUrl: '/templates/pages/guests/index.html'
            })
            .when('/apartments', {
                templateUrl: '/templates/pages/apartments/index.html',
                controller: 'ApartmentsIndexController'
            })
            .when('/apartments/:id/edit', {
                templateUrl: '/templates/pages/apartments/edit.html',
                controller: 'ApartmentsEditController'
            })
            .when('/apartments/new', {
                templateUrl: '/templates/pages/apartments/new.html',
                controller: 'ApartmentsNewController'
            })
            .when('/apartments/edit', {
                templateUrl: '/templates/pages/apartments/edit.html',
                controller: 'ApartmentsEditController'
            })
            .when('/apartments/:id', {
                templateUrl: '/templates/pages/apartments/show.html',
                controller: 'ApartmentsShowController'
            })
            .when('/bookings', {
                templateUrl: '/templates/pages/bookings/index.html',
                controller: 'BookingsIndexController'
            })
            .when('/bookings/:id/edit', {
                templateUrl: '/templates/pages/bookings/edit.html',
                controller: 'BookingsEditController'
            })
            .when('/bookings/new', {
                templateUrl: '/templates/pages/bookings/new.html',
                controller: 'BookingsNewController'
            });

        // .otherwise({redirectTo : '/guests'});
    }]);