<?php

namespace App\Models;

/**
 * Eu criei esta classe com a intenção de nela criar funções abstratas que possam ser utilizadas em qualquer
 * parte do sistema.
 */

class Abs 
{

    /**
     * Prepara a query do SELECT
     */
    private function preparaSelect ($tabela,$campos,$condicao,$condicao_especial,$complemento)
    {
        $where = '';
        $especial = '';
        $query = "SELECT $campos FROM $tabela ";
        if(!empty($condicao) || !empty($condicao_especial)){
            if(!empty($condicao)){
                foreach ($condicao as $key => $value) {
                    $where .= " ".$value[0]." = ? AND ";
                }
            }
            if(!empty($condicao_especial)){
                foreach ($condicao_especial as $key => $value) {
                    $especial .= " ".$value[0]." AND ";
                }
            }
            $query .= " WHERE $where $especial  1=1 ";
        }
        if(!empty($complemento)){
            $query .= " $complemento ";
        }
        return $query;
    }
    
    private function preparaSelectInner ($tabela,$tabela2,$campos,$condicao,$condicao_especial,$complemento)
    {
        $where = '';
        $especial = '';
        $query = "SELECT $campos FROM $tabela";
        if(!empty($condicao) || !empty($condicao_especial)){
            if(!empty($condicao)){
                foreach ($condicao as $key => $value) {
                    $where .= " ".$value[0]." = ? AND ";
                }
            }
            
            $query .= " A INNER JOIN $tabela2 B ON $condicao_especial";
            $query .= " WHERE $where $especial 1=1 ";
        }
        if(!empty($complemento)){
            $query .= " $complemento ";
        }
        return $query;
    }

    private function preparaSelectInner3 ($tabela,$tabela2,$tabela3,$campos,$condicao,$condicao_especial,$condicao_especial2,$complemento)
    {
        $where = '';
        $especial = '';
        $query = "SELECT $campos FROM $tabela";
        if(!empty($condicao) || !empty($condicao_especial)){
            if(!empty($condicao)){
                foreach ($condicao as $key => $value) {
                    $where .= " ".$value[0]." = ? AND ";
                }
            }
            
            $query .= " A INNER JOIN $tabela2 B ON $condicao_especial";
            $query .= " INNER JOIN $tabela3 C ON $condicao_especial2";
            $query .= " WHERE $where $especial 1=1 ";
        }
        if(!empty($complemento)){
            $query .= " $complemento ";
        }
        return $query;
    } 

    /**
     * Prepara a query do DELETE
     */
    private function preparaDelete ($tabela,$condicao)
    {
        $where = '';
        $query = "DELETE FROM $tabela ";
        if(!empty($condicao)){
            foreach ($condicao as $key => $value) {
                $where .= " ".$condicao[$key][0]." = ? AND ";
            }
            $query .= " WHERE $where 1=1 ";
        }
        return $query;
    }

    /**
     * Prepara a query do INSERT
     */
    private function preparaInsert ($tabela,$campo_valor)
    {
        $campos = '';
        $valores = '';
        $tot = count($campo_valor);
        $query = "INSERT INTO $tabela";
        if(!empty($campo_valor)){
            //Inserir Campos
            $cc = 1;
            foreach ($campo_valor as $key => $value) {
                if($cc == $tot){ $campos .= $campo_valor[$key][0]; }else{ $campos .= $campo_valor[$key][0].","; } 
            $cc++;}
            $query .= "($campos) ";
            //Inserir Valores
            $cc = 1;
            foreach ($campo_valor as $key => $value) {
                if($cc == $tot){ $valores .= "?"; }else{ $valores .= "?,"; } 
            $cc++;}
            $query .= " VALUES($valores) ";
            return $query;
        }else{
            return false;
        }
    }

    /**
     * Prepara a query do DELETE
     */
    private function preparaUpdate ($tabela,$campo_valor,$condicao)
    {
        $where = '';
        $valores = '';
        $query = "UPDATE $tabela SET ";
        if(!empty($campo_valor)){
            $tot = count($campo_valor);
            //Montar Campo Valor
            $cc = 1;
            foreach ($campo_valor as $key => $value) {
                if($cc == $tot){ 
                    $valores .= $value[0]." = ? "; 
                }else{ 
                    $valores .= $value[0]." = ?,"; 
                } 
            $cc++;}
            $query .= $valores;
            //Montar Condição se houver
            if(!empty($condicao)){
                $query .= " WHERE ";
                $cc = 1;
                foreach ($condicao as $key => $value) {
                    $where .= $value[0]." = ? AND "; 
                $cc++;}  
                $query .= $where." 1=1 ";
            }
            return $query;
        }else{
            return false;
        }
    }

