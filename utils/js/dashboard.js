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

function d1(){
	duplicarCampos("origem1","destino1");
}

function r1(){
	removerCampos(this,"destino1");
}

function d2(){
	duplicarCampos("origem2","destino2");
}

function r2(){
	removerCampos(this,"destino2");
}

function adicionarCamposEDT(id){
	let cod = 4;
	$.ajax({
        url: "backend/config/processos/processos.php",
        type: "POST",
        data: {cod,id},
        dataType: 'json', 
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('jqXHR: \n'+jqXHR);
            console.log('textStatus: \n'+textStatus);
            console.log('errorThrown: \n'+errorThrown);
        },
        success: function(retorno){
            if (retorno != false) {
            	$("#nome").val(retorno.dados_principais[0].c_nome);
            	$("#celucar_01").val(retorno.dados_principais[0].c_whatsapp);
            	$("#email1").val(retorno.dados_principais[0].c_email);
            	$("#id_esc_associado").val(id);
            }
        }
    });
}

function excluirAssociado(id,btn) {
    let cod = 12;
    if (confirm('Deseja confirmar esta ação?')) {
        $.ajax({
            url: "backend/config/processos/processos.php",
            type: "POST",
            data: {cod,id},
            dataType: 'json', 
            beforeSend: function(){
                $("#"+btn).attr("disabled", true);
                $("#"+btn).html("<img src='utils/img/gifs.gif' width='15' height='15'/>");
            },   
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('jqXHR: \n'+jqXHR);
                console.log('textStatus: \n'+textStatus);
                console.log('errorThrown: \n'+errorThrown);
                $("#"+btn).attr("disabled", false);
                $("#"+btn).html("<i class='far fa-trash-alt'></i>");
            },
            success: function(retorno){
                $("#"+btn).attr("disabled", false);
                $("#"+btn).html("<i class='far fa-trash-alt'></i>");
                if (retorno == true) {
                    alert("Sucesso");
                    window.location = 'dashboard.php';
                }else{
                    alert("Falha");
                }
            }
        });
    }
}

function popularDependentes(id){
    let cod = 6,resultado = '',contador = 1;
    $.ajax({
        url: "backend/config/processos/processos.php",
        type: "POST",
        data: {cod,id},
        dataType: 'json', 
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('jqXHR: \n'+jqXHR);
            console.log('textStatus: \n'+textStatus);
            console.log('errorThrown: \n'+errorThrown);
        },
        success: function(retorno){
            if (retorno != false) {
                for (let cc=0;cc<retorno.length;cc++) {
                    resultado += "<tr>";
                    resultado += "<td style='text-align: center;'>"+contador+"</td>";
                    resultado += "<td style='text-align: center;'>"+retorno[cc].data_cadastro+"</td>";
                    resultado += "<td>"+retorno[cc].nome+"</td>";
                    resultado += "<td>"+retorno[cc].parentesco+"</td>";
                    resultado += "<td>"+retorno[cc].nascimento+"</td>";
                    resultado += "<td><div style='display: flex;justify-content: center;'>";
                    resultado += "    <a data-toggle='modal' data-dp-nome='"+retorno[cc].nome+"' data-dp-parent='"+retorno[cc].parentesco_id+"' data-dp-nasc='"+retorno[cc].nascimento_ori+"' data-dp-id='"+retorno[cc].id+"' onClick='popular_dp(this)' data-target='#modalEdtDependentes' style='cursor: pointer;'>&#9998;";
                    resultado += "    </a></div>";
                    resultado += "</td>";
                    resultado += "<td><div style='display: flex;justify-content: center;'>";
                    resultado += "    <a data-padrao-id='"+retorno[cc].id+"' data-padrao-tabela='dependentes' onClick='excluir_padrao(this)' style='cursor: pointer;'><i class='far fa-trash-alt'></i>";
                    resultado += "    </a></div>";
                    resultado += "</td>";
                    resultado += "</tr>";
                    contador++;
                }
            }
            $("#id_add_dependentes").val(id);
            $("#recebe_dependentes").html(resultado);
        }
    });
}

