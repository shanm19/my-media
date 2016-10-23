var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var authorSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    books: [{
        type: String,
        unique: true
    }]
});

module.exports = mongoose.model("author", authorSchema);