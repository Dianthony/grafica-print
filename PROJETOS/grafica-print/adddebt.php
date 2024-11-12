<?php
    include_once('conexao.php');

    $id = $_GET['id'];
    $title = $_GET['title'];
    $desc = $_GET['desc'];
    $value = $_GET['value'];
    $date = $_GET['date'];

    $insert = $pdo->prepare("INSERT INTO debts VALUES (?, ?, ?, ?, ?, ?)");
    $insert->execute([0,$title, $desc, $value, $date, $id]);
    return($insert)?true:false;
?>