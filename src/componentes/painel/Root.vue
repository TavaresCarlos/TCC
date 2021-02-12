<template>
	<div class="row">
		<div class="card" id="menu">
			<img class="card-img-top" src="src/img/avatar.jpg" alt="Card image cap">
				<div class="card-body">
					<h5 class="card-title"><center>Bem-Vindo</center></h5>
					<div id="painel">
						<a class="btn btn-success btn-sm btn-block" id="perfil" name="perfil" @click="configuracaoSistema"><span class="oi oi-plus"></span>Configurar sistema</a>
						<a class="btn btn-success btn-sm btn-block" id="perfil" name="perfil" @click="addAdministradores"><span class="oi oi-plus"></span>Add Administradores</a>
						<a class="btn btn-success btn-sm btn-block" id="logout" name="logout" @click="sair"><span class="oi oi-plus"></span> Sair</a>
					</div>
				</div>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
	export default{
		methods:{
			configuracaoSistema: function(){
				this.$router.push({ path: `/root/ConfiguracaoInicial` })
			},
			addAdministradores: function(){
				this.$router.push({ path: `/root/AddAdministradores` })
			},
			sair: function(){
				this.$router.push({ path: `/` })
			}
		}
	}
</script>

<style>
.card{
	margin-left: 0%;
	height: 100%;
	border-radius: 0px;
}
#menu{
	margin-top: 1%;
}
#colaborar, #perfil, #trocarSenha, #logout{
	margin: 1px 1px 1px 1px;
}

</style>
