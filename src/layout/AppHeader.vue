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
		    <form  class="form-inline my-2 my-lg-0" action="" method="POST">
		      	<input class="form-control mr-sm-2" type="text" placeholder="Email ou apelido" aria-label="Login" id="usuario" name="usuario" required>
		      	<input class="form-control mr-sm-2" type="password" placeholder="Senha" aria-label="Senha" id="senha" name="senha" required>
		      	<button class="btn btn-success my-2 my-sm-0" type="submit" id="enviar"><i class="fa fa-sign-in" aria-hidden="true"></i> Login</button>
		    </form>
		</div>
	</nav>
</template>

<script>
	export default{
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
			}
		}
	}
</script>

<style>

</style>
