//pegar tipos de usuários
function getTypesUser(){
    let cod = 6, resultado;
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
            // console.log(retorno);
            if (retorno != false) {
                resultado += "<option selected='' value=''>Selecione uma Opção</option>";
                for (let cc=0;cc<retorno.length;cc++) {
                    resultado += "<option value='"+retorno[cc].id+"'>"+retorno[cc].type+"</option>";
                }
                $(".tipo_user").html(resultado);
            }
        }
    });
}

function mudar_status (id,status) {
    let cod = 2;
    if (confirm("Deseja confirmar esta ação?")) {
        $.ajax({
            url: "backend/config/processos/processos.php",
            type: "POST",
            data: {id,cod,status},
            dataType: 'json', 
            error: function(jqXHR, textStatus, errorThrown) {
                console.log('jqXHR: \n'+jqXHR);
                console.log('textStatus: \n'+textStatus);
                console.log('errorThrown: \n'+errorThrown);
            },
            success: function(retorno){
                // console.log(retorno);
                if (retorno == true) {
                    alert("Sucesso");
                    window.location = 'users.php';
                }else{
                    alert("Falha");
                }
            }
        });
    }
}

function popularEditar(id,email,nome,tipo) {
    document.getElementById("id_esc").value = id;
    document.getElementById("user_email_edt").value = email;
    document.getElementById("user_nome_edt").value = nome;
    document.getElementById("user_type_edt").value = tipo;
}

$(document).ready(function(){
    //pegar tipos de usuários
    getTypesUser();
});