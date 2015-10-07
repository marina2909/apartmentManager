angular.module("apartmentManagement")
  .controller("ApartmentsEditController", function($scope, Apartment, $routeParams, $location){
    Apartment.find({name: $routeParams.name}).success(function(response){
        $scope.apartment = response;
    });
    $scope.updateApartment = function(apartment){
      Apartment.update(apartment).then(function success(response){
          $location.path('/apartments/'+apartment.name);
      }, function error(response){

      });
    }
});
