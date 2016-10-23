var mongoose = require('mongoose');
//var authorSchema = require('../schemas/authorSchema');
var Schema = mongoose.Schema;

var bookSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: String,
    author: String,
    pages: Number,
    genre: String,
    rating: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
        default: 3
    },
    format: {
        type: String,
        enum: ["Hard-Cover", "Soft-Cover"],
        default: "Soft-Cover"
    }
});

module.exports = mongoose.model("book", bookSchema);