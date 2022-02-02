require('dotenv').config();
const express = require("express"),
    app = express()
mongoose = require("mongoose"), port = process.env.PORT || 5000;

//Middlewares
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static('public'))

let {
    getAllBooks,
    getBookById,
    insertBook,
    updateBook,
    deleteBook
} = require('./controllers/bookController');

let {
    getAllAuthors,
    getAuthorById,
    insertAuthor,
    updateAuthor,
    deleteAuthor
} = require('./controllers/authorController');


mongoose.connect("mongodb://0.0.0.0:27017/amazot").then(() => {
    app.listen(port, () => {
        console.info(`start server start listening on port ${port}`)
    })
}).catch(err => console.error(err))

app.get('/books', (req, res) => {
    getAllBooks()
        .then(getAllBooks()
            .then(books => res.send(books))
            .catch(err => console.log(err)))
        .catch(err => {
            console.log(err);
            res.send(err)
        })
})
app.get('/books/:bookId', (req, res) => {
    getBookById(req.params.bookId)
        .then(book => res.json(book))
        .catch(err => {
            console.log(err);
            res.send(err)
        })
})
app.post('/book', (req, res) => {
    let {
        bookName,
        publish_date,
        author,
        isInStock
    } = req.body
    insertBook(bookName, publish_date, author, isInStock)
        .then(book => res.json(book))
        .catch(err => {
            console.log(err);
            res.send(err)
        })
})

app.put('/book/:bookId', (req, res) => {
    updateBook(req.params.bookId)
        .then(book => res.json(book))
        .catch(err => console.log(err))
})

app.delete('/book/:bookId', (req, res) => {
    deleteBook(req.params.bookId)
        .then(getAllBooks()
            .then(book => res.send(book)
                .catch(err => console.log(err))
            ).catch(err => console.log(err)))
})

app.get('/authors', (req, res) => {
    getAllAuthors()
        .then(authors => res.json(authors))
        .catch(err => res.send(err))
})

app.get('/authors/:authorId', (req, res) => {
    getAuthorById(req.params.authorId)
        .then(author => res.json(author))
        .catch(err => {
            console.log(err);
            res.send(err);
        })
})

app.post('/author', (req, res) => {
    let {
        name,
        adress,
        phone,
        checkbox,
        birthday
    } = req.body
    insertAuthor(name, adress, phone, checkbox, birthday)
        .then(getAllAuthors()
            .then(authors => res.send(authors)
                .catch(e => console.log(e)))).catch(err => {
            res.send(err);
        })
})

app.put('/author/:authorId', (req, res) => {
    console.log(req.body);
    updateAuthor(req.params.authorId, req.body)
        .then(author => res.json(author))
        .catch(err => console.log(err))
})

app.delete('/author/:authorId', (req, res) => {
    deleteAuthor(req.params.authorId)
        .then(getAllAuthors()
            .then(authors => res.send(authors))
            .catch(err => console.log(err))
        ).catch(err => console.log(err))
})