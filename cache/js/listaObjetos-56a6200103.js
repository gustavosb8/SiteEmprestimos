var estado;

function preecheTabela(lista, tbody) {
    var botao = $('#bntClose-sucesso');
    var i = 0;
    $.each(lista, function (key, data) {

        var tr = $('<tr>');
        var novaLinhaID = $('<td>');
        var novaLinhaTITULO = $('<td>');
        var novaLinhaTIPO = $('<td>');
        var novaLinhaESTADO = $('<td>');

        var novaLinhaOpcao = $('<td>');
        var button = $('<button>');

        novaLinhaID.text(lista[i].idObjeto);
        novaLinhaTITULO.text(lista[i].titulo);
        novaLinhaTIPO.text(lista[i].tipo);

        if (lista[i].estado == true) {
            novaLinhaESTADO.text("EMPRESTADO");
            estado = true;
        } else {
            novaLinhaESTADO.text("DISPONÍVEL");
            estado = false;
        }

        var jacks = $('<i>');
        jacks.addClass('glyphicon glyphicon-trash');

        button.text("");
        button.val(lista[i].idObjeto);
        button.append(jacks);
        novaLinhaOpcao.append(button);

        button.addClass('btn btn-danger');

        $(button).click(function () {

            var url = "http://localhost:8090/TrojanWebService/webservice/serviceemprestimo/removerobjeto";

            var exclusao = {
                "idObjeto": button.val(),
                "titulo": novaLinhaTITULO.text(),
                "tipo": novaLinhaTIPO.text(),
                "estado": estado
            };

            $.ajax({
                type: "POST",
                url: url,
                data: JSON.stringify(exclusao),
                contentType: 'application/json',
                success: function (result) {
                    $('#sucesso').text(result);
                    $('#sucesso').append(botao);
                    $('#sucesso').show();

                    $('#bntClose-sucesso').click(function () {
                        $(this).parent().hide();
                        location.reload(true);
                    });
                }

            });
        });

        tr.append(novaLinhaID);
        tr.append(novaLinhaTITULO);
        tr.append(novaLinhaTIPO);
        tr.append(novaLinhaESTADO);
        tr.append(novaLinhaOpcao);

        tbody.append(tr);
        i++;
    });
}

$(document).ready(function () {

    $.getJSON("http://localhost:8090/TrojanWebService/webservice/serviceemprestimo/listarobjetos", function (lista) {

        var tbody = $("#tbody");

        preecheTabela(lista, tbody);
    });
});

$(document).ready(function () {
    $('#bntClose').click(function () {
        $(this).parent().hide();
    });
});
