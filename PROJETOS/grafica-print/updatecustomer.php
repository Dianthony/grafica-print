<?php
    include_once('conexao.php');

    $id = $_GET['id'];
    $name = $_GET['newname'];
    $address = $_GET['newaddress'];
    $contact = $_GET['newcontact'];

    $update = $pdo->prepare("UPDATE customers SET name=?, address=?, contact=? WHERE id=?");
    $update->execute([$name, $address, $contact, $id]);
    return($update)?true:false;
?>