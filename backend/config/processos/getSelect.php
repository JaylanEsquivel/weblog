<?php 

session_start();

require_once("../../../vendor/autoload.php");

header("Access-Control-Allow-Origin: *");

$cod = $_POST['cod'];

//TIPOS DE USUÁRIOS
if ($cod == 6) {
	$user = new \App\Models\User();
	$query = $user->getAllTipes();
	if (!empty($query)) {
		$var = $query;
	} else { $var = false; }
}

echo json_encode($var);