angular.module("apartmentManagement")
  .controller("ApartmentsIndexController", function($scope, Apartment){
    Apartment.all()
      .then(function success(response){
    		$scope.apartments = response.data;
    	}, function error(response){
        $scope.error = response.data;
    	});
});
