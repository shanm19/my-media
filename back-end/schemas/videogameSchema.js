var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var videogameSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    genre: String,
    platform: {
        type: String,
        enum: ["X-Box", "Nintendo", "PlayStation"],
        required: true
    },
    rating: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
        default: 3
    },
    playtime: Number,
    description: String
});

module.exports = mongoose.model("videogame", videogameSchema);