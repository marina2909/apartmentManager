angular.module("apartmentManagement")
.factory("Guest", function GuestFactory($http){
	var name = "";
	return {
		all: function(){
			return 	$http({method : 'GET', url: '/guests'});
		} ,
		create: function(guest){
			return $http({method:'POST', url:'/guests', data: guest});
		}
	}
});
