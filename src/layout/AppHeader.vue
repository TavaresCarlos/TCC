<template>
	<nav class="navbar navbar-expand-lg navbar-dark bg-primary .col-12 .col-sm-12 .col-md-12 .col-xl-12">
		<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo" aria-controls="navbarTogglerDemo" aria-expanded="true" aria-label="Toggle navigation">
		    <span class="navbar-toggler-icon"></span>
		</button>
		<img src="src/img/logo/logo.png" width="30" height="30" alt="">&nbsp
		<a class="navbar-brand" href="#">
		    <div id="nome-sistema">

	    	</div>
		</a>

		<div class="collapse navbar-collapse" id="navbarTogglerDemo">
		   	<ul class="navbar-nav mr-auto mt-2 mt-lg-0" id="menu-superior-itens">
		      	<li class="nav-item active">
		      		<button type="button" class="btn btn-primary" id="home" @click="home">Home</button>
		      	</li>
		      	<li class="nav-item active">
		        	<button type="button" class="btn btn-primary" id="colaborar" @click="colaborar">Colaborar</button>
		      	</li>
		      	<li class="nav-item active">
		        	<button type="button" class="btn btn-primary" id="cadastro" @click="cadastro">Cadastro</button>
		      	</li>
		      	<li class="nav-item active">
		        	<button type="button" class="btn btn-primary" id="colaboracoes" @click="colaboracoes">Colaborações</button>
		      	</li>
		      	<li class="nav-item active">
		        	<button type="button" class="btn btn-primary" id="contato" @click="contato">Contato</button>
		      	</li>
		      	<li class="nav-item active">
		        	<button type="button" class="btn btn-primary" id="exportar" @click="exportar">Exportar</button>
		      	</li>
		    </ul>
		    <div class="form-inline my-2 my-lg-0">
		      	<input class="form-control mr-sm-2" type="text" placeholder="Email ou apelido" aria-label="Login" id="usuario" name="usuario" v-model="usuario">
		      	<input class="form-control mr-sm-2" type="password" placeholder="Senha" aria-label="Senha" id="senha" name="senha" v-model="senha" required>
		      	<button class="btn btn-success my-2 my-sm-0" type="submit" id="enviar" @click="login()"><i class="fa fa-sign-in" aria-hidden="true"></i> Login</button>
		    </div>
		</div>
	</nav>
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
			home: function(){
				this.$router.push('/home')
			},
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
                    		this.$router.push('/painel');
                    	}
                    	/*
                    	else if(response.data[0].tipo == 'administrador'){
                    		this.$router.push('/painel');
                    	}
                    	else if(response.data[0].tipo == 'anonimo'){
                    		this.$router.push('/painel');
                    	}
                    	else if(response.data[0].tipo == 'default'){
                    		this.$router.push('/painel');
                    	}
                    	*/
                    }
                })
			}
		}
	}
</script>

<style>

</style>
