angular.module("apartmentManagement")
    .controller("ApartmentsShowController", function($scope, $rootScope, Apartment, $routeParams) {
        Apartment.find($routeParams.id)
            .then(function success(response) {
                $scope.apartment = response.data;
            }, function error(console.error();) {
                $rootScope.errorMessage = error;
            });
    });