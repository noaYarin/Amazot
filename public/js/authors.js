$(function () {
    $("[data-role=insertBtn]").click(() => {
        let authorObj = {
            name: $('[name="name"]').val(),
            adress: $('[name="adress"]').val(),
            phone: $('[name="phone"]').val(),
            checkbox: $('input[type="checkbox"]').is(":checked"),
            birthday: $('input[type="date"]').val()
        }
        fetch('/author', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(authorObj),
            })
            .then(data => {
                console.log(data)
            })
            .catch(e => console.log(e))
        reset()
    })

    $('[data-role="FindAllBtn"]').click(() => {
        $.get('/authors', (data) => {
            getData(data);
        })
    })

    let select = $('<select>')

    function getAuthorsId() {
        $.get('/authors', (authors) => {
            $.each(authors, (i, value) => {
                select.append($('<option></option>').text(value.name).attr("value", value._id))
            })
            $('.wrapper').append(select);
        })
    }

    $('[data-role="idBtn"]').click(() => {
        getAuthorsId()
        $(select).change(function () {
            $.get(`/authors/${$(this).val()}`, function (data) {
                getData(data)
            })
        })
    })

    $('[data-role="updateBtn"]').click(() => {
        getAuthorsId()
        $(select).change(function () {
            fetch(`/authors/${$(this).val()}`)
                .then(author => author.json())
                .then(authors => displayInInputs(authors))
        })
    })

    let displayInInputs = (authors) => {
        let date = new Date(authors[0].birthday).toISOString().slice(0, 10);
        $('[name="name"]').val(authors[0].name),
            $('[name="adress"]').val(authors[0].adress),
            $('[name="phone"]').val(authors[0].phone),
            $('input[type="checkbox"]').prop("checked", authors[0].isAlive),
            $('input[type="date"]').val(date)
    }


    $('[data-role="saveBtn"]').click(() => {
        let newAuthor = {
            name: $('[name="name"]').val(),
            adress: $('[name="adress"]').val(),
            phone: $('[name="phone"]').val(),
            isAlive: $('input[type="checkbox"]').is(':checked'),
            birthday: $('input[type="date"]').val()
        }
        $.ajax({
            url: "/author/" + $(select).val(),
            data: newAuthor,
            type: 'PUT',
        })
        reset()
    })

    function reset() {
        $('input[type=text]').val('')
        $('input[type=tel]').val('')
        $('input[type=date]').val('')
        $('input[type="checkbox"]').prop('checked', false);
    }

    function getData(data) {
        let table = $('<table>').attr('class', 'table')
        let topics = ['Id', 'Name', 'Adress', 'Phone', 'Birthday', 'Alive']
        for (let i = 0; i < topics.length; i++) {
            table.append(`<td>${topics[i]}</td>`)
        }
        $.each(data, (i, v) => {
            let value = JSON.stringify(v);
            let parseValue = JSON.parse(value);
            table.append((`<tr><td>${parseValue._id}</td><td>${parseValue.name}</td><td>${parseValue.adress}</td><td>${parseValue.phone}</td><td>${parseValue.birthday}</td><td>${parseValue.isAlive}</td></tr>`))
        })
        $('.wrapper').append(table)
    }
})