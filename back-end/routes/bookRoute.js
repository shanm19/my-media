var express = require('express');
var bookRoute = express.Router();
var Book = require('../schemas/bookSchema');
//var Author = require('../schemas/authorSchema');

bookRoute.route('/')
    .get(function (req, res) {
        if (req.query.title) {
            Book.find({
                title: req.query.title
            }, function (err, book) {
                if (err) res.status(500).send(err);
                res.send(book);
            });
        } else {
            Book.find({}, function (err, books) {
                if (err) res.status(500).send(books);
                res.send(books);
            });
        }
    })
    .post(function (req, res) {
        //console.log(req.body);
        var newBook = new Book(req.body);
        //console.log(newBook);
        // if (newBook.author) {
        //     Author.findOne({
        //         _id: newBook.author
        //     }, function (err, foundAuthor) {
        //         if (err) console.log(err);
        //         foundAuthor.books.push(newBook._id);
        //         foundAuthor.save();
        //     });
        // }
        newBook.save(function (err, savedBook) {
            if (err) res.status(500).send(err);
            res.send(savedBook);
        });
    });

bookRoute.route('/:id')
    .get(function (req, res) {
        var bookID = req.params.id;
        Book.findOne({
                _id: bookID
            })
            .populate("author")
            .exec(function (err, foundBook) {
                if (err) res.status(500).send(err);
                res.send(foundBook);
            });
    })
    .put(function (req, res) {
        var bookID = req.params.id;
        Book.findOneAndUpdate({
                _id: bookID
            },
            req.body, {
                new: true
            },
            function (err, foundBook) {
                if (err) res.status(500).send(err);
                res.send(foundBook);
            });
    })
    .delete(function (req, res) {
        var bookID = req.params.id;
        Book.findOneAndRemove({
            _id: bookID
        }, function (err, removedBook) {
            if (err) res.status(500).send(err);
            res.send(removedBook);
        });
    });

module.exports = bookRoute;