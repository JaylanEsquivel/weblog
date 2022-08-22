<?php 

session_start();

require_once("../../../vendor/autoload.php");
	include '../../../lib/ImageResize.php';

header("Access-Control-Allow-Origin: *");

$cod = $_POST['cod'];

function geraThumb($photo, $output, $new_width)
{
	$source = imagecreatefromstring(file_get_contents($photo));
	list($width, $height) = getimagesize($photo);

		$new_height = 450;

		$thumb = imagecreatetruecolor($new_width, $new_height);
		imagecopyresampled($thumb, $source, 0, 0, 0, 0,
			$new_width, $new_height, $width, $height);
		imagepng($thumb, $output, 9);
  
}

//cadastrar novo usuário
if ($cod == 1) {
	$user = new \App\Models\User();
	$var = $user->setUser($_POST);
}

//alterar status do usuário
if ($cod == 2) {
	if (!empty($_POST['id'])) {
		$user = new \App\Models\User();
		$var = $user->alterStatus($_POST['id'],$_POST['status']);
	} else { $var = false; }
}

//alterar status do usuário
if ($cod == 3) {
	if (!empty($_POST['id_esc']) && !empty($_POST['user_nome_edt'])) {
		if (!empty($_POST['user_email_edt']) && !empty($_POST['user_type_edt'])) {
			$user = new \App\Models\User();
			$var = $user->editarUser($_POST);
		} else { $var = false; }
	} else { $var = false; }
}

echo json_encode($var);