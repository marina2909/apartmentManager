angular.module("apartmentManagement")
    .controller("ApartmentsNewController", function($scope, Apartment, Armenities, $routeParams, $location) {
        $scope.apartment = {};
        Armenities.all()
            .then(function success(response) {
                $scope.apartment.armenities = response.data;
            }, function error(response) {
                $scope.error = respose.data;
            });

        $scope.saveApartment = function() {
            Apartment.create($scope.apartment)
                .then(function success(response) {
                    $location.path('/apartments');
                }, function error(response) {
                    $scope.formErrors = 'Error creating apartment';
                });
        }
    });