<template>
	<div class="row">
        <div class="col-xl-4 col-sm-2"></div>
            <div class="col-xl-4 col-sm-8">
	            <div class="container" id="colaborar-deslogado">
            		<h3>Atenção</h3>
            		<p>Necessário estar logado(a) no sistema para isso. Por favor, escolha uma das opções abaixo:</p>
            		<button class="btn btn-success my-2 my-sm-0" type="button" @click="cadastro">Cadastro</button>
             		&nbsp &nbsp
            		<button class="btn btn-success my-2 my-sm-0" type="button" @click="">Anônimo</button> 
        		</div>
            </div>
        </div>     
    </section>
</template>

<script>
	export default{
		methods:{
			cadastro: function(){
				this.$router.push('/cadastro')
			}
		}
	}
</script>

<style>
	#colaborar-deslogado{
		margin-top: 35%;
	}
</style>

