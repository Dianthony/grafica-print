<?php
include_once('conexao.php');

$id = $_GET['id'];

$get = $pdo->query("SELECT name FROM customers WHERE id=$id");


$customer = $get->fetchAll(PDO::FETCH_ASSOC);

if(count($customer) > 0){
    $result = json_encode(array('sucess'=>true, 'result'=> $customer));
}else{
    $result = json_encode(array('sucess'=>false, 'result'=> '0'));
}
echo $result;

?>