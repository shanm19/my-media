angular.module("MainApp")
    .controller("MoviesCtrl", ["$scope", "MovieService", function ($scope, MovieService) {


        $scope.movies = MovieService.movies;
        $scope.toggleShowAll = false;
        $scope.toggleAdd = false;
        $scope.toggleSearch = false;
        $scope.q = "";

        //New Movie Data
        $scope.newMovie = {};

        //Updated Movie Data
        $scope.updatedMovie = {};

        var getAll = function () {
            MovieService.get().then(function () {
                $scope.movies = _.sortBy(MovieService.movies, function (i) {
                    return i.title.toLowerCase();
                });
                //console.log($scope.movies);
            });
        };

        getAll();

        $scope.showAll = function () {
            if ($scope.toggleShowAll) getAll();
            $scope.toggleShowAll = !$scope.toggleShowAll;
            componentHandler.upgradeAllRegistered();
        };

        componentHandler.upgradeAllRegistered();

        //GET movie
        $scope.search = function () {
            if ($scope.q) {

                MovieService.getMovie($scope.q).then(function (response) {
                    $scope.movies = response;
                    if (!$scope.toggleShowAll) $scope.toggleShowAll = !$scope.toggleShowAll;
                    $scope.q = "";
                });
            }
        };

        //POST a movie
        $scope.post = function () {
            MovieService.post($scope.newMovie).then(function () {
                $scope.movies = MovieService.movies;
            });
            $scope.newMovie = {};
        };

        //UPDATE a movie
        $scope.update = function (index) {
            MovieService.put(index, $scope.updatedMovie).then(function () {
                $scope.movies = MovieService.movies;
                $scope.updatedMovie = {};
            });
        };

        //DELETE a movie
        $scope.delete = function (id) {
            MovieService.delete(id).then(function () {
                $scope.movies = MovieService.movies;
            });
        };

        //TOAST
        (function () {
            'use strict';
            var snackbarContainer = document.querySelector('#demo-toast-example');
            var showToastButton = document.querySelector('#demo-show-toast');
            showToastButton.addEventListener('click', function () {
                var data = {
                    message: 'Added ' + $scope.newMovie.title
                };
                snackbarContainer.MaterialSnackbar.showSnackbar(data);
            });
        }());

        $scope.reverse = function () {
            $scope.movies = $scope.movies.reverse();
        };


    }]);