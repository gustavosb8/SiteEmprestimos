$(document).ready(function () {

     var botao = $('#bntClose-sucesso');
    $.getJSON("http://localhost:8090/TrojanWebService/webservice/serviceemprestimo/listaremprestimos", function (lista) {
        var i = 0;
        var tbody = $("#tbody");

        $.each(lista, function (key, data) {
            //console.log(key);

            var tr = $('<tr>');

            var novaLinhaNOME = $('<td>');
            var novaLinhaTITULO = $('<td>');
            var novaLinhaTIPO = $('<td>');
            var novaLinhaDATA = $('<td>');

            var novaLinhaOpcao = $('<td>');
            var button = $('<div>');
            
            novaLinhaNOME.text(lista[i].nome);
            novaLinhaTITULO.text(lista[i].titulo);
            novaLinhaTIPO.text(lista[i].tipo);
            novaLinhaDATA.text(lista[i].data);
            
            var jacks = $('<i>');
            jacks.addClass('glyphicon glyphicon-triangle-bottom');
            
            button.text("Devolver  ");
            button.val(i);
            button.append(jacks);
            novaLinhaOpcao.append(button);

            button.addClass('btn btn-danger');

            $(button).click(function () {
                novaLinhaNOME.text()
                novaLinhaTITULO.text();

                var url = "http://localhost:8090/TrojanWebService/webservice/serviceemprestimo/devolver";

                var devoculao = {
                    "nome": novaLinhaNOME.text(),
                    "titulo": novaLinhaTITULO.text(),
                    "tipo": novaLinhaTIPO.text(),
                    "data": novaLinhaDATA.text()
                };
                
                $.ajax({
                    type: "POST",
                    url: url,
                    data: JSON.stringify(devoculao),
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


            tr.append(novaLinhaNOME);
            tr.append(novaLinhaTITULO);
            tr.append(novaLinhaTIPO);
            tr.append(novaLinhaDATA);
            tr.append(novaLinhaOpcao);

            tbody.append(tr);
            i++;
        });
    });
});

$(document).ready(function () {
    $('#bntClose').click(function () {
        $(this).parent().hide();
    });
});
