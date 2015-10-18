angular.module("apartmentManagement")
  .factory("Armenities", function ArmenitiesFactory($http){
    return {
         all: function() {
           return $http({method: 'GET', url: "/armenities"});
         }
       };
  });
