<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
        <a class="navbar-brand" href="dashboard.php"><?= $_SESSION['emp']["dp_nome"]; ?></a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active"><a class="nav-link" href="dashboard.php">Dashboard</a></li>
                <li class="nav-item active"><a class="nav-link" href="produtos.php">Produtos</a></li>
                <li class="nav-item active"><a class="nav-link" href="categorias.php">Categorias</a></li>
                <li class="nav-item active"><a class="nav-link" href="pedidos.php">Pedidos</a></li>
                <li class="nav-item active"><a class="nav-link" href="clientes.php">Clientes</a></li>
                <li class="nav-item active"><a class="nav-link" href="config.php">Configurações Gerais</a></li>
            </ul>
            <ul class="navbar-nav form-inline my-2 my-lg-0">
                <?php if($_SESSION['id_type'] == 1){?>
                <li class="nav-item active" title="Ir para listagem dos Usuários">
                    <a class="nav-link" href="users.php"><i class="fas fa-users"></i></a>
                </li>
                <?php }?>
                <li class="nav-item active" title="Sair do Sistema">
                    <a class="nav-link" href="exit.php"><i class="fas fa-sign-out-alt"></i></a>
                </li>
            </ul>
        </div>
    </div>
</nav>