<template>
	<div>
		<div id="mapa"></div>
	</div>
</template>

<script>
	import axios from 'axios';

	export default{
		data(){
			return{
				mapa: '',
				tileLayer: '',
				baseLayer: [],
				overlayLayer: '',
				colaboracoes: [],
				titulo: '',
			}
		},
		created(){
			axios.post('http://localhost:3000/getColaboracoes').then((response) => {
				console.log(response);
               
                for(var i=0; i<response.data.length; i++){
                	L.geoJSON(JSON.parse(response.data[i].st_asgeojson)).addTo(this.mapa).bindPopup(`
                		Titulo: ` + response.data[i].titulo + `
                		<br>Categoria: ` + response.data[i].idcategoria + `
                		<br>Subcategoria: ` + response.data[i].idsubcategoria + `
                		<br>Tipo de geometria: ` + response.data[i].tipogeometria + `
                		<br>Distância (m) ou Área (m2): ` + response.data[i].distanciaarea + `
                		<br>Data: ` + response.data[i].to_char + `
                		<br>Descrição: ` + response.data[i].descricao + `
                	`);
                }
            })
		},
		mounted(){
			this.mapa = L.map('mapa').setView([-19.53794677504797, -40.62796643556086], 4);
		
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

	        /*var geojson = [{"type":"Point","coordinates":[-19.53794677504797, -40.62796643556086]}];
	        L.geoJSON(geojson).addTo(this.mapa);*/

	       	//L.geoJSON(this.colaboracoes).addTo(this.mapa);

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
	   	height: 90vh;
	   	margin-top: 0.5%;
	}
</style>
