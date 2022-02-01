let Authors = require('../models/authors');

let getAllAuthors = () => {
    return new Promise((resolve, reject) => {
        Authors.find({}, (err, authors) => {
            authors ? resolve(authors) : reject(err)
        })
    })
}

let getAuthorById = (authorId) => {
    return new Promise((resolve, reject) => {
        Authors.findOne({
            _id: authorId
        }, (err, author) => {
            author ? resolve(author) : reject(err)
        })
    })
}
let insertAuthor = (name, adress, phone, isAlive, birthday) => {
    return new Promise((resolve, reject) => {
        let author = new Authors({
            name,
            adress,
            phone,
            isAlive,
            birthday
        })
        author.save((err, data) => {
            data ? resolve(data) : reject(err)
        })
    })
}
let updateAuthor = (_id) => {
    return new Promise((resolve, reject) => {
        Authors.find({
            _id
        }, (err, author) => {
            err ? reject(err) : resolve(author);
        })
    })
}

module.exports = {
    getAllAuthors,
    getAuthorById,
    insertAuthor,
    updateAuthor
}