<template>
	<div id="trocarSenha">
		TROCAR SENHA
	</div>
</template>

<script>
	import axios from 'axios'

	export default{
		mounted(){
			axios.post('http://localhost:3000/trocarSenha').then((response) => {
				console.log(response);
			})
		}
	}
</script>

<style>
#trocarSenha{
	margin-left: 3%;
}
</style>
