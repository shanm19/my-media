angular.module("MainApp")
    .service("VideogameService", ["$http", function ($http) {

        var _this = this;
        var baseUrl = "http://localhost:8000";
        this.videogames = [];

        //GET
        this.get = function () {
            return $http.get("/media/videogames").then(function (response) {
                _this.videogames = response.data;
                return response.data;
            });
        };

        //GET a videogame
        this.getVideogame = function (q) {
            return $http.get("/media/videogames?title=" + q).then(function (response) {
                return response.data;
            });
        };

        //POST
        this.post = function (newVideogame) {
            return $http.post("/media/videogames", newVideogame).then(function (response) {
                _this.videogames.push(response.data);
                return response.data;
            });
        };

        //PUT
        this.put = function (index, updatedVideogame) {
            var videogameID = _this.videogames[index]._id;
            return $http.put("/media/videogames/" + videogameID, updatedVideogame).then(function (response) {
                _this.videogames[index] = response.data;
                return response.data;
            });
        };

        //DELETE
        this.delete = function (index) {
            var videogameID = _this.videogames[index]._id;
            return $http.delete("/media/videogames/" + videogameID).then(function (response) {
                _this.videogames.splice(index, 1);
                return response.data;
            });
        };

    }]);