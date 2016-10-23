var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
//var cors = require('cors');
var mongoose = require('mongoose');
var pathRoute = require('path');

var bookRoute = require('./routes/bookRoute');
var movieRoute = require('./routes/movieRoute');
var videogameRoute = require('./routes/videogameRoute');
var boardgameRoute = require('./routes/boardgameRoute');

var app = express();

mongoose.connect("mongodb://localhost/media", function () {
    console.log("Mongoose caught the weasel!");
});

//Middleware
//app.use(cors());
app.use(bodyParser.json());
app.use(logger("dev"));

app.use(express.static(pathRoute.join(__dirname, "..", "frontend")));

//Routes
app.use("/media/books", bookRoute);
app.use("/media/movies", movieRoute);
app.use("/media/videogames", videogameRoute);
app.use("/media/boardgames", boardgameRoute);

app.listen(8000, function () {
    console.log("All's good on 8000!");
});