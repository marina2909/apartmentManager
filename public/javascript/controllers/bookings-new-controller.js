angular.module('apartmentManagement')
    .controller('BookingsNewController', function($scope, $location, $rootScope, Booking, Apartment) {
        $scope.booking = {};
        $scope.loadData = function() {
            Apartment.all()
                .then(function success(response) {
                    $scope.apartments = response.data;
                }, function error(response) {
                    $scope.error = response.data;
                });
        }
        $scope.loadData();

        $scope.onChangeApartment = function(apartment) {
            $scope.booking.apartment = apartment._id;
        }

        $scope.saveBooking = function() {
            Booking.create($scope.booking)
                .success(function(response) {
                    $location.path('/bookings');
                }).error(function(error) {
                    $rootScope.errorMessage = error;
                });
        }
    });