<?php
    include_once('conexao.php');

    $id = $_GET['id'];

    $deleteCustomer = $pdo->prepare("DELETE from customers WHERE id=?");
    $deleteDebt = $pdo->prepare("DELETE from debts WHERE id_customer=?");
    $deleteCustomer->execute([$id]);
    $deleteDebt->execute([$id]);
    return($deleteCustomer)?true:false;
?>