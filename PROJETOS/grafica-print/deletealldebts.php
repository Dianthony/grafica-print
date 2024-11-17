<?php
    include_once('conexao.php');

    $id = $_GET['id'];

    $delete = $pdo->prepare("DELETE from debts WHERE id_customer=?");
    $delete->execute([$id]);
    return($delete)?true:false;
?>