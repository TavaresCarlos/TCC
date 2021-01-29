<template>
	<div class="row">
		<div class="col-12">
			<div id="titulo"><h1><center>CONFIGURAÇÕES DO FRAMEWORK</center></h1></div>
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
				<button type="button" class="btn btn-success btn-lg btn-block">Enviar</button>
			</div>
	</div>
	</div>
</template>

<script>
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
	            //document.getElementById('zoom-form').value = zoom;
	        });

	        console.log(this.latitude);

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
		}
	}
</script>

<style>
#titulo{
	color: #FFFFFF;

}
#configuracaoInicial{
	color: #FFFFFF;
	border: solid white 1px;
	padding: 10px 10px 10px 10px;
}
#latitude, #longitude{
	width: 100%;
}
#mapaConfiguracaoInicial{
	    width: 100%;
	   	height: 45vh;
	   	margin-top: 0.5%;
	}
</style>
