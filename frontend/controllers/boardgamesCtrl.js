angular.module("MainApp")
    .controller("BoardgamesCtrl", ["$scope", "BoardgameService", function ($scope, BoardgameService) {


        $scope.boardgames = BoardgameService.boardgames;
        $scope.toggleShowAll = false;
        $scope.toggleAdd = false;
        $scope.toggleSearch = false;
        $scope.q = "";

        //New Boardgame Data
        $scope.newBoardgame = {};

        //Updated Boardgame Data
        $scope.updatedBoardgame = {};

        var getAll = function () {
            BoardgameService.get().then(function () {
                $scope.boardgames = _.sortBy(BoardgameService.boardgames, function (i) {
                    return i.title.toLowerCase();
                });
                //console.log($scope.boardgames);
            });
        };

        getAll();

        $scope.showAll = function () {
            if ($scope.toggleShowAll) getAll();
            $scope.toggleShowAll = !$scope.toggleShowAll;
            componentHandler.upgradeAllRegistered();
        };

        componentHandler.upgradeAllRegistered();

        //GET boardgame
        $scope.search = function () {
            if ($scope.q) {

                BoardgameService.getBoardgame($scope.q).then(function (response) {
                    $scope.boardgames = response;
                    if (!$scope.toggleShowAll) $scope.toggleShowAll = !$scope.toggleShowAll;
                    $scope.q = "";
                });
            }
        };

        //POST a boardgame
        $scope.post = function () {
            BoardgameService.post($scope.newBoardgame).then(function () {
                $scope.boardgames = BoardgameService.boardgames;
            });
            $scope.newBoardgame = {};
        };

        //UPDATE a boardgame
        $scope.update = function (index) {
            BoardgameService.put(index, $scope.updatedBoardgame).then(function () {
                $scope.boardgames = BoardgameService.boardgames;
                $scope.updatedBoardgame = {};
            });
        };

        //DELETE a boardgame
        $scope.delete = function (id) {
            BoardgameService.delete(id).then(function () {
                $scope.boardgames = BoardgameService.boardgames;
            });
        };

        //TOAST
        (function () {
            'use strict';
            var snackbarContainer = document.querySelector('#demo-toast-example');
            var showToastButton = document.querySelector('#demo-show-toast');
            showToastButton.addEventListener('click', function () {
                var data = {
                    message: 'Added ' + $scope.newBoardgame.title
                };
                snackbarContainer.MaterialSnackbar.showSnackbar(data);
            });
        }());

        $scope.reverse = function () {
            $scope.boardgames = $scope.boardgames.reverse();
        };


    }]);