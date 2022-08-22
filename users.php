<?php 
require_once("components/head.php");
require_once("vendor/autoload.php");
$user = new \App\Models\User();

$getAllUsers = $user->getAllUsers($_SESSION['empresa_id']);
?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Painel administrativo - Usuários</title>
    <link rel="stylesheet" type="text/css" href="utils/css/bootstrap.min.css">
    <link href="utils/css/dashboard.css" rel="stylesheet">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous">
</head>
<body>

    <?php require_once("components/menu_nav.php");?>

    <div class="jumbotron jumbotron-fluid" style="margin-bottom: 1rem;">
        <div class="container-fluid">
            <h2 class="display-5" style="font-weight: 500;"><i class="far fa-hand-point-right"></i> Usuários</h2>
        </div>
    </div>

    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-7">
                <!--New Cadastro-->
                <a data-toggle="modal" data-target="#abrirModal" class="btn btn-info" style="color: #fff;margin-bottom: 1rem;"><i class="fa fa-plus"></i> Adicionar Usuário</a>
            </div>
		</div>
        <div class="row">
            <div class="col-lg-12">
                <div class="table-responsive" style="margin-top: 20px;">
                    <table class="table table-sm table-bordered" style="font-size: 14px;">
                        <thead>
                            <tr>
                                <th style="width: 20px;text-align: center;">#</th>
                                <th>Nome</th>
                                <th>Email</th>
                                <th style="text-align: center;width: 80px;">Status</th>
                                <th style="text-align: center;width: 60px;">Editar</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php
                                $contador = 1;
                                if(!empty($getAllUsers)){
                                    foreach ($getAllUsers as $key => $lista) {
                            ?>
                            <tr>
                                <td style="text-align: center;"><?= $contador;?></td>
                                <td><?= $lista['dp_user'];?></td>
                                <td><?= $lista['dp_email'];?></td>
                                <td style="text-align: center;">
                                    <?php if($lista['status'] == 1){?>
                                    <button class="btn-success" onClick="mudar_status('<?= $lista['id'];?>','<?= $lista['status'];?>');" ><i class="fas fa-toggle-on"></i></button>
                                    <?php }else{?>
                                    <button class="btn-danger" onClick="mudar_status('<?= $lista['id'];?>','<?= $lista['status'];?>');" ><i class="fas fa-toggle-off"></i></button>
                                    <?php }?>
                                </td>
                                <td><div style="display: flex;justify-content: center;">
                                    <a data-toggle="modal" data-target="#modalEdt" style="cursor: pointer;" onclick="popularEditar(
                                        '<?= $lista['id'];?>',
                                        '<?= $lista['dp_email'];?>',
                                        '<?= $lista['dp_user'];?>',
                                        '<?= $lista['dp_tipo'];?>')"
                                    >&#9998;
                                    </a></div>
                                </td>
                            </tr>
                            <?php $contador++;}}?>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="abrirModal" tabindex="-1" role="dialog" aria-labelledby="abrirModaldms" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
            <form method="post" id="form_abrirModal" onSubmit="ChamadaPadrao(
                    this.id,
                    'btn_modalEdt',
                    'span_modalEdt',
                    'users.php'
                    );return false;">
          <div class="modal-header">
            <h5 class="modal-title" id="abrirModaldms">Novo Usuário</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="caixa_form">
                <input type="hidden" name="cod" value="1">
                <label for="user_nome">Nome Completo</label>
                <input class="form-control" required id="user_nome" name="user_nome">
                <label for="user_email">Email</label>
                <input type="email" class="form-control" required id="user_email" name="user_email">
                <label for="user_senha">Senha</label>
                <input type="password" class="form-control" required id="user_senha" name="user_senha">
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-success" name="BTN_NEW" id="btn_abrirModal">+ Adicionar <span id="span_abrirModal"></span></button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
          </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="modalEdt" tabindex="-1" role="dialog" aria-labelledby="modalEdtdms" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
            <form method="post" id="form_modalEdt" onSubmit="ChamadaPadrao(
                    this.id,
                    'btn_modalEdt',
                    'span_modalEdt',
                    'users.php'
                    );return false;">
          <div class="modal-header">
            <h5 class="modal-title" id="modalEdtdms">Editar Evento</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="caixa_form">
                <input type="hidden" name="id_esc" id="id_esc">
                <input type="hidden" name="cod" value="3">
                <label for="user_nome_edt">Nome Completo</label>
                <input class="form-control" required id="user_nome_edt" name="user_nome_edt">
                <label for="user_email_edt">Email</label>
                <input type="email" class="form-control" required id="user_email_edt" name="user_email_edt">
                <label for="user_type_edt">Tipo do Usuário</label>
                <select required class="form-control tipo_user" name="user_type_edt" id="user_type_edt">
                </select>
                <p style="font-weight: bold;color: #666;font-size: 10px;text-transform: uppercase;margin: 0;margin-top: 10px;">A senha não pode ser mostrada aqui pois foi encriptografada. Caso deseje alterar a senha apenas digite uma nova senha no campo a baixo.</p>
                <label for="user_senha_edt">Senha</label>
                <input type="password" class="form-control" id="user_senha_edt" name="user_senha_edt" autocomplete="off" readonly onfocus="this.removeAttribute('readonly');" onBlur="this.setAttribute('readonly', true);">
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-success" name="BTN_EDT" id="btn_modalEdt">&#10003; Salvar Alterações <span id="span_modalEdt"></span></button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
          </div>
          </form>
        </div>
      </div>
    </div>

    <?php require_once("components/footer.php");?>

    <script src="utils/js/jquery-1.12.4.min.js"></script>
    <script src="utils/js/bootstrap.min.js"></script>
    <script src="utils/js/users.js"></script>
    <script src="utils/js/padrao.js"></script>
</body>
</html>