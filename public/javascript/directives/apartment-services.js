angular.module("apartmentManagement")
.directive("apartmentServices", function(){
  return {
    restrict : 'E',
    templateUrl : 'templates/directives/apartment-services.html',
    scope : {
      services : '='
    }
  }
});
