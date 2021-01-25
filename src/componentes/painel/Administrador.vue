<template>
	<div class="row">
		<div class="card" id="menu">
			<div class="card-body">
				<h5 class="card-title"><center>Bem-Vindo</center></h5>
				<div id="painel">
					<a class="btn btn-success btn-sm btn-block" id="perfil" name="perfil" @click="addCategorias()"><span class="oi oi-plus"></span>Add Categorias</a>
					<a class="btn btn-success btn-sm btn-block" id="perfil" name="perfil" @click="addSubcategorias()"><span class="oi oi-plus"></span>Add Subcategorias</a>
					<a class="btn btn-success btn-sm btn-block" id="perfil" name="perfil" @click="contatos()"><span class="oi oi-plus"></span>Ver Contatos</a>
					<a class="btn btn-success btn-sm btn-block" id="perfil" name="perfil" @click=""><span class="oi oi-plus"></span>Ver Colaborações</a>
					<a class="btn btn-success btn-sm btn-block" id="perfil" name="perfil" @click="colaboracao()"><span class="oi oi-plus"></span>Colaboração</a>
					<a class="btn btn-success btn-sm btn-block" id="perfil" name="perfil" @click="perfil()"><span class="oi oi-plus"></span> Ver Perfil</a>
					<a class="btn btn-success btn-sm btn-block" id="trocarSenha" name="trocarSenha" @click="trocarSenha()"><span class="oi oi-plus"></span> Trocar Senha</a>
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
			perfil: function(){
				this.$router.push({ path: `/administrador/perfil` })
			},
			trocarSenha: function(){
				this.$router.push({ path: `/administrador/trocarSenha` })
			},
			colaboracao: function(){
				this.$router.push({ path: `/administrador/colaboracao` })
			},
			addCategorias: function(){
				this.$router.push({ path: `/administrador/adicionarCategorias` })
			},
			addSubcategorias: function(){
				this.$router.push({ path: `/administrador/adicionarSubcategorias` })
			},
			contatos: function(){
				this.$router.push({ path: `/administrador/verContatos` })
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
