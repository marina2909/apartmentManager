angular.module('apartmentManagement')
    .controller('BookingsEditController', function($scope, $filter, $location, $rootScope, $routeParams, Booking, Apartment) {

        $scope.booking = {};
        $scope.loadData = function() {
            Apartment.all()
                .then(function success(response) {
                    $scope.apartments = response.data;
                }, function error(error) {
                    $rootScope.errorMessage = error;
                })
                .then(function() {
                    Booking.find($routeParams.id)
                        .then(function success(response) {
                            $scope.booking = response.data;
                            $scope.booking.arrivalDate = $filter("date")($scope.booking.arrivalDate, 'yyyy-MM-dd');
                            $scope.booking.departureDate = $filter("date")($scope.booking.departureDate, 'yyyy-MM-dd');
                            $scope.apartments.forEach(function(apartment) {
                                if (apartment._id == $scope.booking.apartment) {
                                    $scope.apartmentSelected = apartment;
                                }
                            });
                        }, function error(error) {
                            $rootScope.errorMessage = error;
                        })
                });


        }
        $scope.loadData();

        $scope.onChangeApartment = function(apartment) {
            $scope.booking.apartment = apartment._id;
        }

        $scope.editBooking = function() {
            Booking.update($scope.booking)
                .success(function(response) {
                    $location.path('/bookings');
                }).error(function(error) {
                    $rootScope.errorMessage = error;
                });
        }

    });