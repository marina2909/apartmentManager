angular.module("apartmentManagement")
  .factory("Booking", function BookingsFactory($http){
    return {
         all: function() {
           return $http({method: 'GET', url: "/bookings"});
         }
       };
  });
