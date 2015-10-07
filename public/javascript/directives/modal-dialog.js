  angular.module("apartmentManagement")
	.directive("modalDialog", function(){
		return {
			templateUrl : "templates/directives/modal-dialog.html",
			link : function($scope, $element, $attrs){
				 var s = $scope;
				 $scope.formData = {};
				 $scope.$on("newFormData", function (e, data) {
					s.formData = data;
				  });
				  $element.on('hide.bs.modal', function (e) {
					s.formData = {};
				 });
			} 
		}
	});