<template>
	<div id="addAdministradores">
		<label for="colaborador" class="form-label">Selecione o usuário abaixo:</label><br>
			<select v-model="administrador">
	            <option v-for="c in this.colaboradores">
	                {{ c }}
	            </option>
	        </select>
	    <br>
	    <br>
        <button class="btn btn-success btn-sm btn-block" type="submit" @click="salvarAdministrador()">Salvar Administrador</button>
	</div>
</template>

<script>
	import axios from 'axios'

	export default{
		data(){
			return{
				colaboradores: [],
				administrador: ''
			}
		},
		created: function(){
			axios.post('http://localhost:3000/getColaboradores').then((response) => {
				for(var i=0; i<response.data.length; i++){
                    this.colaboradores.push(response.data[i].nome);
                }
			})
		},
		methods:{
			salvarAdministrador(){
				axios.post('http://localhost:3000/setAdministradores', { administrador: this.administrador }).then((response) => {
					if(response.data.length == 0){
                        this.$router.push('/root');
                        alert("Novo administrador inserido com sucesso");
                    }
                    else{
                        alert(response.data);
                    }
				})
			}
		}
	}
</script>

<style>
#addAdministradores{
	margin-left: 3%;
	color: #FFFFFF;
}
</style>
