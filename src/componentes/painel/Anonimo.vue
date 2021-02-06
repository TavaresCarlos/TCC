<template>
	<div class="row">
		<div class="card" id="menu">
			<img class="card-img-top" src="src/img/avatar.jpg" alt="Card image cap">
				<div class="card-body">
					<h5 class="card-title"><center>Bem-Vindo</center></h5>
					<div id="painel">
						<a class="btn btn-success btn-sm btn-block" id="perfil" name="perfil" @click="colaboracao()"><span class="oi oi-plus"></span>Colaboração</a>
						<a class="btn btn-success btn-sm btn-block" id="perfil" name="perfil" @click="perfil()"><span class="oi oi-plus"></span> Ver Perfil</a>
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
				this.$router.push({ path: `/anonimo/perfil` })
			},
			colaboracao: function(){
				this.$router.push({ path: `/anonimo/colaboracao` })
			},
			sair: function(){
				this.$router.push({ path: `/` })
			}
		}
	}
</script>

<style>
.card-img-top{
	border: solid black 1px;
	border-radius: 200px;
}
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
