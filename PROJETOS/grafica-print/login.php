<?php

include_once('conexao.php');

$login = $_GET['login'];
$password = md5($_GET['password']);

$get = $pdo->query("SELECT * FROM admins WHERE login='$login' AND password='$password'");
$admin = $get->fetchAll(PDO::FETCH_ASSOC);

for($i=0; $i < count($admin); $i++){
    foreach($admin[$i] as $key => $value){
    }
        $dadosAdmin[] = array(
            'id' => $admin[$i]['id'],
            'login' => $admin[$i]['login'],
            'password' => $admin[$i]['password'],
        );
}

if(count($admin) > 0){
    $result = json_encode(array('sucess'=>true));
}else{
    $result = json_encode(array('sucess'=>false));
}

echo $result;

?>