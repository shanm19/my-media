angular.module("MainApp")
    .service("BookService", ["$http", function ($http) {

        var _this = this;
        var baseUrl = "http://localhost:8000";
        this.books = [];

        //GET
        this.get = function () {
            return $http.get("/media/books").then(function (response) {
                _this.books = response.data;
                return response.data;
            });
        };

        //GET a book
        this.getBook = function (q) {
            return $http.get("/media/books?title=" + q).then(function (response) {
                return response.data;
            });
        };

        //POST
        this.post = function (newBook) {
            return $http.post("/media/books", newBook).then(function (response) {
                _this.books.push(response.data);
                return response.data;
            });
        };

        //PUT
        this.put = function (index, updatedBook) {
            var bookID = _this.books[index]._id;
            return $http.put("/media/books/" + bookID, updatedBook).then(function (response) {
                _this.books[index] = response.data;
                return response.data;
            });
        };

        //DELETE
        this.delete = function (index) {
            var bookID = _this.books[index]._id;
            return $http.delete("/media/books/" + bookID).then(function (response) {
                _this.books.splice(index, 1);
                return response.data;
            });
        };

    }]);