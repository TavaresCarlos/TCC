<template>
	<div class="row">
		<div class="col-12">
			<div id="titulo"><h1><center>CONFIGURAÇÕES DO FRAMEWORK</center></h1></div>
			<div id="configuracaoInicial">
				<form action="" method="">
					<label for="vencimentoBolsa">Nome do Sistema:</label>
        				<input type="text" class="form-control" id="nomeSistema" name="nomeSistema" v-model="nomeSistema" placeholder="" required>
		        			<div class="row">
		        				<div class="col-6">
			        				<label for="vencimentoBolsa">Latitude:</label>
			        					<input type="text" class="form-control" id="latitude" name="latitude" v-model="latitude" placeholder="" required>
			        			</div>
			        			<div class="col-6">
			        				<label for="vencimentoBolsa">Longitude:</label>
			        					<input type="text" class="form-control" id="longitude" name="longitude" v-model="longitude" placeholder="" required>
			        			</div>
	        				</div>
	        			<label for="descricao">Descrição:</label>
    						<textarea class="form-control" id="descricao" name="descricao" v-model="descricao" rows="3"></textarea>
    					<br>
    					<button type="button" class="btn btn-success btn-lg btn-block">Enviar</button>
				</form>
				<div id="mapaConfiguracaoInicial"></div>
			</div>
	</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				nomeSistema: '',
				latitude: '',
				longitude: '',
				descricao: ''
			}
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
</style>
