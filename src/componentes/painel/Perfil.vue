<template>
	<div id="perfil">
		<div class="card w-50">
			<div class="card-body">
				<h5 class="card-title"> {{ this.nome }} </h5>
				<p class="card-text"> {{ this.apelido }} </p>
				<p class="card-text"> {{ this.faixaetaria }} </p>
				<p class="card-text"> {{ this.email }} </p>
				<p class="card-text"> {{ this.tipo }} </p>
				<a href="#" class="btn btn-primary">Alterar informações</a>
		</div>
</div>
	</div>
</template>

<script>
	import axios from 'axios'

	export default{
		data(){
			return{
				nome: '',
				email: '',
				apelido: '',
				faixaetaria: '',
				tipo: ''
			}
		},
		mounted(){
			axios.post('http://localhost:3000/perfil').then((response) => {
				this.nome = response.data[0].nome;
				this.apelido = response.data[0].apelido;
				this.email = response.data[0].email;
				this.faixaetaria = response.data[0].faixaetaria;
				this.tipo = response.data[0].tipo;
			})
		}
	}
</script>

<style>
#perfil{
	margin-left: 1.5%;
}
</style>
