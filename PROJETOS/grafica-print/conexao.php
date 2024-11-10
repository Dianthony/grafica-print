<?php
    header('Acess-Control-Allow-Origin: *');
    header('Acess-Control-Allow-Credentials: true');
    header('Acess-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Acess-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
    header('Content-Type: application/json; charset=utf-8');

    try{
         $pdo = new PDO("mysql:host=localhost;dbname=graficaprint","root","");

    }catch (PDOException $erro){
        return $erro -> getMessage();
    }

?>