<template>
	<div>
		<div id="mapa"></div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				mapa: '',
				tileLayer: '',
				baseLayer: [],
				overlayLayer: ''
			}
		},
		mounted(){
			this.mapa = L.map('mapa').setView([-19.53794677504797, -40.62796643556086], 13);
		
			this.tileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { 
				attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(this.mapa);

	        var osm = L.tileLayer.wms('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors');
	        var world = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
				    maxZoom: 21,
				    subdomains:['mt0','mt1','mt2','mt3']
				});

	          
		    this.baseLayers.push(osm);
		    this.baseLayers.push(world);

		    //Agrupando camadas wms
	        var baseMaps = { 
	        "OpenStreetMap": osm,
	            "Satélite": world
	        };
		}
	}
</script>

<style>

	body{
		padding: 0;
	    margin: 0;
	}
	html,
	body,
	#mapa{
	    width: 100%;
	   	height: 85vh;
	}
</style>
