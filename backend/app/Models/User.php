<?php

namespace App\Models;

class User extends Abs
{

	/**
	* @return retorna todos os usuários
	*/
	public function getAllUsers()
	{
		return $this->executaSelect("dp_users","*",$condicao,"","");
	}
	
	/**
	* @return todos os tipso de usuários
	*/
	public function getAllTipes()
	{
		return $this->executaSelect("user_type","*","","","");
	}

	/**
	* Criar Novo Usuário
	* @return true or false
	*/
	public function setUser($array)
	{
		$campo_valor = array(
			array("dp_email", $array['user_email']),
			array("dp_user", $array['user_nome']),
			array("dp_password", md5($array['user_senha'])),
			array("dp_tipo",1),
		);
		return $this->executaInsert("dp_users",$campo_valor);
	}

	/**
	* Editar informações do Usuário
	* @return true or false
	*/
	public function editarUser($array)
	{
		$condicao = array(
			array("id", $array['id_esc']),
		);
		if (empty($array['user_senha_edt'])) {
			$campo_valor = array(
				array("user_email", $array['user_email_edt']),
				array("user_name", $array['user_nome_edt']),
				array("id_user_type", $array['user_type_edt']),
				array("id_user_att", $_SESSION['id_user']),
				array("data_att", date("Y-m-d H:i:s")),
			);
		} else {
			$campo_valor = array(
				array("user_email", $array['user_email_edt']),
				array("user_name", $array['user_nome_edt']),
				array("user_password", md5($array['user_senha_edt'])),
				array("id_user_type", $array['user_type_edt']),
				array("id_user_att", $_SESSION['id_user']),
				array("data_att", date("Y-m-d H:i:s")),
			);
		}
		return $this->executaUpdate("dp_users",$campo_valor,$condicao);
	}

	/**
	* Altera o status de um usuário
	*/
	public function alterStatus($id,$status)
	{
		$condicao = array(
			array("id", $id),
		);
		$campo_valor = array(
			array("status", abs(--$status)),
			array("id_user_att", $_SESSION['id_user']),
			array("data_att", date("Y-m-d H:i:s")),
		);
		return $this->executaUpdate("dp_users",$campo_valor,$condicao);
	}

	/**
	* Regatar número total de usuários
	* @return um valor numérico
	*/
	public function getTotUser()
	{
		return $this->executaSelect("dp_users","COUNT(*) as cont","","","");
	}

}