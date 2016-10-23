var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var movieSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    genre: String,
    director: String,
    length: Number,
    format: {
        type: String,
        enum: ['Blu-Ray', 'DVD']
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        default: 3
    },
    description: String
});

module.exports = mongoose.model("movie", movieSchema);