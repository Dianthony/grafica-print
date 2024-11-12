<?php
    include_once('conexao.php');

    $id = $_GET['id'];
    $title = $_GET['title'];
    $desc = $_GET['desc'];
    $value = $_GET['value'];
    $date = $_GET['date'];

    $update = $pdo->prepare("UPDATE debts SET title=? WHERE id_customer=?");
    $update->execute([$title, $id]);
    return($update)?true:false;
?>