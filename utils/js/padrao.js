function ChamadaPadrao(form_id,btn_id,span_id,caminho){
    var formulario = document.getElementById(form_id);
    var formData = new FormData(formulario);
    
    let mensagem = '';
    $.ajax({
        url: "backend/config/processos/processos.php",
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,  
        contentType: false,
        beforeSend: function(){
            $("#"+btn_id).attr("disabled", true);
            $("#"+span_id).html("<img src='utils/img/gifs.gif' width='15' height='15'/>");
        },   
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('jqXHR: \n'+jqXHR);
            console.log('textStatus: \n'+textStatus);
            console.log('errorThrown: \n'+errorThrown);
            $("#"+btn_id).attr("disabled", false);
            $("#"+span_id).empty();
        },
        success: function(retorno){
            // console.log(retorno);
            $("#"+btn_id).attr("disabled", false);
            $("#"+span_id).empty();
            if (retorno == true) {
              //  alert("Sucesso");
                //window.location = caminho;
                    localStorage.setItem("status", "success");
					localStorage.setItem("msg", "ativa");
					localStorage.setItem("texto", "Ação realizada com sucesso!");				
					window.location.reload();
            }else{
                    localStorage.setItem("status", "danger");
					localStorage.setItem("msg", "ativa");
					localStorage.setItem("texto", "Falha ao cadastrar!");				
					window.location.reload();
            }
        }
    });
}

function ChamadaPadraoAp(form_id,btn_id,span_id,caminho){
    var formulario = document.getElementById(form_id);
    var formData = new FormData(formulario);
    
    formData.append('descri', CKEDITOR.instances['editor1'].getData());

    let mensagem = '';
    $.ajax({
        url: "backend/config/processos/processos.php",
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,  
        contentType: false,
        beforeSend: function(){
            $("#"+btn_id).attr("disabled", true);
            $("#"+span_id).html("<img src='utils/img/gifs.gif' width='15' height='15'/>");
        },   
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('jqXHR: \n'+jqXHR);
            console.log('textStatus: \n'+textStatus);
            console.log('errorThrown: \n'+errorThrown);
            $("#"+btn_id).attr("disabled", false);
            $("#"+span_id).empty();
        },
        success: function(retorno){
            // console.log(retorno);
            $("#"+btn_id).attr("disabled", false);
            $("#"+span_id).empty();
            if (retorno == true) {
              //  alert("Sucesso");
                //window.location = caminho;
                    localStorage.setItem("status", "success");
					localStorage.setItem("msg", "ativa");
					localStorage.setItem("texto", "Ação realizada com sucesso!");				
					window.location.reload();
            }else{
                    localStorage.setItem("status", "danger");
					localStorage.setItem("msg", "ativa");
					localStorage.setItem("texto", "Falha ao cadastrar!");				
					window.location.reload();
            }
        }
    });
}

function ChamadaPadrao2(form_id,btn_id,span_id,caminho){
    var formulario = document.getElementById(form_id);
    var formData = new FormData(formulario);
    let mensagem = '';
    $.ajax({
        url: "../myregist/response_api.php",
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,  
        contentType: false,
        beforeSend: function(){
            $("#"+btn_id).attr("disabled", true);
            $("#"+span_id).html("<img src='utils/img/gifs.gif' width='15' height='15'/>");
        },   
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('jqXHR: \n'+jqXHR);
            console.log('textStatus: \n'+textStatus);
            console.log('errorThrown: \n'+errorThrown);
            $("#"+btn_id).attr("disabled", false);
            $("#"+span_id).empty();
        },
        success: function(retorno){
            // console.log(retorno);
            $("#"+btn_id).attr("disabled", false);
            $("#"+span_id).empty();
            if (retorno == true) {
                alert("Sucesso");
                window.location = caminho;
            }else{
                alert("Falha");
            }
        }
    });
}

