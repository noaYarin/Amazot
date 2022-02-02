var mongoose = require('mongoose');
let authors = mongoose.model('Authors', new mongoose.Schema({
    name: {
        type: String,
        require: 'Enter name',
    },
    adress: {
        type: String,
        require: 'Enter adress'
    },
    phone: {
        type: String,
        require: 'Enter phone'
    },
    isAlive: {
        type: Boolean,
    },
    birthday: {
        type: Date
    }
}));
module.exports = authors;