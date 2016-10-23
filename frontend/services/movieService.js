angular.module("MainApp")
    .service("MovieService", ["$http", function ($http) {

        var _this = this;
        var baseUrl = "http://localhost:8000";
        this.movies = [];

        //GET
        this.get = function () {
            return $http.get("/media/movies").then(function (response) {
                _this.movies = response.data;
                return response.data;
            });
        };

        //GET a movie
        this.getMovie = function (q) {
            return $http.get("/media/movies?title=" + q).then(function (response) {
                return response.data;
            });
        };

        //POST
        this.post = function (newMovie) {
            return $http.post("/media/movies", newMovie).then(function (response) {
                console.log("response.data ", response.data);
                _this.movies.push(response.data);
                return response.data;
            });
        };

        //PUT
        this.put = function (index, updatedMovie) {
            var movieID = _this.movies[index]._id;
            return $http.put("/media/movies/" + movieID, updatedMovie).then(function (response) {
                _this.movies[index] = response.data;
                return response.data;
            });
        };

        //DELETE
        this.delete = function (index) {
            var movieID = _this.movies[index]._id;
            return $http.delete("/media/movies/" + movieID).then(function (response) {
                _this.movies.splice(index, 1);
                return response.data;
            });
        };

    }]);