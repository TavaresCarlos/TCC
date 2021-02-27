<template>
	<div id="adicionarCategorias">
        <input type="text" class="form-control" id="novaCategoria" name="novaCategoria" v-model="categoria" placeholder="Digite a nova categoria aqui" required>
        <br>
        <button class="btn btn-success btn-sm" type="submit" @click="salvarCategoria()">Salvar Categoria</button>
        <br>
        <br>
        <p id="contador">{{ this.numeroLinhas }} categorias adicionadas no sistema.</p>
	</div>
</template>

<script>
	import axios from 'axios';

	export default{
		data(){
			return{
				categoria: '',
				numeroLinhas: ''
			}
		},
		created: function(){
			axios.post('http://localhost:3000/contadorTabela', { nomeTabela: 'categorias' } ).then((response) => {
				console.log(response);
				this.numeroLinhas = response.data[0].count;
			});
		},
		methods:{
			salvarCategoria(){
				axios.post('http://localhost:3000/setCategoria', { categoria: this.categoria } ).then((response) => {
					if(response.data.length == 0){
                        this.$router.push('/administrador');
                        alert("Categoria cadastrada com sucesso");
                    }
                    else{
                        alert(response.data);
                    }
				});
			}
		}
	}
</script>

<style>
#adicionarCategorias{
	margin-left: 1%;
	margin-top: 1%;
	color: #FFFFFF;
}
#novaCategoria{
	width: 60%;
}
#contador{
	color: #FFFFFF;
}

</style>