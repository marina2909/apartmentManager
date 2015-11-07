angular.module("apartmentManagement")
    .directive("amHeaderBar", function($http, Apartment) {
        return {
            restrict: 'E',
            templateUrl: "templates/directives/am-header-bar.html",
            scope: {
                title: '@title',
                link: '@link'
            }
        };
    })