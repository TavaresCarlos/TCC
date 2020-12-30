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
		
			const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { 
				attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(this.mapa);
	        const osm2 = L.tileLayer.wms('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors');
	        const world = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
				    maxZoom: 21,
				    subdomains:['mt0','mt1','mt2','mt3']
				});

		    this.baseLayer.push(osm);
		    this.baseLayer.push(world);

		    //Agrupando camadas wms
	        var baseMaps = { 
	        	"OpenStreetMap": osm.addTo(this.mapa),
	        	"OSM 2": osm2,
	            "Satélite": world
	        };

	        /*var overlay = {
            	"Base Maps" : {
            		"OpenStreetMap": osm,
                	"Satélite": world
            	}
            };*/

	        var optionsControl = {
                collapsed: false
            };
            L.control.groupedLayers(baseMaps, null, optionsControl).addTo(this.mapa);
			//Barra de escala
			L.control.scale({ metric: true }).addTo(this.mapa);
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
