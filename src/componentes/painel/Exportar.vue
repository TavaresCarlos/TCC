<template>
	<div id="exportar">
		<p id="textoHeader">Defina as configurações abaixo para exportação das colaborações:</p>
		<label for="categoria" class="form-label">Selecione a categoria:</label><br>
			<select v-model="categoriaSalvar" @change="selecionarSubcategorias">
	            <option v-for="cat in this.categoria">
	                {{ cat }}
	            </option>
	        </select>
		<br>
		<br>
		<label for="subcategoria" class="form-label">Subcategoria</label><br>
            <select v-model="subcategoriaSalvar">
                <option v-for="subcat in this.subcategoria">
                    {{ subcat }}
                </option>
            </select>
		<br>
		<br>
		<div class="row">
			<label for="período" class="form-label">&nbsp&nbsp&nbsp Período: De &nbsp&nbsp&nbsp</label>
			<input type="date" class="form-control" id="dataInicio" name="dataInicio" v-model="dataInicio" placeholder="">
			&nbsp&nbsp&nbsp
			Até
			&nbsp&nbsp&nbsp
			<input type="date" class="form-control" id="dataFim"" name="dataFim" v-model="dataFim" placeholder="">
		</div>
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
				categoria: [],
				categoriaSalvar: '',
				subcategoria: [],
				subcategoriaSalvar: '',
				dataInicio: '',
				dataFim: '',
				formato: ''
			}
		},
		created:function(){
			axios.post('http://localhost:3000/getCategoria').then((response) => {
            	console.log(response);
                for(var i=0; i<response.data.length; i++){
                    this.categoria.push(response.data[i].nomecat);
                }
            });
		},
		methods: {
			selecionarSubcategorias: function(){
                axios.post('http://localhost:3000/getSubcategoria',  { categoria: this.categoriaSalvar }).then((response) => {
                    console.log(typeof(response.data));
                    if(response.data.length != 0){
                    	this.subcategoria = [];
                        for(var i=0; i<response.data.length; i++){
                            this.subcategoria.push(response.data[i].nomesubcat);
                        }
                    }
                    else if(response.data.length == 0){
                        this.subcategoria = [];
                    }
                })
            },
			exportar(){
				axios.post('http://localhost:3000/exportar',{ formato: this.formato, categoria: this.categoriaSalvar, subcategoria: this.subcategoriaSalvar, dataInicio: this.dataInicio, dataFim: this.dataFim }).then((response) => {

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
#exportar, #textoHeader{
	color: #FFFFFF;
}
#dataInicio, #dataFim{
	width: 15%;
}
</style>