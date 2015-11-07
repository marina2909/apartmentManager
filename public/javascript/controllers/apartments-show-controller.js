angular.module("apartmentManagement")
    .controller("ApartmentsShowController", function($scope, Apartment, $routeParams) {
        Apartment.find($routeParams.name)
            .then(function success(response) {
                $scope.apartment = response.data;
                console.log($scope.apartment);
                console.log(response.data);
            }, function error(response) {

            });
    });