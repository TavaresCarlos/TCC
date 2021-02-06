<template>
	<div id="verColaboracoes">
		<div class="row">
			<div class='col-4' v-for="colab in colaboracoes">
				<div class="card" id="cardContato">
					<ul class="list-group list-group-flush" id="cimaCard">
					    <li class="list-group-item"> COLABORAÇÃO {{ colab.idcontribuicao }} </li>
					    <li class="list-group-item"> {{ colab.titulo }} </li>
					    <li class="list-group-item"> {{ colab.to_char }} </li>
					    <li class="list-group-item"> {{ colab.nomecat }} </li>
					    <li class="list-group-item"> {{ colab.nomesubcat }} </li>
					    <li class="list-group-item"> {{ colab.tipogeometria }} </li>
					    <li class="list-group-item"> {{ colab.distanciaarea }} </li>
					    <li class="list-group-item"> {{ colab.descricao }} </li>
					    <li class="list-group-item"> Publicado: {{ colab.publicado }} </li>
					    <li class="list-group-item"> Gostaria de publicar ?  
					    	<div class="btn-group btn-group-toggle" data-toggle="buttons">
							  <label class="btn btn-success">
							    <input type="radio" name="sim" id="sim" value="sim" v-model="statusPublicacao" @change="alterarStatus(colab.idcontribuicao)" autocomplete="off"> Sim
							  </label>
							  <label class="btn btn-success">
							    <input type="radio" name="nao" id="nao" value="nao" v-model="statusPublicacao" @change="alterarStatus(colab.idcontribuicao)" autocomplete="off"> Não
							  </label>
							</div>
					    </li>
				  	</ul>
				</div>
				<br>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'

	export default{
		data(){
			return{
				statusPublicacao: '',
				colaboracoes:[]
			}
		},
		created(){
			axios.post('http://localhost:3000/verColaboracoes').then((response) => {
				//console.log(response);
                for(var i=0; i<response.data.length; i++){
                    this.colaboracoes.push(response.data[i]);
                }
            })
		},
		methods:{
			alterarStatus(idcontribuicao){
				/*console.log(this.statusPublicacao);
				console.log(titulo);*/
				axios.post('http://localhost:3000/alterarStatusColaboracao', { statusPublicacao: this.statusPublicacao, idcontribuicao: idcontribuicao }).then((response) => {
					this.$router.push({ path: `/administrador` })
				})
			}
		}
	}
</script>

<style>
#verColaboracoes{
	margin-left: 15%;
	/*margin-top: -27%;
	position: relative;
	overflow: hidden;*/
}
</style>
