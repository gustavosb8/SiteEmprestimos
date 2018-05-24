function preecheTabela(lista, tbody) {
    var i = 0;
    var botao = $('#bntClose-sucesso');
    $.each(lista, function (key, data) {

        var tr = $('<tr>');
        var novaLinhaID = $('<td>');
        var novaLinhaNOME = $('<td>');
        var novaLinhaCONTATO = $('<td>');

        var novaLinhaOpcao = $('<td>');
        var button = $('<button>');

        novaLinhaID.text(lista[i].idPessoa);
        novaLinhaNOME.text(lista[i].nome);
        novaLinhaCONTATO.text(lista[i].contato);

        var jacks = $('<i>');
        jacks.addClass('glyphicon glyphicon-trash');

        button.text("");
        button.val(lista[i].idPessoa);
        button.append(jacks);
        novaLinhaOpcao.append(button);

        button.addClass('btn btn-danger');

        $(button).click(function () {

            var url = "http://localhost:8090/TrojanWebService/webservice/serviceemprestimo/removerpessoa";

            var exclusao = {
                "idPessoa": button.val(),
                "nome": novaLinhaNOME.text(),
                "contato": novaLinhaCONTATO.text()
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
        tr.append(novaLinhaNOME);
        tr.append(novaLinhaCONTATO);
        tr.append(novaLinhaOpcao);

        tbody.append(tr);
        i++;
    });
}

$(document).ready(function () {

    $.getJSON("http://localhost:8090/TrojanWebService/webservice/serviceemprestimo/listarpessoas", function (lista) {

        var tbody = $("#tbody");

        preecheTabela(lista, tbody)


    });
});

$(document).ready(function () {
    $('#bntClose').click(function () {
        $(this).parent().hide();
    });
});