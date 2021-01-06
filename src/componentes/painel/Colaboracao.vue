<template>
	<div id="colaboracao">
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
            this.mapa.on('draw:created', function(e){ 
                var type = e.layerType;
                var layer = e.layer;

                if(type == 'polyline'){
                    var tipo = "LineString";
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
                    var tamanho = e.layer._latlngs.length;
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

                    var formulario = `<div id="formulario">
                                        <form action="" method="POST">
                                            Titulo da colaboração:
                                            <br> 
                                            <input type="text" id="titulo" name="titulo" placeholder="Titulo" required">
                                            <br>
                                            <br>
                                            <button onclick="selectCategoria();">Categoria:</button>
                                            <select id="categoria" name="categoria" onchange="selectSubcategoria()">
                                            </select>
                                            <br>
                                            Subcategoria:
                                            <br>
                                            <select id="subcategoria" name="subcategoria"></select>
                                            <br>
                                            Data da ocorrência:
                                            <br>
                                            <input type="date" id="data-ocorrencia" name="data-ocorrencia" required>
                                            <br>
                                            Tipo de geometria:
                                            <br>
                                            <input type="text" id="tipoGeometria" name="tipoGeometria" value="`+ tipo +`" readonly="readonly">
                                            <br>
                                            Distância atingida:
                                            <br>
                                            <input type="text" id="distanciaArea" name="distanciaArea" value="`+ distanciaTeste +`"> m
                                            <br>
                                            Descrição:
                                            <br>
                                            <textarea id="descricao" name="descricao" rows="4" cols="30" required></textarea>
                                            <br>
                                            <input type=hidden id="consulta" name="consulta" value=`+ formato_consulta +`>
                                            <br>
                                            <button type="submit">Enviar</button>
                                            </form>
                                          </div>
                                    `;
                    layer.bindPopup(formulario);
                }

                if(type == 'marker'){
                    var coord = layer.getLatLng();

                    var tipo = "Point";

                    //Monta a variável no formato da consulta de inserção no banco de dados
                    var formato_consulta = "["+ coord.lat + ","+ coord.lng + "]";
                                    
                    var informacoesConsulta = `<div id="informacoes">
                                                    form action="" method="POST">
                                                        <div id="formulario">
                                                         	Titulo da colaboração:
                                                            <br> 
                                                            <input type="text" id="titulo" name="titulo" placeholder="Titulo" required">
                                                            <br>
                                                            <br>
                                                            <button onclick="selectCategoria();">Categoria:</button>
                                                            <select id="categoria" name="categoria" onchange="selectSubcategoria()"></select>
                                                            <br>
                                                            Subcategoria
                                                            <br>
                                                            <select id="subcategoria" name="subcategoria"> </select>
                                                            <br>
                                                            Data da ocorrência:
                                                            <br>
                                                            <input type="date" id="data-ocorrencia" name="data-ocorrencia" required>
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
                                                            <input type=hidden id="distanciaArea" name="distanciaArea" value="0.0">
                                                            <button type="submit">Enviar</button>
                                                        </div>
                                                    </form>
                                                </div>
                                    			`;
                                    
                    layer.bindPopup(informacoesConsulta);
                }

                if(type == 'polygon'){
                    var tipo = "Polygon";
                    //Determina a quantidade de pontos que o usuário entrou
                    var quant_pontos = e.layer._latlngs[0].length;   

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
                    var area = L.GeometryUtil.geodesicArea(e.layer.getLatLngs()[0]);

                    var formulario = `<div id="formulario">
                                         	<form action="" method="POST">
                                            	Titulo da colaboração:
                                                <br> 
                                                <input type="text" id="titulo" name="titulo" placeholder="Titulo" required">
                                                <br>
                                                <br>
                                                <button onclick="selectCategoria();">Categoria:</button>
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
                                                <button type="submit">Enviar</button>
                                            </form>
                                        </div>
                                    `;
					layer.bindPopup(formulario);
                }

                drawnItems.addLayer(layer); //Define o desenho como uma camada
             });

            L.control.groupedLayers(baseMaps, null, optionsControl).addTo(this.mapa);
			//Barra de escala
			L.control.scale({ metric: true }).addTo(this.mapa);
		}
	}
</script>

<style>
	#colaboracao{
		margin-left: 1%;
		width: 87%;
	   	height: 90vh;
	   	margin-top: 0.5%;
	}
</style>
