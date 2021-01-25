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
        <button class="btn btn-success btn-sm btn-block" type="submit" @click="salvarSubcategoria()">Salvar Subcategoria</button>
	</div>
</template>

<script>
	import axios from 'axios';

	export default{
		data(){
			return{
				categoria: [],
				categoriaSalvar: '',
				subcategoria: ''
			}
		},
		created: function(){
            axios.post('http://localhost:3000/getCategoria').then((response) => {
            	console.log(response);
                for(var i=0; i<response.data.length; i++){
                    this.categoria.push(response.data[i].nomecat);
                }
            })
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
	width: 450%;
}

</style>