<?php

namespace App\Models;

class Login extends Abs
{
	private $email,$senha,$id_usuario;

	public function __construct($array)
	{
		$this->setEmail($array['email']);
		$this->setSenha(md5($array['senha']));
	}

	/**
	* Efetuar Login
	* @return número de referência de erro ou sucesso
	*/
	public function loginOn()
	{
		if (empty($this->getEmail()) || empty($this->getSenha())) {
			return 1;//dados vazios
		} else {
			$user = $this->getUser();
			if (empty($user)) {
				return 2;//não encontrado
			} else if ($user[0]['status'] == 0) {
				return 4;//não autorizado
			} else {
				//salvar dados na sessão
				$_SESSION['id_user'] = $user[0]['id'];
				$_SESSION['id_type'] = $user[0]['dp_tipo'];
				$this->setId_usuario($user[0]['id']);
				
				//salvar controle de login
				return 3;//usuário encontrado
			}
		}

	}

	/**
	* Resgata dados do usuário
	*/
	private function getUser()
	{
		$condicao = array(
			array("dp_email", $this->getEmail()),
			array("dp_password", $this->getSenha()),
		);
		return $this->executaSelect("dp_users","*",$condicao,"","");
	}

	/**
	* Adicionar uma linha na tabela de controle de login
	*/
	private function setControl()
	{
		$campo_valor = array(
			array("id_user", $this->getId_usuario()),
		);
		return $this->executaInsert("user_control_login",$campo_valor);
	}

	/**
	 * Get the value of email
	 */ 
	public function getEmail()
	{
		return $this->email;
	}

	/**
	 * Set the value of email
	 *
	 * @return  self
	 */ 
	public function setEmail($email)
	{
		$this->email = $email;

		return $this;
	}

	/**
	 * Get the value of senha
	 */ 
	public function getSenha()
	{
		return $this->senha;
	}

	/**
	 * Set the value of senha
	 *
	 * @return  self
	 */ 
	public function setSenha($senha)
	{
		$this->senha = $senha;

		return $this;
	}

	/**
	 * Get the value of id_usuario
	 */ 
	public function getId_usuario()
	{
		return $this->id_usuario;
	}

	/**
	 * Set the value of id_usuario
	 *
	 * @return  self
	 */ 
	public function setId_usuario($id_usuario)
	{
		$this->id_usuario = $id_usuario;

		return $this;
	}
}