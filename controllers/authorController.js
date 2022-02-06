let Authors = require('../models/authors');

let getAllAuthors = () => {
    return new Promise((resolve, reject) => {
        Authors.find({})
            .then(authors => resolve(authors))
            .catch(e => reject(e))
    })
}

let getAuthorById = (_id) => {
    return new Promise((resolve, reject) => {
        Authors.find({
                _id
            })
            .then(author => resolve(author))
            .catch(err => reject(err))
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
let updateAuthor = (_id, obj) => {
    return new Promise((resolve, reject) => {
        Authors.findOneAndUpdate({
            _id
        }, {
            $set: obj
        }, (err, author) => {
            err ? reject(err) : resolve(author);
        })
    })
}

let deleteAuthor = (_id) => {
    return new Promise((resolve, reject) => {
        Authors.deleteOne({
            _id
        }, (err, author) => {
            err ? reject(err) : resolve(author)
        })
    })

}

module.exports = {
    getAllAuthors,
    getAuthorById,
    insertAuthor,
    updateAuthor,
    deleteAuthor
}