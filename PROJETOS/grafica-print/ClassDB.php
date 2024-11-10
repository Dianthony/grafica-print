<?php
    class ClassDB
    {
        #Conexão ao banco

        private function conectDB(){
            try{
                return $con = new \PDO("mysql:host=localhost;dbname=graficaprint","root","");

            }catch (PDOException $erro){
                return $erro -> getMessage();
            }
        }

        #verificar op login
        
        public function verifyLogin($admin, $pass){
            $b = $this->conectDB()->prepare("SELECT * FROM admins WHERE login=? and password=?");
            $b->bindParam(1, $admin, \PDO::PARAM_STR);
            $b->bindParam(2, $pass, \PDO::PARAM_STR);
            $b->execute();
            return($b->rowCount() > 0)?true:false;
        }
    }
?>
