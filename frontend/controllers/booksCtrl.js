angular.module("MainApp")
    .controller("BooksCtrl", ["$scope", "BookService", function ($scope, BookService) {


        $scope.books = BookService.books;
        $scope.toggleShowAll = false;
        $scope.toggleAdd = false;
        $scope.toggleSearch = false;
        $scope.q = "";

        //New Book Data
        $scope.newBook = {};

        //Updated Book Data
        $scope.updatedBook = {};

        var getAll = function () {
            BookService.get().then(function () {
                $scope.books = _.sortBy(BookService.books, function (i) {
                    return i.title.toLowerCase();
                });
                //console.log($scope.books);
            });
        };

        getAll();

        $scope.showAll = function () {
            if ($scope.toggleShowAll) getAll();
            $scope.toggleShowAll = !$scope.toggleShowAll;
            componentHandler.upgradeAllRegistered();
        };

        componentHandler.upgradeAllRegistered();

        //GET book
        $scope.search = function () {
            if ($scope.q) {

                BookService.getBook($scope.q).then(function (response) {
                    $scope.books = response;
                    if (!$scope.toggleShowAll) $scope.toggleShowAll = !$scope.toggleShowAll;
                    $scope.q = "";
                });
            }
        };

        //POST a book
        $scope.post = function () {
            BookService.post($scope.newBook).then(function () {
                $scope.books = BookService.books;
            });
            $scope.newBook = {};
        };

        //UPDATE a book
        $scope.update = function (index) {
            BookService.put(index, $scope.updatedBook).then(function () {
                $scope.books = BookService.books;
                $scope.updatedBook = {};
            });
        };

        //DELETE a book
        $scope.delete = function (id) {
            BookService.delete(id).then(function () {
                $scope.books = BookService.books;
            });
        };

        //TOAST
        (function () {
            'use strict';
            var snackbarContainer = document.querySelector('#demo-toast-example');
            var showToastButton = document.querySelector('#demo-show-toast');
            showToastButton.addEventListener('click', function () {
                var data = {
                    message: 'Added ' + $scope.newBook.title
                };
                snackbarContainer.MaterialSnackbar.showSnackbar(data);
            });
        }());

        $scope.reverse = function () {
            $scope.books = $scope.books.reverse();
        };


    }]);