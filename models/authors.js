var mongoose = require('mongoose');

const authorSchema = new mongoose.Schema({
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
});

let Authors = mongoose.model('Author', authorSchema);
module.exports = Authors