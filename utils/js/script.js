function duplicarCampos(origem,destino){
        var clone = document.getElementById(origem).cloneNode(true);
    var destino = document.getElementById(destino);
    destino.appendChild (clone);
    
    var camposClonados = clone.getElementsByTagName('input');
    
    for(i=0; i<camposClonados.length;i++){
        camposClonados[i].value = '';
    }
    
}

function removerCampos(id,destino){
    var node1 = document.getElementById(destino);
    node1.removeChild(node1.childNodes[node1.childNodes.length - 1]);
}

$('#form_cadastro').submit(function(e) {
    e.preventDefault();
    let formulario = document.getElementById('form_cadastro');
    let formData = new FormData(formulario);
    $.ajax({
        url: "backend/config/processos/register.php",
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,  
        contentType: false,
        beforeSend: function(){
            $("#add_cadastro").attr("disabled", true);
            $("#span_esc").html("<img src='utils/img/gifs.gif' width='15' height='15'/>");
        },   
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('jqXHR: \n'+jqXHR);
            console.log('textStatus: \n'+textStatus);
            console.log('errorThrown: \n'+errorThrown);
            $("#add_cadastro").attr("disabled", false);
            $("#span_esc").empty();
        },
        success: function(retorno){
            $("#add_cadastro").attr("disabled", false);
            $("#span_esc").empty();
            if (retorno != false) {
                window.location = 'certificado.php';
            } else {
                alert("Não foi possível completar o cadastro.\n"+
                    "Possíveis situações que causam erros: \n"+
                    "1° Verifique sua conexão com a internet.\n"+
                    "2° Verique se as informações estão corretamente preenchidas.");
            }
        }
    });
    return false;
});

//pegar estado civil lista
function getEstadoCivil(){
    let cod = 1, resultado;
    $.ajax({
        url: "backend/config/processos/getSelect.php",
        type: "POST",
        data: {cod},
        dataType: 'json', 
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('jqXHR: \n'+jqXHR);
            console.log('textStatus: \n'+textStatus);
            console.log('errorThrown: \n'+errorThrown);
        },
        success: function(retorno){
            if (retorno != false) {
                resultado += "<option selected='' value=''>Selecione uma Opção</option>";
                for (let cc=0;cc<retorno.length;cc++) {
                    resultado += "<option value='"+retorno[cc].id+"'>"+retorno[cc].descricao+"</option>";
                }
                $("#estado_civil").html(resultado);
            }
        }
    });
}

//pegar categorias do CNH
function getCategoriaCNH(){
    let cod = 2, resultado;
    $.ajax({
        url: "backend/config/processos/getSelect.php",
        type: "POST",
        data: {cod},
        dataType: 'json', 
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('jqXHR: \n'+jqXHR);
            console.log('textStatus: \n'+textStatus);
            console.log('errorThrown: \n'+errorThrown);
        },
        success: function(retorno){
            if (retorno != false) {
                resultado += "<option selected='' value=''>Selecione uma Opção</option>";
                for (let cc=0;cc<retorno.length;cc++) {
                    resultado += "<option value='"+retorno[cc].id+"'>"+retorno[cc].descricao+"</option>";
                }
                $("#categoria_registro").html(resultado);
            }
        }
    });
}

//pegar categorias dos parentescos
function getParentescos(){
    let cod = 3, resultado;
    $.ajax({
        url: "backend/config/processos/getSelect.php",
        type: "POST",
        data: {cod},
        dataType: 'json', 
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('jqXHR: \n'+jqXHR);
            console.log('textStatus: \n'+textStatus);
            console.log('errorThrown: \n'+errorThrown);
        },
        success: function(retorno){
            if (retorno != false) {
                resultado += "<option selected='' value=''>Selecione uma Opção</option>";
                for (let cc=0;cc<retorno.length;cc++) {
                    resultado += "<option value='"+retorno[cc].id+"'>"+retorno[cc].descricao+"</option>";
                }
                $(".parentesco").html(resultado);
            }
        }
    });
}

//pegar todos os tipos de veiculos
function getTiposVeiculos(){
    let cod = 4, resultado;
    $.ajax({
        url: "backend/config/processos/getSelect.php",
        type: "POST",
        data: {cod},
        dataType: 'json', 
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('jqXHR: \n'+jqXHR);
            console.log('textStatus: \n'+textStatus);
            console.log('errorThrown: \n'+errorThrown);
        },
        success: function(retorno){
            if (retorno != false) {
                resultado += "<option selected='' value=''>Selecione uma Opção</option>";
                for (let cc=0;cc<retorno.length;cc++) {
                    resultado += "<option value='"+retorno[cc].id+"'>"+retorno[cc].descricao+"</option>";
                }
                $(".tipo_veiculo").html(resultado);
            }
        }
    });
}

//pegar todos os tamanhos de camisa
function getTamanhoCamisa(){
    let cod = 5, resultado;
    $.ajax({
        url: "backend/config/processos/getSelect.php",
        type: "POST",
        data: {cod},
        dataType: 'json', 
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('jqXHR: \n'+jqXHR);
            console.log('textStatus: \n'+textStatus);
            console.log('errorThrown: \n'+errorThrown);
        },
        success: function(retorno){
            if (retorno != false) {
                resultado += "<option selected='' value=''>Selecione uma Opção</option>";
                for (let cc=0;cc<retorno.length;cc++) {
                    resultado += "<option value='"+retorno[cc].id+"'>"+retorno[cc].descricao+"</option>";
                }
                $("#tamanho_camisa").html(resultado);
            }
        }
    });
}

$(document).ready(function(){
    //pegar estado civil lista
    getEstadoCivil();
    //pegar categorias do CNH
    getCategoriaCNH();
    //pegar categorias dos parentescos
    getParentescos();
    //pegar todos os tipos de veiculos
    getTiposVeiculos();
    //pegar todos os tamanhos de camisa
    getTamanhoCamisa();
});