<?php 

session_start();

if (!empty($_SESSION['id_user'])) {
    echo "<script>window.location='dashboard.php';</script>";
}

?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Painel administrativo - Login</title>
    <link rel="stylesheet" type="text/css" href="utils/css/bootstrap.min.css">
    <link rel="stylesheet" href="utils/css/login.css">
	<script src="https://kit.fontawesome.com/f35f15f80c.js" crossorigin="anonymous"></script>
</head>
<body>
    <div id="app">
        <div class="container">
            <div class="content">
                <h1><i class="far fa-user-circle fa-3x"></i><br>Login</h1>
                <form method="post" id="form_login">
                    <div class="login_box">
                        <label for="email">E-mail</label>
                        <input name="email" id="email" type="email" placeholder="E-mail de acesso" required>
                        <label for="senha">Senha</label>
                        <input type="password" name="senha" id="senha" placeholder="Sua senha" required>
                        <button id="btn_form"><i class="fa fa-sign-in" aria-hidden="true"></i> Entrar</button>
                        <div class="alerta d1">
                            <span id="text_erro"></span>
                            <i class="far fa-times-circle" id="ic_close"></i>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <?php require_once("components/footer.php");?>

    <script src="utils/js/jquery-1.12.4.min.js"></script>
    <script src="utils/js/bootstrap.min.js"></script>
    <script src="utils/js/login.js"></script>
</body>
</html>