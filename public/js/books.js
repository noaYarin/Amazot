$(function () {
    $.get('/authors', (authors) => {
        $.each(authors, (i, value) => {
            $('#selectList').append($('<option></option>').text(value.name).attr("value", value._id))
        })
    })

    $("[data-role=insertBtn]").click(() => {
        reset();
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
    })

    $('[ data-role="FindAllBtn"]').click(() => {
        $.get('/books', (data) => {
            getData(data)
        })
    })

    $('[data-role="idBtn"]').click(() => {
        let input = $('<input placeholder="Enter ID">');
        let findBtn = $('<button>').text('Find');
        $('.btns').append(input, findBtn);
        findBtn.click(() => {
            let bookId = $(input).val();
            $.get('/books/' + bookId, function (data) {
                getData(data)
            })
            findBtn.remove()
            input.remove()
        })
    })

    function reset() {
        $('input[type=text]').val('')
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