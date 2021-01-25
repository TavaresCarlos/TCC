<template>
    <div class="row">
        <div class="col-xl-4 col-sm-2"></div>
            <div class="col-xl-4 col-sm-8">
                <div id="contato">
                    <div id="texto-contato"><center><h2>CONTATO</h2></center></div>
                    <label for="input">Nome:</label>
                        <input type="text" class="form-control" id="nome" name="nome" v-model="nome" placeholder="Nome" required>
                    <label for="input">Email:</label>
                        <input type="text" class="form-control" id="email" name="email" v-model="email" placeholder="Email" required>
                    <label for="input">Assunto:</label>
                        <input type="text" class="form-control" id="assunto" name="assunto" v-model="assunto" placeholder="Assunto" required>
                    <label for="input">Mensagem:</label>
                        <textarea class="form-control" id="mensagem" name="mensagem" rows="3" v-model="mensagem" placeholder="Mensagem" required></textarea>
                      <br>
                      <button type="submit" class="btn btn-success btn-lg btn-block" id="enviar" @click="novoContato()">ENVIAR</button>
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
                nome: '',
                email: '',
                assunto: '',
                mensagem: ''
            }
        },
        methods:{
            novoContato(){
                axios.post('http://localhost:3000/novoContato', { nome: this.nome, email: this.email, assunto: this.assunto, mensagem: this.mensagem }).then((response) => {
                    if(response.statusText == 'OK'){
                        this.$router.push('/');
                        alert("Mensagem enviada com sucesso");
                    }
                    else{
                        alert("Erro no envio da mensagem");
                    }
                })
            }
        }
	}
</script>

<style>
    #contato{
        color: #FFFFFF;
        margin-top: 18%;
    }
</style>
