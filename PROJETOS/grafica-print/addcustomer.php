<?php
    include_once('conexao.php');

    $name = $_GET['name'];
    $address = $_GET['address'];
    $contact = $_GET['contact'];
    $debt = 0;

    $insert = $pdo->prepare("INSERT INTO customers VALUES (?, ?, ?, ?, ?)");
    $insert->execute([0,$name, $address, $contact, $debt]);
    return($insert)?true:false;
?>