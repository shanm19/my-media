var express = require('express');
var Boardgame = require('../schemas/boardgameSchema');

var boardgameRoute = express.Router();

boardgameRoute.route('/')
    .get(function (req, res) {
        if (req.query.title) {
            Boardgame.find({
                title: req.query.title
            }, function (err, boardgame) {
                if (err) res.status(500).send(err);
                res.send(boardgame);
            });
        } else {
            Boardgame.find({}, function (err, boardgames) {
                if (err) res.status(500).send(boardgames);
                res.send(boardgames);
            });
        }
    })
    .post(function (req, res) {
        var newBoardgame = new Boardgame(req.body);
        newBoardgame.save(function (err, savedBoardgame) {
            if (err) res.status(500).send(err);
            res.send(savedBoardgame);
        });
    });

boardgameRoute.route('/:id')
    .get(function (req, res) {
        var bgID = req.params.id;
        Boardgame.find({
            _id: bgID
        }, function (err, foundBoardgame) {
            if (err) res.status(500).send(err);
            res.send(foundBoardgame);
        });
    })
    .put(function (req, res) {
        var bgID = req.params.id;
        Boardgame.findOneAndUpdate({
                _id: bgID
            },
            req.body, {
                new: true
            },
            function (err, updatedBoardgame) {
                if (err) res.status(500).send(err);
                res.send(updatedBoardgame);
            });
    })
    .delete(function (req, res) {
        var bgID = req.params.id;
        Boardgame.findOneAndRemove({
            _id: bgID
        }, function (err, removedBoardgame) {
            if (err) res.status(500).send(err);
            res.send(removedBoardgame);
        });
    });

module.exports = boardgameRoute;