function excluir_padrao(padrao){
    let id = document.getElementById(padrao).getAttribute("data-padrao-id");
    let tabela = document.getElementById(padrao).getAttribute("data-padrao-tabela");
	
    let url = window.location.href;
    if (confirm("As informações serão excluídas permanentemente do sistema. \nDeseja continuar?")) {
        $.ajax({
            url: "backend/config/processos/excluir.php",
            type: "POST",
            data: {id,tabela},
            dataType: 'json',  
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('jqXHR: \n'+jqXHR);
                console.log('textStatus: \n'+textStatus);
                console.log('errorThrown: \n'+errorThrown);
            },
            success: function(retorno){
                // console.log(retorno);
                if (retorno == true) {
                    localStorage.setItem("status", "success");
					localStorage.setItem("msg", "ativa");
					localStorage.setItem("texto", "Ação realizada com sucesso!");				
					window.location.reload();
                }else{
                      localStorage.setItem("status", "danger");
					localStorage.setItem("msg", "ativa");
					localStorage.setItem("texto", "Falha ao cadastrar!");				
					window.location.reload();
                }
            }
        });
    }
}

function excluirProduto(id,btn) {
    let cod = 16;
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
                    localStorage.setItem("status", "success");
					localStorage.setItem("msg", "ativa");
					localStorage.setItem("texto", "Ação realizada com sucesso!");				
					window.location.reload();
                }else{
                     localStorage.setItem("status", "danger");
					localStorage.setItem("msg", "ativa");
					localStorage.setItem("texto", "Falha ao cadastrar!");				
					window.location.reload();
                }
            }
        });
    }
}


function excluirCategoria(id,btn) {
    let cod = 17;
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
                    localStorage.setItem("status", "success");
					localStorage.setItem("msg", "ativa");
					localStorage.setItem("texto", "Ação realizada com sucesso!");				
					window.location.reload();
                }else{
                     localStorage.setItem("status", "danger");
					localStorage.setItem("msg", "ativa");
					localStorage.setItem("texto", "Falha ao cadastrar!");				
					window.location.reload();
                }
            }
        });
    }
}

function excluirDepartamento(id,btn) {
    let cod = 19;
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
                    localStorage.setItem("status", "success");
					localStorage.setItem("msg", "ativa");
					localStorage.setItem("texto", "Ação realizada com sucesso!");				
					window.location.reload();
                }else{
                     localStorage.setItem("status", "danger");
					localStorage.setItem("msg", "ativa");
					localStorage.setItem("texto", "Falha ao cadastrar!");				
					window.location.reload();
                }
            }
        });
    }
}

function excluirImage(id,btn) {
    let cod = 166;
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
                    localStorage.setItem("status", "success");
					localStorage.setItem("msg", "ativa");
					localStorage.setItem("texto", "Ação realizada com sucesso!");				
					window.location.reload();
                }else{
                     localStorage.setItem("status", "danger");
					localStorage.setItem("msg", "ativa");
					localStorage.setItem("texto", "Falha ao cadastrar!");				
					window.location.reload();
                }
            }
        });
    }
}

function excluirRifa2(id,btn) {
    let cod = 21;
    if (confirm('Deseja realmente excluir a forma de pagamento ?')) {
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
                    window.location = 'pag.php';
                }else{
                    alert("Falha");
                }
            }
        });
    }
}

function func(cor,texto){
        var placementFrom = "top";
        var placementAlign = "left";
        var state = cor;
        var style = "plain";
        var content = {};

        content.message = texto;
        content.title = '';
        if (style == "withicon") {
            content.icon = 'fa fa-bell';
        } else {
            content.icon = 'none';
        }
        content.url = '#';
        content.target = '_blank';

        $.notify(content,{
            type: state,
            placement: {
                from: placementFrom,
                align: placementAlign
            },
            time: 50000,
        });
        localStorage.setItem("status", "");
        localStorage.setItem("msg", "negativo");
        localStorage.setItem("texto", "");
}

