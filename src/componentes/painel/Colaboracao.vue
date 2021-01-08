<template>
	<div id="colaboracao">
		<div id="mapa"></div>


		<div id="mymodal" class="modal fade" tabindex="-1" role="dialog">
		    <div class="modal-dialog">
		        <div class="modal-content">
		         	<div class="modal-header">
		            	<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
		            		<h4 class="modal-title">Modal title</h4>
		          	</div>
			        <div class="modal-body">
			            <p>One fine body&hellip;</p>
			        </div>
			        <div class="modal-footer">
			        	<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			            <button type="button" class="btn btn-primary">Confirm</button>
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
                subcategoria: '',
                distanciaArea: '',
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
                    const tipo = "LineString";
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

                    //Alterar o formato_consulta para o do Leaflet (faciliar e muito na hora de plotar nele)

                    //Monta a variável no formato da consulta de inserção no banco de dados
                    //var formato_consulta = "'" + tipo + "("+ latLng + ")'";
                    var formato_consulta = "[" + latLng + "]";

                    formulario = `<div id="formulario">
                                    `+this.categoria+`
                                  </div>`;

                    layer.bindPopup(formulario);

                }

                if(type == 'marker'){
                    var coord = layer.getLatLng();

                    var tipo = "Point";

                    //Monta a variável no formato da consulta de inserção no banco de dados
                    var formato_consulta = "["+ coord.lat + ","+ coord.lng + "]";
                                    
                    var informacoesConsulta = `<div id="informacoes">
                                                        <div id="formulario">
                                                         	Titulo da colaboração:
                                                            <br> 
                                                            <input type="text" id="titulo" name="titulo" v-model="titulo" placeholder="Titulo" required">
                                                            <br>
                                                            <br>
                                                            <button @click="selectCategoria" id="botao-categoria">Categoria:</button>
                                                            <select id="categoria" name="categoria" v-model="categoria" onchange="selectSubcategoria()"></select>
                                                            <br>
                                                            Subcategoria
                                                            <br>
                                                            <select id="subcategoria" name="subcategoria" v-model="subcategoria"> </select>
                                                            <br>
                                                            Data da ocorrência:
                                                            <br>
                                                            <input type="date" id="data-ocorrencia" name="data-ocorrencia" v-model="dataOcorrencia" required>
                                                            <br>            
                                                            Tipo de geometria:
                                                            <br>
                                                            <input type="text" id="tipoGeometria" name="tipoGeometria" v-model="tipoGeometria" value="`+ tipo +`" readonly="readonly">
                                                            <br>
                                                            Descrição:
                                                            <br>
                                                            <textarea id="descricao" name="descricao" rows="4" cols="30" v-model="descricao" required></textarea>
                                                            <br>
                                                            <input type=hidden id="consulta" name="consulta" value=`+ formato_consulta +`>
                                                            <br>
                                                            <input type=hidden id="distanciaArea" name="distanciaArea" value="0.0">
                                                            <button type="submit" id="enviar">Enviar</button>
                                                        </div>
                                                </div>
                                    			`;
                                    
                    layer.bindPopup(informacoesConsulta);
                }

                if(type == 'polygon'){
                    const tipo = "Polygon";
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

                    var formulario = `<div id="formulario">
                                         	
                                            	Titulo da colaboração:
                                                <br> 
                                                <input type="text" id="titulo" name="titulo" placeholder="Titulo" required">
                                                <br>
                                                <br>
                                                <button type="submit" @click="selectCategoria()" id="botao-categoria">Categoria:</button>
                                                <select id="categoria" name="categoria" onchange="selectSubcategoria()"></select>
                                                <br>
                                                Subcategoria:
                                                <br>
                                                <select id="subcategoria" name="subcategoria"></select>
                                                <br>
                                                Data da ocorrência:
                                                <br>
                                                <input type="date" id="data-ocorrencia" name="data-ocorrencia" required>
                                                <br>
                                                Área atingida:
                                                <br>
                                                <input type="text" id="distanciaArea" name="distanciaArea" value="`+ area.toFixed(2) +`">  m2
                                                <br>
                                                Tipo de geometria:
                                                <br>
                                                <input type="text" id="tipoGeometria" name="tipoGeometria" value="`+ tipo +`" readonly="readonly">
                                                <br>
                                                Descrição:
                                                <br>
                                                <textarea id="descricao" name="descricao" rows="4" cols="30" required></textarea>
                                                <br>
                                                <input type=hidden id="consulta" name="consulta" value=`+ formato_consulta +`>
                                                <br>
                                                <button type="submit" id="enviar">Enviar</button>
                                           
                                        </div>
                                    `;

					layer.bindPopup(formulario);
                }

                drawnItems.addLayer(layer); //Define o desenho como uma camada
             });

            L.control.groupedLayers(baseMaps, null, optionsControl).addTo(this.mapa);
			//Barra de escala
			L.control.scale({ metric: true }).addTo(this.mapa);
		},
        methods:{
            formularioColaboracao: function(){
            	
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