    public function executaSelect ($tabela,$campos,$condicao,$condicao_especial,$complemento)
    {
        $query = $this->preparaSelect($tabela,$campos,$condicao,$condicao_especial,$complemento);
        try {
            $stmt = Conexao::getConn()->prepare($query);
            if(!empty($condicao)){
                $cc = 1;
                foreach ($condicao as $key => $value) {
                    $stmt->bindParam($cc, $value[1]);
                $cc++; }
            }
            $stmt->execute();
            if($stmt->rowCount() > 0){
                return $stmt->fetchAll(\PDO::FETCH_ASSOC);
            }else{
                return false;
            }
        } catch (PDOException $e) {
            return $e;
        }
    }
    
    public function executaSelectInner ($tabela,$tabela2,$campos,$condicao,$condicao_especial,$complemento)
    {
        $query = $this->preparaSelectInner($tabela,$tabela2,$campos,$condicao,$condicao_especial,$complemento);
                   // return $query;        
        try {
            $stmt = Conexao::getConn()->prepare($query);
            if(!empty($condicao)){
                $cc = 1;
                foreach ($condicao as $key => $value) {
                    $stmt->bindParam($cc, $value[1]);
                $cc++; }
            }
            $stmt->execute();
            if($stmt->rowCount() > 0){
                return $stmt->fetchAll(\PDO::FETCH_ASSOC);
            }else{
                return false;
            }
        } catch (PDOException $e) {
            return $e;
        }/**/
    }    
    
    public function executaSelectInner3 ($tabela,$tabela2,$tabela3,$campos,$condicao,$condicao_especial,$condicao_especial2,$complemento)
    {
        $query = $this->preparaSelectInner3($tabela,$tabela2,$tabela3,$campos,$condicao,$condicao_especial,$condicao_especial2,$complemento);
                   // return $query;        
        try {
            $stmt = Conexao::getConn()->prepare($query);
            if(!empty($condicao)){
                $cc = 1;
                foreach ($condicao as $key => $value) {
                    $stmt->bindParam($cc, $value[1]);
                $cc++; }
            }
            $stmt->execute();
            if($stmt->rowCount() > 0){
                return $stmt->fetchAll(\PDO::FETCH_ASSOC);
            }else{
                return false;
            }
        } catch (PDOException $e) {
            return $e;
        }/**/
    }

    public function executaDelete ($tabela,$condicao)
    {
        $query = $this->preparaDelete($tabela,$condicao);
        try {
            $stmt = Conexao::getConn()->prepare($query);
            if(!empty($condicao)){
                $cc = 1;
                foreach ($condicao as $key => $value) {
                    $stmt->bindParam($cc, $condicao[$key][1]);
                $cc++; }
            }
            $result = $stmt->execute();
            return $result;
        } catch (PDOException $e) {
            return $e;
        }
    }

    public function executaInsert ($tabela,$campo_valor)
    {
        $query = $this->preparaInsert($tabela,$campo_valor);
        try {
            $stmt = Conexao::getConn()->prepare($query);
            if(!empty($campo_valor)){
                $cc = 1;
                foreach ($campo_valor as $key => $value) {
                    $stmt->bindParam($cc, $campo_valor[$key][1]);
                $cc++; }
            }
            $result = $stmt->execute();
            
            $_SESSION['id_1'] = Conexao::getConn()->lastInsertId();
            
            return $result;
        } catch (PDOException $e) {
            return $e;
        }
    }

    public function executaUpdate ($tabela,$campo_valor,$condicao)
    {
        $query = $this->preparaUpdate($tabela,$campo_valor,$condicao);
        try {
            $stmt = Conexao::getConn()->prepare($query);
            if(!empty($campo_valor)){
                $cc = 1;
                foreach ($campo_valor as $key => $value) {
                    $stmt->bindParam($cc, $campo_valor[$key][1]);
                $cc++; }
                $conta = count($campo_valor);
            }
            if(!empty($condicao)){
                $cc = 1;
                foreach ($condicao as $key => $value) {
                    $stmt->bindParam($cc+$conta, $condicao[$key][1]);
                $cc++; }
            }
            $result = $stmt->execute();
            return $result;
        } catch (PDOException $e) {
            return $e;
        }
    }

}