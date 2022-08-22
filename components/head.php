<?php 

session_start();

if (empty($_SESSION['id_user'])) {
	echo "<script>window.location='login.php';</script>";
}

?>