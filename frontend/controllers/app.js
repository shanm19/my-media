var app = angular.module("MainApp", ["ui.router"]);

app.config(function ($stateProvider) {

    $stateProvider.state("otherwise", {
        name: "movies",
        url: "/movies",
        templateUrl: "./templates/movies.html",
        controller: "MoviesCtrl"
    });

    var moviesState = {
        name: "movies",
        url: "/movies",
        templateUrl: "./templates/movies.html",
        controller: "MoviesCtrl"
    };
    var videogamesState = {
        name: "videogames",
        url: "/videogames",
        templateUrl: "./templates/videogames.html",
        controller: "VideogamesCtrl"
    };
    var booksState = {
        name: "books",
        url: "/books",
        templateUrl: "./templates/books.html",
        controller: "BooksCtrl"
    };
    var boardgamesState = {
        name: "boardgames",
        url: "/boardgames",
        templateUrl: "./templates/boardgames.html",
        controller: "BoardgamesCtrl"
    };

    $stateProvider.state(moviesState);
    $stateProvider.state(videogamesState);
    $stateProvider.state(booksState);
    $stateProvider.state(boardgamesState);

});

app.controller("MainController", ["$scope", "$state", function ($scope, $state) {

}]);