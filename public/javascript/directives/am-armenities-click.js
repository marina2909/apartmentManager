angular.module("apartmentManagement")
.directive("amArmenitiesClick", function(){
  return {
    restrict : 'E',
    templateUrl : 'templates/directives/am-armenities-click.html',
    scope : {
      armenities : '=armenities',
      apartment : '=apartment'
    },
    link : function(scope, element, attrs){
      scope.clickedArmenities = {};
      scope.setArmenity = function(serviceName, index){
        scope.apartment.armenities[index] = {name : serviceName, active : scope.clickedArmenities[index]}
      }
    }
  }
});
