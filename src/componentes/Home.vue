<template>
	<div class="row">
        <div class="col-xl-4 col-sm-2"></div>
            <div class="col-xl-4 col-sm-8">
                <div id="login">
					<center><h4>Nome do sistema</h4></center>
					<center><img src="src/img/logo/logo.png" width="30" height="30" alt=""></center>
					<br>
					<input class="form-control mr-sm-2" type="text" placeholder="Email ou apelido" aria-label="Login" id="usuario" name="usuario" v-model="usuario">
					<br>
		      		<input class="form-control mr-sm-2" type="password" placeholder="Senha" aria-label="Senha" id="senha" name="senha" v-model="senha" required>
		      		<br>
		      		<button class="btn btn-success btn-lg btn-block" type="submit" id="enviar" @click="login()"><i class="fa fa-sign-in" aria-hidden="true"></i> Login</button>
		      		<br>
		      		<center>Esqueceu a senha ? Clique aqui</center>
				</div>
				<div id="menu">
					<center>
						<button class="btn btn-success my-2 my-sm-0" type="submit" id="cadastro" @click="cadastro"><i class="fa fa-sign-in" aria-hidden="true"></i> Cadastro</button>
						<button class="btn btn-success my-2 my-sm-0" type="submit" id="contato" @click="contato"><i class="fa fa-sign-in" aria-hidden="true"></i> Contato</button>
						<button class="btn btn-success my-2 my-sm-0" type="submit" id="colaboracoes" @click="colaboracoes"><i class="fa fa-sign-in" aria-hidden="true"></i> Colaborações</button>
						<button class="btn btn-success my-2 my-sm-0" type="submit" id="exportar" @click="exportar"><i class="fa fa-sign-in" aria-hidden="true"></i> Exportar</button>
					</center>	
				</div>
			</div>
	</div>
</template>

<script>
	import axios from 'axios';

	export default{
		data(){
			return{
				usuario: '',
				senha: ''
			}
		},
		methods:{
			colaborar: function(){
				this.$router.push('/colaborar')
			},
			contato: function(){
				this.$router.push('/contato')
			},
			cadastro: function(){
				this.$router.push('/cadastro')
			},
			colaboracoes: function(){
				this.$router.push('/colaboracoes')
			},
			exportar: function(){
				this.$router.push('/exportar')
			},

			login(){
				axios.post('http://localhost:3000/login', { usuario: this.usuario, senha: this.senha }).then((response) => {
                    if(typeof(response.data) == 'string'){
                    	alert(response.data);
                    }
                    else if(response.data.length != 0){
                    	console.log(response);
                    	if(response.data[0].tipo == 'colaborador'){
                    		this.$router.push('/colaborador');
                    	}
                    	/*
                    	else if(response.data[0].tipo == 'administrador'){
                    		this.$router.push('/administrador');
                    	}
                    	else if(response.data[0].tipo == 'anonimo'){
                    		this.$router.push('/anonimo');
                    	}
                    	else if(response.data[0].tipo == 'default'){
                    		this.$router.push('/default');
                    	}
                    	*/
                    }
                })
			}
		}
	}
</script>

<style>
#login{
	
	padding: 20px 20px 20px 20px;
	margin-top: 18%;
	color: #FFFFFF;
}
#menu{
	margin-top: 2%;
}
body{
	background-color: #274360;
}
</style>