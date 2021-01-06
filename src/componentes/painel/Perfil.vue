<template>
	<div id="perfil">
		PERFIL
	</div>
</template>

<script>
	import axios from 'axios'

	export default{
		mounted(){
			axios.post('http://localhost:3000/perfil').then((response) => {
				console.log(response);
			})
		}
	}
</script>

<style>
#perfil{
	margin-left: 3%;
}
</style>
