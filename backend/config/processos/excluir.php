<?php 

session_start();

require_once("../../../vendor/autoload.php");

header("Access-Control-Allow-Origin: *");

if (!empty($_POST['id']) || !empty($_POST['tabela'])) {
	$geral = new \App\Models\Geral();
	$var = $geral->excluirPadrao($_POST);
} else { $var = false; }

echo json_encode($var);