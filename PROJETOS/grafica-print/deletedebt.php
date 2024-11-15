<?php
    include_once('conexao.php');

    $id = $_GET['iddebt'];

    $delete = $pdo->prepare("DELETE from debts WHERE id=?");
    $delete->execute([$id]);
    return($delete)?true:false;
?>