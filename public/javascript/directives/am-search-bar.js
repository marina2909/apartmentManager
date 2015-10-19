angular.module("apartmentManagement")
 .directive("amSearchBar", function($http, Apartment){
   return {
     restrict: 'E',
     templateUrl : "templates/directives/am-search-bar.html",
     scope:{
       title : '@title',
       link : '@link',
       search : '='
     }
   };
})
