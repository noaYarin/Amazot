$(function () {

    $("[data-role=insertBtn]").click(() => {
        reset();
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
                $('input').html('')
            })
            .catch(e => console.log(e))
    })

    $('[data-role="FindAllBtn"]').click(() => {
        $.get('/authors', (data) => {
            getData(data);
        })
    })

    $('[data-role="idBtn"]').click(() => {
        let input = $('<input placeholder="Enter ID">');
        let findBtn = $('<button>').text('Find');
        $('.btns').append(input, findBtn);
        findBtn.click(() => {
            let authorId = $(input).val();
            $.get('/authors/' + authorId, function (data) {
                console.log(data);
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
        table.append('<tr><td>Id</td><td>Name</td><td>Adress</td><td>Phone</td><td>Birthday</td><td>Alive</td></tr>')
        $.each(data, (i, v) => {
            let value = JSON.stringify(v);
            let parseValue = JSON.parse(value);
            table.append((`<tr><td>${parseValue._id}</td><td>${parseValue.name}</td><td>${parseValue.adress}</td><td>${parseValue.phone}</td><td>${parseValue.birthday}</td><td>${parseValue.isAlive}</td></tr>`))
        })
        $('.wrapper').append(table)
    }
})