<?php
include_once('conexao.php');

$id = $_GET['id'];

$getCustomer = $pdo->query("SELECT * FROM customers WHERE id=$id");
$customer = $getCustomer->fetchAll(PDO::FETCH_ASSOC);

for($i=0; $i < count($customer); $i++){
    foreach($customer[$i] as $key => $value){
    }
        $dadosCustomer[] = array(
            'id' => $customer[$i]['id'],
            'name' => $customer[$i]['name'],
            'address' => $customer[$i]['address'],
            'contact' => $customer[$i]['contact'],
        );
}

$get = $pdo->query("SELECT * FROM debts WHERE id_customer=$id");
$debt = $get->fetchAll(PDO::FETCH_ASSOC);

for($i=0; $i < count($debt); $i++){
    foreach($debt[$i] as $key => $value){
    }
        $dados[] = array(
            'id' => $debt[$i]['id'],
            'title' => $debt[$i]['title'],
            'desc' => $debt[$i]['desc'],
            'value' => $debt[$i]['value'],
            'date' => $debt[$i]['date'],
        );
}

if(count($debt) > 0){
    $result = json_encode(array('sucess'=>true, 'result'=> $dados, 'customer'=>$dadosCustomer));
}else{
    $result = json_encode(array('sucess'=>false, 'result'=> '0', 'customer'=>$dadosCustomer));
}
echo $result;

?>