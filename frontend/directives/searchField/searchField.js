angular.module("MainApp")
    .directive("searchField", function () {
        return {
            restrict: 'E',
            templateUrl: './directives/searchField/searchField.html',
            link: function (scope, element, attr) {
                element.ready(function () {
                    componentHandler.upgradeAllRegistered(element);
                });
            }
        };
    });