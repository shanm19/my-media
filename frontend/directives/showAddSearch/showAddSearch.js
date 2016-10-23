angular.module("MainApp")
    .directive("showAddSearch", function () {
        return {
            restrict: "E",
            templateUrl: "./directives/showAddSearch/showAddSearch.html",
            link: function (scope, element, attr) {
                element.ready(function () {
                    componentHandler.upgradeAllRegistered(element);
                });
            }
        };
    });