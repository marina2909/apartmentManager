angular.module('apartmentManagement')
    .controller('guestsController', function($scope, Guest) {
        $scope.showModal = true;

        $scope.toggleModal = function() {
            $scope.showModal = !$scope.showModal;
        };

        Guest.all()
            .then(function success(response) {
                $scope.guests = response.data;
            }, function error(response) {
                $scope.formErrors = response.data;
            });

        $scope.formData = {};
        $scope.formErrors = null;
        $scope.saveGuest = function() {
            var that = $scope;
            Guest.create(that.formData)
                .then(function success(response) {
                    that.guests.push(that.formData);
                    that.formData = {};
                }, function error(response) {
                    that.formErrors = 'error creating guest'; //guest.data.error
                });

        }

    });