<template>
	<div id="colaboracao">
		<div id="mapa"></div>


		<div id="mymodal" class="modal fade" tabindex="-1" role="dialog">
		    <div class="modal-dialog">
		        <div class="modal-content">
		         	<div class="modal-header">
		            	<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		          	</div>
			        <div class="modal-body">
                        <div id="formulario">
                            <label for="titulo" class="form-label">Titulo</label>
                                <input type="text" class="form-control" id="titulo" name="titulo" v-model="titulo" placeholder="Titulo">
                            <label for="categoria" class="form-label">Categoria</label><br>
                                <select v-model="categoriaSalvar" @change="selecionarSubcategorias">
                                    <option v-for="cat in this.categoria">
                                        {{ cat }}
                                    </option>
                                </select>
                            <br>
                            <label for="subcategoria" class="form-label">Subcategoria</label><br>
                                <select v-model="subcategoriaSalvar">
                                    <option v-for="subcat in this.subcategoria">
                                        {{ subcat }}
                                    </option>
                                </select>
                                <br>
                            <label for="distanciaArea" class="form-label">Distância ou Área</label>
                                <input type="text" class="form-control" id="distanciaArea" name="distanciaArea" v-model="this.distanciaArea">
                            <label for="dataOcorrencia" class="form-label">Data</label>
                                <input type="date" class="form-control" id="dataOcorrencia"" name="dataOcorrencia" v-model="dataOcorrencia" placeholder="">
                            <label for="tipoGeometria" class="form-label">Tipo de Geometria</label>
                                <input type="text" class="form-control" id="tipoGeometria" name="tipoGeometria" v-model="this.tipoGeometria">
                            <label for="descricao" class="form-label">Descrição</label>
                                <textarea class="form-control" id="descricao" name="descricao" v-model="descricao" rows="3"></textarea>
                            <br>
                            <button class="btn btn-success btn-sm btn-block" type="submit" @click="enviar">Enviar</button>
                        </div>
			        </div>
		    	</div>
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
				tileLayer: '',
				baseLayer: [],
				overlayLayer: '',
                titulo: '',
                categoria: [],
                categoriaSalvar: '',
                subcategoria: [],
                subcategoriaSalvar: '',
                distanciaArea: 0,
                dataOcorrencia: '',
                tipoGeometria: '',
                descricao: ''
			}
		},
        created: function(){
            axios.post('http://localhost:3000/getCategoria').then((response) => {
                for(var i=0; i<response.data.length; i++){
                    this.categoria.push(response.data[i].nome);
                }
            })
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

	        var overlay = {
            	"Base Maps" : {
            		"OpenStreetMap": osm,
                	"Satélite": world
            	}
            };

	        var optionsControl = {
                collapsed: false
            };

            //Ferramentas
            var drawnItems = new L.FeatureGroup();
		    this.mapa.addLayer(drawnItems);

		    L.drawLocal.draw.toolbar.buttons.polyline = 'Polyline';
            L.drawLocal.draw.toolbar.buttons.marker = 'Marker';
            L.drawLocal.draw.toolbar.buttons.polygon = 'Polygon';

		    var drawControl = new L.Control.Draw({
		        position: 'topleft',
                draw:{
                    polyline: {
                        metric: true,
                        showLength: true
                    },        
                    polygon:{
                        metric: ['km', 'm'],
                        feet: false,
                        nautic: false,
                        showLength: true,
                        showArea: true,
                        allowIntersection: false,
                        precision:{km: 2}
                    },
                    circle: false,
                    rectangle: false,
					marker: true
                },
                edit:{
                    featureGroup: drawnItems,
                    remove: true
                }
		    });
		    this.mapa.addControl(drawControl);

			//Texto mostrado quando o usuário clica na geometria desenhada
            this.mapa.on('draw:created', (e) => { 
                var type = e.layerType;
                var layer = e.layer;

                $('#mymodal').modal('show');

                if(type == 'polyline'){
                    var latLng = "";
                                    
                    //Definindo o formato da entrada tipo linestring                
                    for(var i=0; i<layer._latlngs.length; i++){
                        latLng = latLng + "[" + layer._latlngs[i].lat + "," +layer._latlngs[i].lng + "]";
                                        
                        if(i != layer._latlngs.length-1){
                            latLng = latLng + ","
                        }
                    }

                    //Distância de exemplo
                    var distanciaTeste = 0;
                        
                    //Calculando na mão o tamanho em 'm' da polyline com base no algoritmo de geodésia (https://www.mapanet.eu/PT/resources/Script-Distance.htm)
                    const tamanho = e.layer._latlngs.length;
                    for(var i=0; i<tamanho; i++){
                        if((i+1) < tamanho){
	                        var lat1 = e.layer._latlngs[i].lat;
	                        var lat2 = e.layer._latlngs[i+1].lat;

	                        var long1 =  e.layer._latlngs[i].lng;
	                        var long2 = e.layer._latlngs[i+1].lng;

	                        const r = 6378.137;

	                        var dLat = ((lat2 - lat1)*Math.PI/180);
	              			var dLong = ((long2 - long1)*Math.PI/180);

	                        var a = Math.sin(dLat/2) * Math.sin(dLat/2) + Math.cos(lat1*Math.PI/180) * Math.cos(lat2*Math.PI/180) * Math.sin(dLong/2) * Math.sin(dLong/2);
	                        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
	                                            
	                        distanciaTeste = distanciaTeste + c*r;
                    	}
                	}
                                    
                    //Passando a distância de 'km' para 'm'
                    distanciaTeste = (distanciaTeste*1000).toFixed(2);

                    this.distanciaArea = distanciaTeste;
                    this.tipoGeometria = "LineString";

                    //Alterar o formato_consulta para o do Leaflet (faciliar e muito na hora de plotar nele)

                    //Monta a variável no formato da consulta de inserção no banco de dados
                    //var formato_consulta = "'" + tipo + "("+ latLng + ")'";
                    var formato_consulta = "[" + latLng + "]";

                }

                if(type == 'marker'){
                    var coord = layer.getLatLng();

                    this.distanciaArea = 0;
                    this.tipoGeometria = "Point";

                    //Monta a variável no formato da consulta de inserção no banco de dados
                    var formato_consulta = "["+ coord.lat + ","+ coord.lng + "]";        
                }

                if(type == 'polygon'){
                    //Determina a quantidade de pontos que o usuário entrou
                    const quant_pontos = e.layer._latlngs[0].length;   

                    var latLng = "";
                    var primeiro_ponto = "";
                                    
                    //Definindo o formato da entrada tipo linestring                
                    for(var i=0; i<quant_pontos; i++){
                        latLng = latLng + "[" + layer._latlngs[0][i].lat + "," + layer._latlngs[0][i].lng + "]";
                                        
                        //Pega o primeiro ponto do polígono
                        if(i == 0){
                            primeiro_ponto = latLng;
                        }
                                        
                        //Acrescenta ',' após cada ponto do polígono de entrada
                        if(i != layer._latlngs[0].length-1){
                            latLng = latLng + ",";
                        }

                        if(i == layer._latlngs[0].length-1){
                            latLng = latLng + "," + primeiro_ponto;
                        }
                    }

                    //Monta a variável no formato da consulta de inserção no banco de dados
                    var formato_consulta = "[[" + latLng + "]]"    

                    //Obtendo a area em m2
                    const area = L.GeometryUtil.geodesicArea(e.layer.getLatLngs()[0]);
                    this.distanciaArea = area.toFixed(2);
                    this.tipoGeometria = "Polygon";
                }

                drawnItems.addLayer(layer); //Define o desenho como uma camada
             });

            L.control.groupedLayers(baseMaps, null, optionsControl).addTo(this.mapa);
			//Barra de escala
			L.control.scale({ metric: true }).addTo(this.mapa);
		},
        methods:{
            selecionarSubcategorias: function(){
                axios.post('http://localhost:3000/getSubcategoria',  { categoria: this.categoriaSalvar }).then((response) => {
                    console.log(typeof(response.data));
                    if(response.data.length != 0){
                        for(var i=0; i<response.data.length; i++){
                            this.subcategoria.push(response.data[i].nome);
                        }
                    }
                    else if(response.data.length == 0){
                        this.subcategoria = [];
                    }
                })
            },
            enviar: function(){
                console.log(this.titulo);
                console.log(this.categoriaSalvar);
                console.log(this.subcategoriaSalvar);
                console.log(this.distanciaArea);
                console.log(this.dataOcorrencia);
                console.log(this.tipoGeometria);
                console.log(this.descricao);
            }
		}
	}
</script>

<style>
	#colaboracao{
		margin-left: 1%;
		width: 85%;
	   	height: 90vh;
	   	margin-top: 0.5%;
	}
	#formulario{
		/*border: 1px solid black;*/
		color: #274360;
	}
	#titulo, #categoria, #subcategoria, #data-ocorrencia, #distanciaArea, #tipoGeometria, #descricao, #botao-categoria, #enviar{
		border-radius: 5px;
		border: 1px solid #274360;
	}
</style>
