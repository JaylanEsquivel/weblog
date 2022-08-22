<?php 
	require_once("components/head.php");
	require_once("vendor/autoload.php");

?>
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Painel administrativo - Dashboard</title>
    <link rel="stylesheet" type="text/css" href="utils/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.2/css/all.css" integrity="sha384-oS3vJWv+0UjzBfQzYUhtDYW+Pj2yciDJxpsK1OYPAYjqT085Qq/1cq5FLXAZQ7Ay" crossorigin="anonymous">
    <link href="utils/css/dashboard.css" rel="stylesheet">
    <link href="utils/css/theme.default.min.css" rel="stylesheet">
</head>
<body>

    <?php require_once("components/menu_nav.php");?>

    <div class="container-fluid" style="margin-top: 20px;">
      <div class="row">
        <div class="col-md-3">
          <div class="card-counter primary">
            <i class="fa fa-cube"></i>
            <span class="count-numbers"></span>
            <span class="count-name"></span>
          </div>
        </div>

        <div class="col-md-3">
          <div class="card-counter danger">
            <i class="fa fa-cubes"></i>
            <span class="count-numbers"></span>
            <span class="count-name"></span>
          </div>
        </div>

        <div class="col-md-3">
          <div class="card-counter success">
            <i class="fa fa-users"></i>
            <span class="count-numbers"></span>
            <span class="count-name"></span>
          </div>
        </div>

        <div class="col-md-3">
          <div class="card-counter info">
            <i class="fa fa-shopping-bag"></i>
            <span class="count-numbers"></span>
            <span class="count-name"></span>
          </div>
        </div>
      </div>
    </div>

    <?php require_once("components/footer.php");?>

    <script src="utils/js/jquery-1.12.4.min.js"></script>
    <script src="utils/js/bootstrap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.16/jquery.mask.min.js"></script>
    <script src="utils/js/dashboard.js"></script>
    <script src="utils/js/mask.js"></script>
    <script src="utils/js/padrao.js"></script>
    <script src="utils/js/jquery.tablesorter.min.js"></script>
    <script>
    $(function(){
      $('table').tablesorter({
        widgets        : ['zebra', 'columns'],
        usNumberFormat : false,
        sortReset      : true,
        seacher      : true,
        sortRestart    : true
      });
    });
    </script>
</body>
</html>