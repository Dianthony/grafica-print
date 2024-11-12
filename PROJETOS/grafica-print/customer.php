<?php

include_once('conexao.php');
$get = $pdo->query("SELECT * FROM customers ORDER BY name ASC");
$customer = $get->fetchAll(PDO::FETCH_ASSOC);

for($i=0; $i < count($customer); $i++){
    foreach($customer[$i] as $key => $value){
    }
        $dados[] = array(
            'id' => $customer[$i]['id'],
            'name' => $customer[$i]['name'],
            'address' => $customer[$i]['address'],
            'contact' => $customer[$i]['contact'],
        );
}
if(count($customer) > 0){
    $result = json_encode(array('sucess'=>true, 'result'=> $dados));
}else{
    $result = json_encode(array('sucess'=>false, 'result'=> '0'));
}
echo $result;

?>