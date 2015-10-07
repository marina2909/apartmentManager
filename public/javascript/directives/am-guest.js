 angular.module("apartmentManagement")
	.directive("amGuest", function($http){
		return {
			templateUrl : "templates/directives/am-guest.html",
			scope:{
				guest : "="
			},
			controller : function($scope){
				$scope.removeGuest = function(event, name){
					var that = event.target;
					if (!confirm('Are you sure you want to delete this record')){
						return false;
					}
					$http({method: 'DELETE'
						, url: '/guests/'+name
					}).then(function success(res){
						$(that).parents('tr').remove();
					}, function error(err){
						// TODO error handling
					});
				};
				$scope.setGuestName = function(guest){
					$scope.$emit("newFormData", guest);
				}
			}
		};
})