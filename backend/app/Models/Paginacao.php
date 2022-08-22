<?php 

namespace App\Models;

class Paginacao
{
    public $paginador = 'pag';
    private $solicitador;
    public $sql;
    public $limite;
    public $quantidade = 5;
    public $url;
   
    // Construtor carrega a string usada para como paginador
    public function __construct($limite)
    {
        $this->solicitador = ( isset ($_REQUEST["{$this->paginador}"]) )
                                   ? $_REQUEST["{$this->paginador}"]
                                   : 0 ;
        $this->limite = $limite;
    }
    // Conexão privada
    public function conexao()
    {
        $con = Conexao::getConn();
        return $con;
    }
    // Retorna o número de resultados encontrados
    public function resultado()
    {
        $this->resultado = $this->conexao()->query(str_replace('*', 'COUNT(*)', $this->sql));
        $this->numeroResultados = $this->resultado->fetchColumn();
        return $this->numeroResultados;
    }
    // Imprime um texto amigável mostrando o status das paginas em relação ao resultado atual
    public function imprimeBarraResultados()
    {
        if($this->resultado() > 0) {
            echo '<p class="info_resultado_busca">';
            echo 'Exibindo página <b style="font-size:20px">' . $this->paginaAtual() . '</b> de <b style="font-size:20px">' . $this->paginasTotais() . '</b> disponíveis para <b style="font-size:20px">'.$this->resultado().'</b> resultados encontrados.</p>';
        } else {
            // echo '<p class="info_resultado_busca">Não foram encontrados resultados para sua busca.</p>';
            echo '<div class="alert alert-warning alert-dismissible" role="alert">
            <button class="close" type="button" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">
                    <i class="notika-icon notika-close"></i>
                </span>
            </button>
            Não foram encontrados resultados para sua busca.
        </div>';
        }
    }
    // Calcula o número total de páginas
    public function paginasTotais()
    {
        $paginasTotais = ceil($this->resultado() / $this->limite);
        return $paginasTotais;
    }
    // Procura o número da página Atual
    public function paginaAtual()
    {
        if (isset($this->solicitador) && is_numeric($this->solicitador)) {
            $this->paginaAtual = (int) $this->solicitador;
        } else {
            $this->paginaAtual = 1;
        }

        if ($this->paginaAtual > $this->paginasTotais()) {
            $this->paginaAtual = $this->paginasTotais();
        }

        if ($this->paginaAtual < 1) {
            $this->paginaAtual = 1;
        }

        return $this->paginaAtual;
       
    }
    // Calcula o offset da consulta
    private function offset()
    {
        $offset = ($this->paginaAtual() - 1) * $this->limite;
        return $offset;
    }
    // Retorna o SQL para trabalhar posteriormente
    public function sql()
    {
        $sql = $this->sql . " LIMIT {$this->limite} OFFSET {$this->offset()} ";
        return $sql;
    }
    // Retorna o SQL para trabalhar posteriormente porém sem o limitador
    public function sqlNoLimit()
    {
        $sql = $this->sql;
        return $sql;
    }
    // Imprime a barra de navegação da paginaçaõ
    public function imprimeBarraNavegacao()
    {
        if($this->resultado() > 0) {
            echo '<nav aria-label="Navegação da página"><ul class="pagination">';
            if ($this->paginaAtual() > 1) {
                echo " <li class='page-item'><a href='?" . $this->paginador . "=1" . $this->reconstruiQueryString($this->paginador) . " ".$this->url." ' class='page-link'>Primeira</a></li> ";
                $anterior = $this->paginaAtual() - 1;
                echo " <li class='page-item'><a href='?" . $this->paginador . "=" . $anterior . $this->reconstruiQueryString($this->paginador) . " ".$this->url." ' class='page-link'>Anterior</a></li> ";
            }
           
            for ($x = ($this->paginaAtual() - $this->quantidade); $x < (($this->paginaAtual() + $this->quantidade) + 1); $x++) {
                if (($x > 0) && ($x <= $this->paginasTotais())) {
                    if ($x == $this->paginaAtual()) {
                        echo " <li class='page-item disabled'><span data-toggle='tooltip' data-placement='top' data-original-title='Estamos Aqui!' class='page-link'>$x</span></li> ";
                    } else {
                        echo " <li class='page-item'><a href='?" . $this->paginador . "=" . $x . $this->reconstruiQueryString($this->paginador) . " ".$this->url." ' class='page-link'>$x</a></li> ";
                    }
                }
            }
           
            if ($this->paginaAtual() != $this->paginasTotais()) {
                $paginaProxima = $this->paginaAtual() + 1;
                echo " <li class='page-item'><a href='?" . $this->paginador . "=" . $paginaProxima . $this->reconstruiQueryString($this->paginador) . " ".$this->url." ' class='page-link'>Próxima</a></li> ";
                echo " <li class='page-item'><a href='?" . $this->paginador . "=" . $this->paginasTotais() . $this->reconstruiQueryString($this->paginador) . " ".$this->url." ' class='page-link'>Última</a></li> ";
            }
           
            echo '</ul></nav>';
        }
    }
    // Monta os valores da Query String novamente
    public function reconstruiQueryString($valoresQueryString) {
        if (!empty($_SERVER['QUERY_STRING'])) {
            $partes = explode("&", $_SERVER['QUERY_STRING']);
            $novasPartes = array();
            foreach ($partes as $val) {
                if (stristr($val, $valoresQueryString) == false) {
                    array_push($novasPartes, $val);
                }
            }
            if (count($novasPartes) != 0) {
                $queryString = "&".implode("&", $novasPartes);
            } else {
                return false;
            }
            return $queryString; // nova string criada
        } else {
            return false;
        }
    }
   
}