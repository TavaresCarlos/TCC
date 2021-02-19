<template>
	<div id="exportar">
		Escolha o formato abaixo para exportar os dados:
		<br>
		<br>
		<div class="btn-group btn-group-toggle" data-toggle="buttons">
		  <label class="btn btn-success">
		    <input type="radio" name="geojson" id="geojson" value="geojson" v-model="formato" @click="exportar" autocomplete="off"> GeoJSON
		  </label>
		  <label class="btn btn-success">
		    <input type="radio" name="csv" id="csv" value="csv" v-model="formato" @click="exportar" autocomplete="off"> CSV
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

					if(this.formato == 'geojson'){
						var geojson_format = '{ "type": "FeatureCollection", "features":[';
						var count = 0;
						const size = response.data[0].json_agg.length;

						//The database return the geojson without parameter that define the multiple geometries in the same file. I need add the paramter with the "geojson_format" variable
						for(var i=0; i<size; i++){
							if(count == size-1){
								geojson_format  = geojson_format  + JSON.stringify(response.data[0].json_agg[i]);
							}
							else{
								geojson_format  = geojson_format  + JSON.stringify(response.data[0].json_agg[i]) + ',';
							}
							count++;
						}
						
						geojson_format = geojson_format + ']}';

						//Export "geojson_format" with file.json
	                	let blob = new Blob([geojson_format ], { type: response.headers['content-type'] });
					    let link = document.createElement('a');

					    link.href = window.URL.createObjectURL(blob);
					    link.download = 'colaboracoes.json';
					    link.click();
					}
					else if(this.formato == 'csv'){
						var csv_format = "Titulo; Categoria; Subcategoria; Data; Distancia ou Area; Descricao; Tipo de Geometria; Coordenadas";
						const size = response.data.length;

						for(var i=0; i<size; i++){
							csv_format = csv_format + '\n' + response.data[i].titulo + ';' + response.data[i].nomecat + ';' + response.data[i].nomesubcat + ';' + response.data[i].to_char + ';' + response.data[i].distanciaarea + ';' + response.data[i].descricao + ';' + response.data[i].tipogeometria + ';' + JSON.stringify(response.data[i].st_asgeojson.coordinates);
						}

						let blob = new Blob([csv_format], { type: response.headers['content-type'] });
					    let link = document.createElement('a');

					    link.href = window.URL.createObjectURL(blob);
					    link.download = 'colaboracoes.csv';
					    link.click();
					}
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