<?php

namespace App\Models;

class Conexao 
{
    
    private static $instance;

    public static function getConn() {
        if(!isset(self::$instance)){
            self::$instance = new \PDO("mysql:host=localhost;dbname=unidosim_sorteios;charset=utf8","unidosim_sorte","xtdc1227");
            // self::$instance = new \PDO("mysql:host=localhost;dbname=astteba_db;charset=utf8","root","");
        }
        return self::$instance;
    }

}