$('.cpf').mask('000.000.000-00', {reverse: true});
$('.rg').mask('000.000.000-0', {reverse: true});
$('.phone').mask('(00) 00000-0000');
$('.cep').mask('00000-000');
$('.tel').mask('(00) 0000-0000');
$('.ano').mask('0000');
$('.numcnh').mask('00000000000');

$("#cep").focusout(function(){
    $.ajax({
        url: 'https://viacep.com.br/ws/'+$(this).val()+'/json/unicode/',
        dataType: 'json',
        success: function(resposta){
            $("#endereco").val(resposta.logradouro);
            $("#bairro").val(resposta.bairro);
            $("#numero_endereco").focus();
        }
    });
});