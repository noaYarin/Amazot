var mongoose = require('mongoose');
let books = mongoose.model('Books', new mongoose.Schema({
    name: {
        type: String,
        require: 'Enter name'
    },
    publish_date: {
        type: Date,
        require: 'Enter date'
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Author',
        require: 'Enter author'
    },
    isInStock: {
        type: Boolean,
    }
}));

module.exports = books;