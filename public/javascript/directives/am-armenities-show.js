angular.module("apartmentManagement")
.directive("amArmenitiesShow", function(){
  return {
    restrict : 'E',
    templateUrl : 'templates/directives/am-armenities-show.html',
    scope : {
      armenities : '='
    }
  }
});
