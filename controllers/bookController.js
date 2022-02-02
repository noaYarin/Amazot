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

let updateBook = (_id) => {
    return new Promise((resolve, reject) => {
        Books.findOneAndUpdate({
            _id
        }, (err, book) => {
            err ? reject(err) : resolve(book)
        })
    })
}

let deleteBook = (_id) => {
    return new Promise((resolve, reject) => {
        Books.deleteOne({
            _id
        }, (err, book) => {
            err ? reject(err) : resolve(book)
        })
    })
}

module.exports = {
    getAllBooks,
    getBookById,
    insertBook,
    updateBook,
    deleteBook
}