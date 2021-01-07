<template>
	<div class="row">
		<div class="card" id="menu">
			<div class="card-body">
				<h5 class="card-title"><center>Bem-Vindo</center></h5>
				<div id="painel">
					<a href="#" class="btn btn-success btn-sm btn-block" id="colaborar" name="colaborar" @click="colaboracao()"><span class="oi oi-plus"></span> Colaboração</a>
					<a href="#" class="btn btn-success btn-sm btn-block" id="perfil" name="perfil" @click="perfil()"><span class="oi oi-plus"></span> Ver Perfil</a>
					<a href="#" class="btn btn-success btn-sm btn-block" id="trocarSenha" name="trocarSenha" @click="trocarSenha()"><span class="oi oi-plus"></span> Trocar Senha</a>
					<a href="#" class="btn btn-success btn-sm btn-block" id="logout" name="logout" @click=""><span class="oi oi-plus"></span> Sair</a>
				</div>
			</div>
		</div>
		<router-view></router-view>
	</div>
</template>

<script>
	export default{
		methods:{
			perfil: function(){
				this.$router.push({ path: `/colaborador/perfil` })
			},
			trocarSenha: function(){
				this.$router.push({ path: `/colaborador/trocarSenha` })
			},
			colaboracao: function(){
				this.$router.push({ path: `/colaborador/colaboracao` })
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
	margin: 2px 1px 2px 2px;
}
</style>
