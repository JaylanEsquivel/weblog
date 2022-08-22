<?php 

session_start();

require_once("../../../vendor/autoload.php");

header("Access-Control-Allow-Origin: *");

$cadastro = new \App\Models\Cadastro($_POST);

$var = $cadastro->cadCadastro();

echo json_encode($var);