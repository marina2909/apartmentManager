angular.module("apartmentManagement")
 .directive("amApartment", function($http, Apartment, $location){
   return {
     restrict: 'E',
     templateUrl : "templates/directives/am-apartment.html",
     scope:{
       apartment : "="
     },
     link : function($scope){
       $scope.removeApartment = function(event, name){
         var that = event.target;
         if (!confirm('Are you sure you want to delete this record?')){
           return false;
         }
         Apartment.delete(name).then(function success(res){
          // $(that).closest('am-apartment').parent().remove();
            $location.path('/apartments');
         }, function error(err){
           // TODO error handling
         });
       };
     }
   };
})
