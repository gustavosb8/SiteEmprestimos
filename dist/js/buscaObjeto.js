var validaPessoa = new Boolean(false);

$(document).ready(function () {

    function limpa_formulario_objeto() {

        $("#titulo").val("");
        $("#tipo").val("");
        $("#estado").val("");
    }

    function popula_formulario_objeto() {

        $("#titulo").val("objeto não encontrado");
        $("#tipo").val("objeto não encontrado");
        $("#estado").val("objeto não encontrado");
    }
    
    function validar(id) {
        var url = "http://localhost:8090/TrojanWebService/webservice/serviceemprestimo/validaobjeto/" + id+"";
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


    //Quando o campo objeto perde o foco.
    $('#botaoPesquisaObjeto').click(function () {

        var objeto = $('#objeto').val();
        //Nova variável "objeto" somente com dígitos.
        //var objeto = $(this).val().replace(/\D/g, '');

        //Verifica se campo objeto possui valor informado.
        if (objeto != "" && objeto != 0) {
            
            if (!isNaN(objeto)) {

                //Preenche os campos com "..." enquanto consulta webservice.
                var id = $("#objeto");
                $("#titulo").val("...");
                $("#tipo").val("...");
                $("#estado").val("...");
                
                validar(id.val());

                if (validaPessoa == true) {
                    //Consulta o webservice serviceobjeto
                    $.getJSON("http://localhost:8090/TrojanWebService/webservice/serviceemprestimo/objeto/" + id.val(), function (dados) {

                        //
                        if (!("erro" in dados)) {
                            //Atualiza os campos com os valores da consulta.

                            $("#titulo").val(dados.titulo);
                            $("#tipo").val(dados.tipo);

                            if (dados.estado == true && dados.titulo != null) {
                                $("#estado").val("EMPRESTADO");
                            } else {
                                $("#estado").val("DISPONÍVEL");
                            }



                        } else {
                            //objeto pesquisado não foi encontrado.
                            limpa_formulario_objeto();
                        }

                        //
                    });
                    validaPessoa = new Boolean(false);
                } else {

                    $("#titulo").val("objeto não encontrado");
                    $("#tipo").val("objeto não encontrado");
                    $("#estado").val("objeto não encontrado");
                }


            } else {
                alert("ID Inválido");
                limpa_formulario_objeto();
            }
        } //end if.
        else {
            //objeto sem valor, limpa formulário.
            popula_formulario_objeto();
        }
    });
});

$(document).ready(function () {
    var botao = $('#bntClose-sucesso');

    $("#botaoCadastroObjeto").click(function () {

        $('#sucesso').hide();
        $('#error').hide();

        var tipo;
        var tituloform = $('#titulo').val();

        var value = "";

        value = $("input[name=optionsRadios]:checked").val();

        if (value != "" && tituloform != "" && tituloform != " " && tituloform != "  ") {
            var objeto = {
                idObjeto: 0,
                titulo: tituloform,
                tipo: value,
                estado: false
            };

            $.getJSON("http://localhost:8090/TrojanWebService/webservice/serviceemprestimo/cadastraobjeto/" + objeto.titulo + "/" + objeto.tipo, function (dadosObjeto) {
                if (!("erro" in dadosObjeto)) {
                    $('#sucesso').text(dadosObjeto.tipo + " [" + dadosObjeto.titulo + "] cadastrado com sucesso");
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
