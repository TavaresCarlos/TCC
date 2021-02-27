<template>
	<div id="adicionarSubcategorias">
		<label for="categoria" class="form-label">Selecione a categoria:</label><br>
			<select v-model="categoriaSalvar">
	            <option v-for="cat in this.categoria">
	                {{ cat }}
	            </option>
	        </select>
	    <br><br>
        <input type="text" class="form-control" id="novasubcategoria" name="novaSubcategoria" v-model="subcategoria" placeholder="Digite a nova subcategoria aqui" required>
        <br>
        <button class="btn btn-success btn-sm" type="submit" @click="salvarSubcategoria()">Salvar Subcategoria</button>
        <br>
        <br>
        <p id="contador">{{ this.numeroLinhas }} subcategorias adicionadas no sistema.</p>
	</div>
</template>

<script>
	import axios from 'axios';

	export default{
		data(){
			return{
				categoria: [],
				categoriaSalvar: '',
				subcategoria: '',
				numeroLinhas: ''
			}
		},
		created: function(){
            axios.post('http://localhost:3000/getCategoria').then((response) => {
            	console.log(response);
                for(var i=0; i<response.data.length; i++){
                    this.categoria.push(response.data[i].nomecat);
                }
            });
            axios.post('http://localhost:3000/contadorTabela', { nomeTabela: 'subcategorias' } ).then((response) => {
				console.log(response);
				this.numeroLinhas = response.data[0].count;
			});
        },
		methods:{
			salvarSubcategoria(){
				axios.post('http://localhost:3000/setSubcategoria', { subcategoria: this.subcategoria, categoria: this.categoriaSalvar }).then((response) => {
					if(response.data.length == 0){
                        this.$router.push('/administrador');
                        alert("Subcategoria cadastrada com sucesso");
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
#adicionarSubcategorias{
	margin-left: 1%;
	margin-top: 1%;
	color: #FFFFFF;
}
#novasubcategoria{
	width: 60%;
}

</style>