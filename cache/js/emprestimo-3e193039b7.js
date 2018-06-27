$(document).ready(function () {

    function limpa_formulario_objeto() {

        $("#titulo").val("");
        $("#tipo").val("");
        $("#estado").val("");
    }

    $.getJSON("http://localhost:8090/TrojanWebService/webservice/serviceemprestimo/listarpessoas", function (pessoas) {
        var i = 0;
        var selecao = $('#selectPessoas');
        $.each(pessoas, function (key, data) {
            var novaOP = $('<option>');
            novaOP.text(pessoas[i].nome);
            /*TESTE*/
            novaOP.val(pessoas[i].idPessoa);
            selecao.append(novaOP);
            i++;
        });
    });

    $.getJSON("http://localhost:8090/TrojanWebService/webservice/serviceemprestimo/listarobjetosdisponiveis", function (objetos) {
        var i = 0;
        var selecao2 = $('#selectObjetos');
        $.each(objetos, function (key, data) {
                var novaOP = $('<option>');
            novaOP.text(objetos[i].titulo);
                /*TESTE*/
            novaOP.val(objetos[i].idObjeto);
            selecao2.append(novaOP);
            i++;
        });
    });
});

$(document).ready(function () {
    var botao = $('#bntClose-sucesso');

    $("#botaoEmprestar").click(function () {

        $('#sucesso').hide();
        $('#error').hide();

        var nome = $('#selectPessoas option:selected').val();
        var titulo = $('#selectObjetos option:selected').val();

        idNome = nome.valueOf();
        idTitulo = titulo.valueOf();

        if (nome != "" && titulo != "") {

            var emprestimo = {
                "idEmprestimo": "0",
                "idPessoa": idNome,
                "idObjeto": idTitulo,
                "data": "é hoje"
            };

            var url = "http://localhost:8090/TrojanWebService/webservice/serviceemprestimo/emprestar";

            $.ajax({
                type: "POST",
                url: url,
                data: JSON.stringify(emprestimo),
                success: function (result) {
                    $('#sucesso').text(result);
                    $('#sucesso').append(botao);
                    $('#sucesso').show();

                    $('#bntClose-sucesso').click(function () {
                        $(this).parent().hide();
                        location.reload(true);
                    });
                },
                contentType: 'application/json'
            });
           
        } else {
            $('#error').show();
        }

    });
});

$(document).ready(function () {
    $('#bntClose').click(function () {
        $(this).parent().hide();
    });
});
