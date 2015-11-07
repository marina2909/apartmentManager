 angular.module("apartmentManagement")
     .directive("amGuest", function($http, Guest) {
         return {
             templateUrl: "templates/directives/am-guest.html",
             scope: {
                 guest: "="
             },
             link: function($scope) {
                 $scope.removeGuest = function(event, name) {
                     var that = event.target;
                     if (!confirm('Are you sure you want to delete this record?')) {
                         return false;
                     }
                     Guest.delete(name).then(function success(res) {
                         $(that).parents('tr').remove();
                     }, function error(err) {
                         // TODO error handling
                     });
                 };
                 $scope.setGuestName = function(guest) {
                     $scope.$emit("newFormData", guest);
                 }
             }
         };
     })