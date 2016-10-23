angular.module("MainApp")
    .service("BoardgameService", ["$http", function ($http) {

        var _this = this;
        var baseUrl = "http://localhost:8000";
        this.boardgames = [];

        //GET
        this.get = function () {
            return $http.get("/media/boardgames").then(function (response) {
                _this.boardgames = response.data;
                return response.data;
            });
        };

        //GET a boardgame
        this.getBoardgame = function (q) {
            return $http.get("/media/boardgames?title=" + q).then(function (response) {
                return response.data;
            });
        };

        //POST
        this.post = function (newBoardgame) {
            return $http.post("/media/boardgames", newBoardgame).then(function (response) {
                _this.boardgames.push(response.data);
                return response.data;
            });
        };

        //PUT
        this.put = function (index, updatedBoardgame) {
            var boardgameID = _this.boardgames[index]._id;
            return $http.put("/media/boardgames/" + boardgameID, updatedBoardgame).then(function (response) {
                _this.boardgames[index] = response.data;
                return response.data;
            });
        };

        //DELETE
        this.delete = function (index) {
            var boardgameID = _this.boardgames[index]._id;
            return $http.delete("/media/boardgames/" + boardgameID).then(function (response) {
                _this.boardgames.splice(index, 1);
                return response.data;
            });
        };

    }]);