angular.module("apartmentManagement")
    .factory("Booking", function BookingsFactory($http) {
        return {
            all: function() {
                return $http({
                    method: 'GET',
                    url: "/bookings"
                });
            },
            find: function(id) {
                return $http({
                    method: 'GET',
                    url: '/bookings/' + id
                });
            },
            update: function(obj) {
                return $http({
                    method: 'PUT',
                    url: '/bookings/' + obj._id,
                    data: obj
                });
            },
            create: function(obj) {
                return $http({
                    method: 'POST',
                    url: '/bookings',
                    data: obj
                });
            },
            delete: function(id) {
                return $http({
                    method: 'DELETE',
                    url: '/bookings/' + id
                });
            }
        };
    });