
angular.module("apartmentManagement")
  .factory("Apartment", function ApatmentFactory($http){
    return {
         all: function() {
           return $http({method: 'GET', url: "/apartments"});
         },
         find: function(name){
           return $http({method:'GET', url: '/apartments/' + name});
         },
         update: function(appObj) {
            return $http({method: 'PUT', url: '/apartments', data: appObj});
         },
         create: function(appObj) {
           return $http({method: 'POST', url: '/apartments', data: appObj});
         },
         delete: function(name){
           return $http({method:'DELETE', url: '/apartments/' + name});
     		 }
       };
  });
