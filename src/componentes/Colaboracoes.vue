<template>
	<div id="mapa"></div>
</template>

<script>
	import axios from 'axios';

	export default{
		data: function(){
			return{
				latitude: '',
				longitude: '',
				zoom: '',
				mapa: '',
				tileLayer: '',
				baseLayer: [],
				overlayLayer: '',
				colaboracoes: [],
				titulo: '',
			}
		},
		created: function(){
			axios.post('http://localhost:3000/getColaboracoes').then((response) => {
            	console.log(response);

                for(var i=0; i<response.data.length; i++){
                	var geometria = JSON.parse(response.data[i].st_asgeojson);

                	if(geometria.type == "Point"){
                		L.marker(geometria.coordinates).addTo(this.mapa).bindPopup(`
	                		<strong>Titulo:</strong> ` + response.data[i].titulo + `
	                		<br><strong>Colaborador:</strong> ` + response.data[i].nome + `
	                		<br><strong>Categoria:</strong> ` + response.data[i].nomecat + `
	                		<br><strong>Subcategoria:</strong> ` + response.data[i].nomesubcat + `
	                		<br><strong>Tipo de geometria:</strong> ` + response.data[i].tipogeometria + `
	                		<br><strong>Distância (m) ou Área (m2):</strong> ` + response.data[i].distanciaarea + `
	                		<br><strong>Data:</strong> ` + response.data[i].to_char + `
	                		<br><strong>Descrição:</strong> ` + response.data[i].descricao + `
	                	`);
                	};

                	if(geometria.type == 'LineString'){
                		L.polyline(geometria.coordinates, {color: 'red'}).addTo(this.mapa).bindPopup(`
	                		<strong>Titulo:</strong> ` + response.data[i].titulo + `
	                		<br><strong>Colaborador:</strong> ` + response.data[i].nome + `
	                		<br><strong>Categoria:</strong> ` + response.data[i].nomecat + `
	                		<br><strong>Subcategoria:</strong> ` + response.data[i].nomesubcat + `
	                		<br><strong>Tipo de geometria:</strong> ` + response.data[i].tipogeometria + `
	                		<br><strong>Distância (m) ou Área (m2):</strong> ` + response.data[i].distanciaarea + `
	                		<br><strong>Data:</strong> ` + response.data[i].to_char + `
	                		<br><strong>Descrição:</strong> ` + response.data[i].descricao + `
	                	`);
                	};
                	
                	if(geometria.type == "Polygon"){
                		L.polygon(geometria.coordinates, {color: 'red'}).addTo(this.mapa).bindPopup(`
	                		<strong>Titulo:</strong> ` + response.data[i].titulo + `
	                		<br><strong>Colaborador:</strong> ` + response.data[i].nome + `
	                		<br><strong>Categoria:</strong> ` + response.data[i].nomecat + `
	                		<br><strong>Subcategoria:</strong> ` + response.data[i].nomesubcat + `
	                		<br><strong>Tipo de geometria:</strong> ` + response.data[i].tipogeometria + `
	                		<br><strong>Distância (m) ou Área (m2):</strong> ` + response.data[i].distanciaarea + `
	                		<br><strong>Data:</strong> ` + response.data[i].to_char + `
	                		<br><strong>Descrição:</strong> ` + response.data[i].descricao + `
	                	`);
                	};
                }
            });
		},
		mounted: function(){
			axios.post('http://localhost:3000/home').then((response) => {
				if(response.data.length > 0){
					this.mapa = L.map('mapa').setView([response.data[0].latitude, response.data[0].longitude], response.data[0].zoom);
					
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
			});
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
