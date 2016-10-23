var express = require('express');
var Videogame = require('../schemas/videogameSchema');

var videogameRoute = express.Router();

videogameRoute.route('/')
    .get(function (req, res) {
        if (req.query.title) {
            Videogame.find({
                title: req.query.title
            }, function (err, videogame) {
                if (err) res.status(500).send(err);
                res.send(videogame);
            });
        } else {
            Videogame.find({}, function (err, videogames) {
                if (err) res.status(500).send(videogames);
                res.send(videogames);
            });
        }
    })
    .post(function (req, res) {
        var newVideogame = new Videogame(req.body);
        newVideogame.save(function (err, savedVideogame) {
            if (err) res.status(500).send(err);
            res.send(savedVideogame);
        });
    });

videogameRoute.route('/:id')
    .get(function (req, res) {
        var vgID = req.params.id;
        Videogame.find({
            _id: vgID
        }, function (err, foundVG) {
            if (err) res.status(500).send(err);
            res.send(foundVG);
        });
    })
    .put(function (req, res) {
        var vgID = req.params.id;
        Videogame.findOneAndUpdate({
                _id: vgID
            },
            req.body, {
                new: true
            },
            function (err, updatedVG) {
                if (err) res.status(500).send(err);
                res.send(updatedVG);
            });
    })
    .delete(function (req, res) {
        var vgID = req.params.id;
        Videogame.findOneAndRemove({
            _id: vgID
        }, function (err, deletedVG) {
            if (err) res.status(500).send(err);
            res.send(deletedVG);
        });
    });

module.exports = videogameRoute;