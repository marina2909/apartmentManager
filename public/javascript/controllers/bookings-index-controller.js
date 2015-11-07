angular.module("apartmentManagement")
    .controller("BookingsIndexController", function($scope, Booking) {
        Booking.all()
            .then(function success(response) {
                console.log(response.data);
                $scope.bookings = response.data;
            }, function error(response) {
                $scope.error = response.data;
            });
    });