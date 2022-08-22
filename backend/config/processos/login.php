<?php 

session_start();

require_once("../../../vendor/autoload.php");

header("Access-Control-Allow-Origin: *");

$login = new \App\Models\Login($_POST);

$var = $login->loginOn();

echo json_encode($var);