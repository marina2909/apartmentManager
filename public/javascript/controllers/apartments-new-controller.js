angular.module("apartmentManagement")
    .controller("ApartmentsNewController", function($scope, $rootScope, Apartment, Armenities, $routeParams, $location) {
        $scope.apartment = {};
        Armenities.all()
            .then(function success(response) {
                $scope.apartment.armenities = response.data;
            }, function error(error) {
                $rootScope.errorMessage = error;;
            });

        $scope.saveApartment = function() {
            Apartment.create($scope.apartment)
                .then(function success(response) {
                    $location.path('/apartments');
                }, function error(error) {
                    $rootScope.errorMessage = error;
                });
        }
    });