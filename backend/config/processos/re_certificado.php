<?php 

session_start();

if (!isset($_GET['ref']) || empty($_GET['ref'])) {
	echo "<script>window.location='../../../dashboard.php';</script>";
}

$_SESSION['id_certificado'] = $_GET['ref'];
$_SESSION['origem_certificado'] = 1;

header("Location: ../../../certificado.php");