angular.module("apartmentManagement")
    .factory("Apartment", function ApatmentFactory($http) {
        return {
            all: function() {
                return $http({
                    method: 'GET',
                    url: "/apartments"
                });
            },
            find: function(id) {
                return $http({
                    method: 'GET',
                    url: '/apartments/' + id
                });
            },
            update: function(appObj) {
                return $http({
                    method: 'PUT',
                    url: '/apartments/' + appObj._id,
                    data: appObj
                });
            },
            create: function(appObj) {
                return $http({
                    method: 'POST',
                    url: '/apartments',
                    data: appObj
                });
            },
            delete: function(id) {
                return $http({
                    method: 'DELETE',
                    url: '/apartments/' + id
                });
            }
        };
    });