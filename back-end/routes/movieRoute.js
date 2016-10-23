var express = require('express');

var movieRoute = express.Router();

var Movie = require('../schemas/movieSchema');

movieRoute.route('/')
    .get(function (req, res) {
        if (req.query.title) {
            Movie.find({
                title: req.query.title
            }, function (err, movie) {
                if (err) res.status(500).send(err);
                res.send(movie);
            });
        } else {
            Movie.find({}, function (err, movies) {
                if (err) res.status(500).send(movies);
                res.send(movies);
            });
        }
    })
    .post(function (req, res) {
        var newMovie = new Movie(req.body);
        newMovie.save(function (err, savedMovie) {
            if (err) res.status(500).send(err);
            res.send(savedMovie);
        });
    });

movieRoute.route('/:id')
    .get(function (req, res) {
        var movieID = req.params.id;
        Movie.find({
            _id: movieID
        }, function (err, foundMovie) {
            if (err) res.status(500).send(err);
            res.send(foundMovie);
        });
    })
    .put(function (req, res) {
        var movieID = req.params.id;
        console.log(req.body);
        Movie.findOneAndUpdate({
                _id: movieID
            },
            req.body, {
                new: true
            },
            function (err, updatedMovie) {
                if (err) res.status(500).send(err);
                res.send(updatedMovie);
            });
    })
    .delete(function (req, res) {
        var movieID = req.params.id;
        Movie.findOneAndRemove({
            _id: movieID
        }, function (err, deletedMovie) {
            if (err) res.status(500).send(err);
            res.send(deletedMovie);
        });
    });

module.exports = movieRoute;