function popular_dp(dp){
    let nome = dp.getAttribute("data-dp-nome");
    let parentesco = dp.getAttribute("data-dp-parent");
    let nascimento = dp.getAttribute("data-dp-nasc");
    let id = dp.getAttribute("data-dp-id");
    document.getElementById('edt_nome_dp').value = nome;
    document.getElementById('edt_parent_dp').value = parentesco;
    document.getElementById('edt_nasc_dp').value = nascimento;
    document.getElementById('id_esc_dep').value = id;
}

function popularVeiculos(id){
    let cod = 7,resultado = '',contador = 1;
    $.ajax({
        url: "backend/config/processos/processos.php",
        type: "POST",
        data: {cod,id},
        dataType: 'json', 
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('jqXHR: \n'+jqXHR);
            console.log('textStatus: \n'+textStatus);
            console.log('errorThrown: \n'+errorThrown);
        },
        success: function(retorno){
            if (retorno != false) {
                for (let cc=0;cc<retorno.length;cc++) {
                    resultado += "<tr>";
                    resultado += "<td style='text-align: center;'>"+contador+"</td>";
                    resultado += "<td style='text-align: center;'>"+retorno[cc].data_cadastro+"</td>";
                    resultado += "<td>"+retorno[cc].marca+"</td>";
                    resultado += "<td>"+retorno[cc].modelo+"</td>";
                    resultado += "<td>"+retorno[cc].tipo+"</td>";
                    resultado += "<td>"+retorno[cc].ano_fabric+"</td>";
                    resultado += "<td>"+retorno[cc].ano_modelo+"</td>";
                    resultado += "<td>"+retorno[cc].licenca+"</td>";
                    resultado += "<td><div style='display: flex;justify-content: center;'>";
                    resultado += "    <a data-vei-id='"+retorno[cc].id+"' data-vei-marca='"+retorno[cc].marca+"' data-vei-modelo='"+retorno[cc].modelo+"' data-vei-tipo='"+retorno[cc].tipo_id+"' data-vei-ano_fabr='"+retorno[cc].ano_fabric+"' data-vei-ano_model='"+retorno[cc].ano_modelo+"' data-vei-licenca='"+retorno[cc].licenca+"'";
                    resultado += "       data-toggle='modal' onClick='popular_vei(this)' data-target='#modalEdtVeiculos' style='cursor: pointer;'>&#9998;";
                    resultado += "    </a></div>";
                    resultado += "</td>";
                    resultado += "<td><div style='display: flex;justify-content: center;'>";
                    resultado += "    <a data-padrao-id='"+retorno[cc].id+"' data-padrao-tabela='dados_veiculos' onClick='excluir_padrao(this)' style='cursor: pointer;'><i class='far fa-trash-alt'></i>";
                    resultado += "    </a></div>";
                    resultado += "</td>";
                    resultado += "</tr>";
                    contador++;
                }
            }
            $("#id_add_veiculos").val(id);
            $("#recebe_veiculos").html(resultado);
        }
    });
}

function popular_vei(vei){
    let id = vei.getAttribute("data-vei-id");
    let marca = vei.getAttribute("data-vei-marca");
    let modelo = vei.getAttribute("data-vei-modelo");
    let tp = vei.getAttribute("data-vei-tipo");
    let ano_fabr = vei.getAttribute("data-vei-ano_fabr");
    let ano_model = vei.getAttribute("data-vei-ano_model");
    let licenca = vei.getAttribute("data-vei-licenca");
    document.getElementById('id_esc_vei').value = id;
    document.getElementById('edt_marca_dp').value = marca;
    document.getElementById('edt_modelo_dp').value = modelo;
    document.getElementById('edt_tipo_veiculo').value = tp;
    document.getElementById('edt_fabric_dp').value = ano_fabr;
    document.getElementById('edt_ano_modelo_dp').value = ano_model;
    document.getElementById('edt_licenca_dp').value = licenca;
}

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