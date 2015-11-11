angular.module("apartmentManagement")
    .controller("ApartmentsEditController", function($scope, $rootScope, Apartment, $routeParams, $location) {
        $scope.apartment = {};
        Apartment.find($routeParams.id).success(function(response) {
            $scope.apartment = response;
        });

        $scope.updateApartment = function(apartment) {
            Apartment.update(apartment).then(function success(response) {
                $location.path('/apartments/' + apartment._id);
            }, function error(error) {
                $rootScope.errorMessage = error;
            });
        }
    });