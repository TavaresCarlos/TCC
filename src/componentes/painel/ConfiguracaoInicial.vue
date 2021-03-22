<template>
	<div class="row">
		<div class="col-12">
			<div id="configuracaoInicial">
				<form action="" method="">
					<label for="vencimentoBolsa">Nome do Sistema:</label>
        				<input type="text" class="form-control" id="nomeSistema" name="nomeSistema" v-model="nomeSistema" placeholder="" required>
		        			<div class="row">
		        				<div class="col-4">
			        				<label for="vencimentoBolsa">Latitude:</label>
			        					<input type="text" class="form-control" id="latitude" name="latitude" v-model="latitude" placeholder="" required>
			        			</div>
			        			<div class="col-4">
			        				<label for="vencimentoBolsa">Longitude:</label>
			        					<input type="text" class="form-control" id="longitude" name="longitude" v-model="longitude" placeholder="" required>
			        			</div>
			        			<div class="col-4">
			        				<label for="vencimentoBolsa">Zoom:</label>
			        					<input type="text" class="form-control" id="zoom" name="zoom" v-model="zoom" placeholder="" required>
			        			</div>
	        				</div>
	        			<label for="descricao">Descrição:</label>
    						<textarea class="form-control" id="descricao" name="descricao" v-model="descricao" rows="3"></textarea>
    					<br>
				</form>
				<div id="mapaConfiguracaoInicial"></div>
				<br>
				<button type="button" class="btn btn-success btn-lg" @click="salvarConf()">Enviar</button>
			</div>
	</div>
	</div>
</template>

<script>
	import axios from 'axios';

	export default{
		data(){
			return{
				mapa: '',
				nomeSistema: '',
				latitude: '',
				longitude: '',
				zoom: '',
				descricao: ''
			}
		},
		mounted(){
			this.mapa = L.map('mapaConfiguracaoInicial').setView([-19.53794677504797, -40.62796643556086], 4);
		
			const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { 
				attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(this.mapa);
	        const osm2 = L.tileLayer.wms('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors');
	        const world = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
				    maxZoom: 21,
				    subdomains:['mt0','mt1','mt2','mt3']
			});

			this.mapa.addEventListener('mousemove', () => {
				var lat = this.mapa.getCenter().lat;
            	var lng = this.mapa.getCenter().lng;
            	var zoom = this.mapa.getZoom();

	            //Pegamos os valores do mapa para fixarmos nas configurações do sistema
	            this.latitude = lat;
	            this.longitude = lng;
	            this.zoom = zoom;

	        });

		    //Agrupando camadas wms
	        var baseMaps = { 
	        	"OpenStreetMap": osm.addTo(this.mapa),
	        	"OSM 2": osm2,
	            "Satélite": world
	        };

	        var optionsControl = {
                collapsed: false
            };
            L.control.groupedLayers(baseMaps, null, optionsControl).addTo(this.mapa);
			L.control.scale({ metric: true }).addTo(this.mapa);
		},
		methods:{
			salvarConf(){
			 axios.post('http://localhost:3000/setConfInicial', { nomeSistema: this.nomeSistema, latitude: this.latitude, longitude: this.longitude, zoom: this.zoom, descricao: this.descricao }).then((response) => {
			 	console.log(response);
				if(response.data.length == 0){
                    this.$router.push('/root');
                    alert("Sistema configurado com sucesso");
                }
                else{
                    alert(response.data);
                }
			 });
			}
		}
	}
</script>

<style>
#tituloInicial{
	color: #FFFFFF;
	margin-left: 16%;
}
#descricao{
	color: #000000;
}
#configuracaoInicial{
	color: #FFFFFF;
	border: solid white 1px;
	padding: 10px 10px 10px 10px;
	width: 97%;
	margin-left: 3%;
}
#latitude, #longitude{
	width: 100%;
}
#mapaConfiguracaoInicial{
   	width: 100%;
	height: 43vh;
	margin-top: 0.5%;
}
</style>
