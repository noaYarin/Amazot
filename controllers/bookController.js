let Books = require('../models/books');

let getAllBooks = () => {
    return new Promise((resolve, reject) => {
        Books.find({}, (err, books) => {
            books ? resolve(books) : reject(err)
        })
    })
}
let getBookById = (bookId) => {
    return new Promise((resolve, reject) => {
        Books.find({
            _id: bookId
        }, (err, book) => {
            book ? resolve(book) : reject(err)
        })
    })
}

let insertBook = (name, publish_date, author, isInStock) => {
    return new Promise((resolve, reject) => {
        let book = new Books({
            name,
            publish_date,
            author,
            isInStock
        })
        book.save((err, data) => {
            err ? reject(err) : resolve(data)
        })
    })
}

module.exports = {
    getAllBooks,
    getBookById,
    insertBook
}