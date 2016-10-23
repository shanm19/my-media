var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var boardgameSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    playtime: {
        type: Number,
        default: 0
    },
    genre: String,
    rating: {
        type: Number,
        enum: [1, 2, 3, 4, 5],
        default: 3
    },
    description: String
});

module.exports = mongoose.model("boardgame", boardgameSchema);