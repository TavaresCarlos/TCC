<template>
	<div id="exportar">
		<p>Escolha o formato abaixo para exportar os dados:</p>
		<div class="btn-group btn-group-toggle" data-toggle="buttons">
		  <label class="btn btn-success">
		    <input type="radio" name="json" id="json" value="json" v-model="formato" @change="exportar" autocomplete="off"> GeoJSON
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
				axios.post('http://localhost:3000/exportar',{ formato: this.formato }).then((response) => {
					var formato_geojson = '{ "type": "FeatureCollection", "features":[';
					var contador = 0;
					const tamanho = response.data[0].json_agg.length;

					for(var i=0; i<tamanho; i++){
						if(contador == tamanho-1){
							formato_geojson = formato_geojson + JSON.stringify(response.data[0].json_agg[i]);
						}
						else{
							formato_geojson = formato_geojson + JSON.stringify(response.data[0].json_agg[i]) + ',';
						}
						contador++;
					}
					
					formato_geojson = formato_geojson + ']}';

                	let blob = new Blob([formato_geojson], { type: response.headers['content-type'] });
				    let link = document.createElement('a');

				    console.log(link);

				    link.href = window.URL.createObjectURL(blob);
				    link.download = 'colaboracoes.json';
				    link.click();
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