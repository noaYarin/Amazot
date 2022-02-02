$(function () {
    $.get('/authors', (authors) => {
        $.each(authors, (i, value) => {
            $('#selectList').append($('<option></option>').text(value.name).attr("value", value._id))
        })
    })

    $("[data-role=insertBtn]").click(() => {
        let bookObj = {
            bookName: $('[data-role="name"]').val(),
            publish_date: $('[data-role="date"]').val(),
            author: $('#selectList').find(":selected").val(),
            isInStock: $('input[type="checkbox"]').is(":checked"),
        }
        fetch('/book', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bookObj),
        }).then(data => {
            console.log(data)
        }).catch(e => console.log(e))
        reset();
    })

    $('[ data-role="FindAllBtn"]').click(() => {
        $.get('/books', (data) => {
            getData(data)
        })
    })

    let select = $('<select>')

    function getBookId() {
        $.get('/books', (authors) => {
            $.each(authors, (i, value) => {
                select.append($('<option></option>').text(value.name).attr("value", value._id))
            })
            $('.wrapper').append(select);
        })
    }

    $('[data-role="idBtn"]').click(() => {
        getBookId();
        $(select).change(function () {
            $.get('/books/' + $(select).val(), function (data) {
                getData(data)
            })
        })
    })

    $('[data-role="updateBtn"]').click(() => {
        getBookId();
        $(select).change(function () {
            $.get('/books/' + $(select).val(), function (books) {
                displayBooksData(books)
            })
        })
    })

    let displayBooksData = (books) => {
        let date = new Date(books[0].publish_date).toISOString().slice(0, 10);
        $('[data-role="name"]').val(books[0].name),
            $('#selectList').val(books[0].author),
            $('input[type="checkbox"]').prop("checked", books[0].isInStock),
            $('input[type="date"]').val(date)
    }

    let createNewBook = () => {
        let bookObj = {
            name: $('[data-role="name"]').val(),
            author: $('#selectList').val(),
            publish_date: $('input[type="date"]').val(),
            isInStock: $('[data-role="checkbox"]').is(":checked")
        }
        return bookObj;
    }

    $('[data-role="saveBtn"]').click(() => {
        let newBook = createNewBook();
        $.ajax({
            url: "/book/" + $(select).val(),
            data: newBook,
            type: 'PUT',
        })
        reset()
    })

    $('[data-role="deleteBtn"]').click(() => {
        getBookId()
        $(select).change(function () {
            $.ajax({
                url: '/book/' + $(this).val(),
                method: 'DELETE',
                success: function () {
                    $('.wrapper').append('<p>The book was deleted</p>')
                }
            });
        })

    })

    function reset() {
        $('input[type=text]').val('')
        $('input[type=date]').val('')
        $('input[type="checkbox"]').prop('checked', false);
    }

    function getData(data) {
        let table = $('<table>').attr('class', 'table')
        let topics = ['Id', 'Name', 'Publish Date', 'Author', 'In Stock'];
        for (let i = 0; i < topics.length; i++) {
            table.append(`<td>${topics[i]}</td>`)
        }
        $.each(data, (i, v) => {
            let value = JSON.stringify(v);
            let parseValue = JSON.parse(value);
            table.append((`<tr><td>${parseValue._id}</td><td>${parseValue.name}</td><td>${parseValue.publish_date}</td><td>${parseValue.author}</td><td>${parseValue.isInStock}</td></tr>`))
        })
        $('.wrapper').append(table)
    }

})