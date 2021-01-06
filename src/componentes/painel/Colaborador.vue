<template>
	<div class="row">
		<div class="card" id="menu">
			<div class="card-body">
				<h5 class="card-title">Welcome</h5>
				<a href="#" class="btn btn-success btn-sm btn-block" id="colaborar" name="colaborar" @click="colaboracao()"><span class="oi oi-plus"></span> Colaboração</a>
				<a href="#" class="btn btn-success btn-sm btn-block" id="perfil" name="perfil" @click="perfil()"><span class="oi oi-plus"></span> Ver Perfil</a>
				<a href="#" class="btn btn-success btn-sm btn-block" id="trocarSenha" name="trocarSenha" @click="trocarSenha()"><span class="oi oi-plus"></span> Trocar Senha</a>
				<a href="#" class="btn btn-success btn-sm btn-block" id="logout" name="logout" @click=""><span class="oi oi-plus"></span> Sair</a>
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
	margin-left: 1%;
	height: 100%;
	border-radius: 0px;
}
</style>
