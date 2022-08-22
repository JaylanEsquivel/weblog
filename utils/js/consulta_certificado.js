$('#form_pesquisa').submit(function(e) {
    e.preventDefault();
    let formulario = document.getElementById('form_pesquisa');
    let formData = new FormData(formulario);
    $.ajax({
        url: "backend/config/processos/certificado_consulta.php",
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
                alert("Nenhum certificado encontrado para este CPF.");
            }
        }
    });
    return false;
});