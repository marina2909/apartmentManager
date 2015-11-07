angular.module("apartmentManagement")
    .directive("amApartmentForm", function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/directives/am-apartment-form.html',
            scope: {
                apartment: '=',
                submit: '&submit'
            },
            link: function(scope) {
                scope.submitApartment = function(apartment) {
                    scope.submit(apartment);
                }
            }
        }
    });