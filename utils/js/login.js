$('#form_login').submit(function() {
    var formulario = document.getElementById('form_login');
    var formData = new FormData(formulario);
    $.ajax({
        url: "backend/config/processos/login.php",
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,  
        contentType: false,
        beforeSend: function(){
            $("#btn_form").attr("disabled", true);
            $("#btn_form").html("<img src='utils/img/gifs.gif' width='10' height='10'/>");
        },   
        error: function(jqXHR, textStatus, errorThrown) {
            console.log('jqXHR: \n'+jqXHR);
            console.log('textStatus: \n'+textStatus);
            console.log('errorThrown: \n'+errorThrown);
            $("#btn_form").attr("disabled", false);
            $("#btn_form").html("<i class='fas fa-sign-in-alt'></i> Entrar");
        },
        success: function(retorno){
                $("#btn_form").attr("disabled", false);
                $("#btn_form").html("<i class='fas fa-sign-in-alt'></i> Entrar");
                if (retorno == 1) {
                    $(".alerta").addClass("d2");
                    $("#text_erro").html("Todos os campos são obrigatórios.");
                } else if (retorno == 2) {
                    $(".alerta").addClass("d2");
                    $("#text_erro").html("Usuário não encontrado.");
                } else if (retorno == 3) {
                    window.location = 'dashboard.php';
                } else if (retorno == 4) {
                    $(".alerta").addClass("d2");
                    $("#text_erro").html("Usuário sem autorização.");
                }
        }
    });
    return false;
});

$("#ic_close").click(function(){
    $(".alerta").removeClass("d2");
});