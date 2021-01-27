<template>
	<div id="contatos">
		<div class="row">
			<div class='col-4' v-for="c in contato">
				<div class="card" id="cardContato">
					<ul class="list-group list-group-flush" id="cimaCard">
					    <li class="list-group-item"> CONTATO {{ c.idcontato }} </li>
					    <li class="list-group-item"> {{ c.assunto }} </li>
					    <li class="list-group-item"> {{ c.nome }} </li>
					    <li class="list-group-item"> {{ c.to_char }} </li>
					    <li class="list-group-item"> {{ c.email }} </li>
					    <li class="list-group-item"> {{ c.mensagem }} </li>
					    <li class="list-group-item"> <a class="btn btn-success btn-sm btn-block" id="excluir" name="excluir" @click=""><span class="oi oi-plus"></span> Apagar contato</a></li>
				  	</ul>
				</div>
				<br>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios';

	export default{
		data(){
			return{
				contato:[]
			}
		},
		created(){
			axios.post('http://localhost:3000/getContatos').then((response) => {
				console.log(response);
                for(var i=0; i<response.data.length; i++){
                    this.contato.push(response.data[i]);
                }
            })
		}
	}
</script>

<style>
#contatos{
	margin-left: 3%;
	margin-top: 1%;
	width: 70%;
	font-size: 15px;
}
#cardContato{
	width: 18rem;
	border-radius: 20px;	
	height:98%;
}
#cimaCard{
	border-radius: 20px;
	overflow-x: hidden;
}

</style>