function preview(cod,id,cliente_id){
	
	$("#pedido-view-2").html("");
	$("#pedido-view").html("");
	
	$.ajax({
        url: "backend/config/processos/processos.php",
        type: "POST",
		data: {cod: cod,id: id,cliente_id: cliente_id} ,
        dataType: 'json',
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('jqXHR: \n'+jqXHR);
            console.log('textStatus: \n'+textStatus);
            console.log('errorThrown: \n'+errorThrown);
        },
        success: function(retorno){
			var my = "", total,forma,entrega,my2, peso_total = 0;
			$.each(JSON.parse(JSON.stringify(retorno[0])), function( p, item ){
					console.log(item.medida);
					var peso = parseFloat(item.peso) * parseInt(item.qtd);
					
					if(Number.isNaN(peso)){ peso = 0;}
					
					peso_total = peso_total + peso
					
					my += "<tr>";
					my += "  <td>"+item.qtd+"</td>";
					my += "  <td>"+item.medida+"</td>";
					my += "  <td>"+item.item+"</td>";
					
					if(peso == 0){
						my += "  <td style='background-color: #e55454;color: #fff;font-weight: 800;' >"+parseFloat(peso).toFixed(3)+"</td>";
					}else{
						my += "  <td>"+parseFloat(peso).toFixed(3)+"</td>";
					}
					
					
					my += "  <td>R$ "+item.preco+"</td>";
					my += "</tr>";
					total = item.valor_total;
					desconto = item.desconto;
					valor_pago_tp1 = item.valor_pago_tp1;
					
					forma = item.forma_pgt;
					entrega = item.entrega;
			});
			
					total = total.replace("Total:", "");
						
						
					if(desconto !== null){
						total = total.replace("R$ ", "");
						total = total.replace(",", ".");
					
						total = (parseFloat(total) - parseFloat(desconto)).toFixed(2);
						
						my += "<tr>";
						my += "  <td colspan='3'></td>";
						my += "  <td class='bg-success text-white'>Desconto:</td>";
						my += "  <td class='bg-success text-white'><b> R$ "+desconto+"</b></td>";
						my += "</tr>";
					}	
						
					my += "<tr>";
					my += "  <td colspan='3'></td>";
					my += "  <td class='bg-success text-white'>Valor Total:</td>";
					my += "  <td class='bg-success text-white'><b>"+total+"</b></td>";
					my += "</tr>";
					
					if(valor_pago_tp1 != 0){
						valor_pago_tp1 = valor_pago_tp1.replace("Total:", "");
						
						my += "<tr>";
						my += "  <td colspan='3'></td>";
						my += "  <td class='bg-success text-white'>Valor a ser Pago:</td>";
						my += "  <td class='bg-success text-white'><b>"+valor_pago_tp1+"</b></td>";
						my += "</tr>";
						
					}					
					
					
					my += "<tr>";
					my += "  <td colspan='3'></td>";
					my += "  <td class='bg-success text-white'>Peso total:</td>";
					my += "  <td class='bg-success text-white'><b>"+peso_total+" Kg</b></td>";
					my += "</tr>";					
					my += "<tr>";
					my += "  <td colspan='3'></td>";
					my += "  <td class='bg-success text-white'>Forma de Pagamento:</td>";
					my += "  <td class='bg-success text-white'><b>"+forma+"</b></td>";
					my += "</tr>";
					my += "<tr>";
					my += "  <td colspan='3'></td>";
					my += "  <td class='bg-success text-white'>Entrega:</td>";
					my += "  <td class='bg-success text-white'><b>"+entrega+"</b></td>";
					my += "</tr>";
					
					
					var cliente = JSON.parse(JSON.stringify(retorno[1][0]));
								
					my2 += "<tr>";
					my2 += "  <td><b>"+cliente.nome+"</b></td>";
					my2 += "  <td><b>"+cliente.whatsapp+"</b></td>";
					my2 += "  <td><b>"+cliente.cpf_cpnj+"</b></td>";
					my2 += "  <td><b>"+cliente.obs+"</b></td>";
					my2 += "</tr>";
					my2 += "<tr class='table-warning'>";
					my2 += "  <td><b>Endereço:</b></td>";
					my2 += "  <td colspan='3'>"+cliente.endereco+",n° "+cliente.numero+" Bairro: "+cliente.bairro+", "+cliente.cidade+" - "+cliente.estado+", CEP: "+cliente.cep+", REF: "+cliente.referencia+"</td>";
					my2 += "</tr>";
					
					
			
			
			$("#modalBTN001").html("Pedido n°:"+id);
			$("#pedido-view-2").html(my2);
			$("#pedido-view").html(my);
        }
	});
	
}
function montar_edit(nome_tamanho,valor,status,id){
	
			$("#dp_titulo_up").val(nome_tamanho);
			$("#dp_prod_id_up").val(id);
			$("#valor_up").val(valor);
			$("#status_up").val(status);

}
function montar_edit2(nome_tamanho,cor,qtd,status,id){
	
			$("#dp_titulo_up").val(nome_tamanho);
			$("#dp_prod_id_up").val(id);
			$("#primaria_up").val(cor);
			$("#chosen-color2").val(cor);
			$("#qtd_up").val(qtd);
			$("#status_up").val(status);
}