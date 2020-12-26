<template>
    <div class="row">
        <div class="col-xl-4 col-sm-2"></div>
            <div class="col-xl-4 col-sm-8">
                <form action="" method="POST" id="formulario-contato">
                    <div id="texto-contato"><h2>CONTATO</h2></div>
                    <label for="input">Nome:</label>
                        <input type="text" class="form-control" id="nome" name="nome" placeholder="Nome" required>
                    <label for="input">Email:</label>
                        <input type="text" class="form-control" id="email" name="email" placeholder="Email" required>
                    <label for="input">Assunto:</label>
                        <input type="text" class="form-control" id="assunto" name="assunto" placeholder="Assunto" required>
                    <label for="input">Mensagem:</label>
                        <textarea class="form-control" id="mensagem" name="mensagem" rows="3" placeholder="Mensagem" required></textarea>
                      <br>
                      <button type="submit" class="btn btn-primary btn-lg btn-block" id="enviar">ENVIAR</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
	export default{

	}
</script>

