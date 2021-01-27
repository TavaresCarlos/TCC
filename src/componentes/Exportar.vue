<template>
	<div id="exportar">
		<p>Escolha o formato abaixo para exportar os dados:</p>
		<div class="btn-group btn-group-toggle" data-toggle="buttons">
		  <label class="btn btn-success">
		    <input type="radio" name="json" id="json" value="json" v-model="formato" @change="exportar" autocomplete="off"> JSON
		  </label>
		  <label class="btn btn-success">
		    <input type="radio" name="csv" id="csv" value="csv" v-model="formato" @change="exportar" autocomplete="off"> CSV
		  </label>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';

	export default{
		data(){
			return{
				formato: ''
			}
		},
		methods: {
			exportar(){
				axios.post('http://localhost:3000/exportar',{ formato: this.formato }/*, { responseType: 'blob'}*/).then((response) => {
					console.log(response);

					//console.log(response.replace('', ''));
	                /*if(response){
	                	console.log(response.data[0]);
	                	let blob = new Blob([response.data], { type: response.headers['content-type'] });
					    let link = document.createElement('a');
					    link.href = window.URL.createObjectURL(blob);
					    link.download = 'texto.json';
					    link.click();
	                }*/
	            })
			}
		}
	}
</script>

<style>
#exportar{
	color: #FFFFFF;
}
</style>