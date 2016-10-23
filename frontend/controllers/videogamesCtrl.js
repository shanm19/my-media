angular.module("MainApp")
    .controller("VideogamesCtrl", ["$scope", "VideogameService", function ($scope, VideogameService) {

        $scope.videogames = VideogameService.videogames;
        $scope.toggleShowAll = false;
        $scope.toggleAdd = false;
        $scope.toggleSearch = false;
        $scope.q = "";

        //New Videogame Data
        $scope.newVideogame = {};

        //Updated Videogame Data
        $scope.updatedVideogame = {};

        var getAll = function () {
            VideogameService.get().then(function () {
                $scope.videogames = _.sortBy(VideogameService.videogames, function (i) {
                    return i.title.toLowerCase();
                });
                //console.log($scope.videogames);
            });
        };

        getAll();

        $scope.showAll = function () {
            if ($scope.toggleShowAll) getAll();
            $scope.toggleShowAll = !$scope.toggleShowAll;
            componentHandler.upgradeAllRegistered();
        };

        componentHandler.upgradeAllRegistered();

        //GET videogame
        $scope.search = function () {
            if ($scope.q) {

                VideogameService.getVideogame($scope.q).then(function (response) {
                    $scope.videogames = response;
                    if (!$scope.toggleShowAll) $scope.toggleShowAll = !$scope.toggleShowAll;
                    $scope.q = "";
                });
            }
        };

        //POST a videogame
        $scope.post = function () {
            VideogameService.post($scope.newVideogame).then(function () {
                $scope.videogames = VideogameService.videogames;
            });
            $scope.newVideogame = {};
        };

        //UPDATE a videogame
        $scope.update = function (index) {
            VideogameService.put(index, $scope.updatedVideogame).then(function () {
                $scope.videogames = VideogameService.videogames;
                $scope.updatedVideogame = {};
            });
        };

        //DELETE a videogame
        $scope.delete = function (id) {
            VideogameService.delete(id).then(function () {
                $scope.videogames = VideogameService.videogames;
            });
        };

        //TOAST
        (function () {
            'use strict';
            var snackbarContainer = document.querySelector('#demo-toast-example');
            var showToastButton = document.querySelector('#demo-show-toast');
            showToastButton.addEventListener('click', function () {
                var data = {
                    message: 'Added ' + $scope.newVideogame.title
                };
                snackbarContainer.MaterialSnackbar.showSnackbar(data);
            });
        }());

        $scope.reverse = function () {
            $scope.videogames = $scope.videogames.reverse();
        };

    }]);