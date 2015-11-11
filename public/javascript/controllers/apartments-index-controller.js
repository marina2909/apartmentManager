angular.module("apartmentManagement")
    .controller("ApartmentsIndexController", function($scope, $rootScope, Apartment) {
        Apartment.all()
            .then(function success(response) {
                $scope.apartments = response.data;
            }, function error(error) {
                $rootScope.errorMessage = error;
            });
    });