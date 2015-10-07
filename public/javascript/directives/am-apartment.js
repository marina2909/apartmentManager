angular.module("apartmentManagement")
 .directive("amApartment", function($http){
   return {
     restrict: 'E',
     templateUrl : "templates/directives/am-apartment.html",
     scope:{
       apartment : "="
     },
     controller : function($scope){
     }
   };
})
