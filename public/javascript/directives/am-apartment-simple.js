angular.module("apartmentManagement")
    .directive("amApartmentSimple", function($http, Apartment) {
        return {
            restrict: 'E',
            templateUrl: "templates/directives/am-apartment-simple.html",
            scope: true
        };
    })