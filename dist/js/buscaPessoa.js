var validaPessoa = new Boolean(false);

$(document).ready(function () {

    function limpa_formulário_pessoa() {

        $("#nome").val("");
        $("#contato").val("");
    }

    function popula_formulario_objeto() {

        $("#nome").val("Pessoa não encontrada");
        $("#contato").val("Pessoa não encontrado");

    }

    function validar(id) {
        var url = "http://localhost:8090/TrojanWebService/webservice/serviceemprestimo/validapessoa/" + id+"";
        $.ajax({
                type: "GET",
                url: url,
                async: false,
                success: function (result) {
                    validaPessoa = new Boolean(result);
                    return validaPessoa;
                }
            });
    }



    //Quando o campo pessoa perde o foco.
    $('#botaoPesquisaObjeto').click(function () {
        //Nova variável "pessoa" somente com dígitos.
        //var pessoa = $(this).val().replace(/\D/g, '');
        var pessoa = $('#pessoa').val();
        //Verifica se campo pessoa possui valor informado.


        if (pessoa != "" && pessoa != 0) {

            //Valida o formato do pessoa.
            if (!isNaN(pessoa)) {


                //Preenche os campos com "..." enquanto consulta webservice.
                var id = $("#pessoa");
                $("#nome").val("...");
                $("#contato").val("...");

                validar(id.val());

                if (validaPessoa == true ){
                    //Consulta o webservice servicepessoa
                    $.getJSON("http://localhost:8090/TrojanWebService/webservice/serviceemprestimo/pessoa/" + id.val(), function (dados) {

                        //
                        if (!("erro" in dados)) {
                            //Atualiza os campos com os valores da consulta.

                            $("#nome").val(dados.nome);
                            $("#contato").val(dados.contato);


                        } else {
                            //pessoa pesquisado não foi encontrado.
                            alert("Pessoa não encontrada");
                            $("#nome").val("...");
                            $("#contato").val("...");

                        }
                        validaPessoa = new Boolean(false);

                    });
                } else {
                    $("#nome").val("pessoa não encontrada");
                    $("#contato").val("pessoa não encontrada");
                    validaPessoa = new Boolean(false);

                }
            } else {
                //pessoa é inválido.
                alert("ID inválido.");
                limpa_formulário_pessoa();
            }
        } //end if.
        else {
            //pessoa sem valor, limpa formulário.
            limpa_formulário_pessoa();
            popula_formulario_objeto();
        }
    });
});

$(document).ready(function () {
    var botao = $('#bntClose-sucesso');

    $("#botaoCadastroPessoa").click(function () {

        $('#sucesso').hide();
        $('#error').hide();

        var nome = $('#nome').val();
        var contato = $('#contato').val();

        if (nome != "" && contato != "" && nome != " " && contato != " ") {
            var pessoa = {
                idPessoa: 0,
                nome: nome,
                contato: contato
            };

            $.getJSON("http://localhost:8090/TrojanWebService/webservice/serviceemprestimo/cadastrapessoa/" + pessoa.nome + "/" + pessoa.contato, function (dadosPessoa) {
                if (!("erro" in dadosPessoa)) {
                    $('#sucesso').text("[" + dadosPessoa.nome + "] cadastrada com sucesso");
                    $('#sucesso').append(botao);
                    $('#sucesso').show();

                    $('#bntClose-sucesso').click(function () {
                        $(this).parent().hide();
                    });
                } else {
                    $('#error').show();
                }
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
