<template>
    <div class="row">
        <div class="col-xl-4 col-sm-2"></div>
            <div class="col-xl-4 col-sm-8">
                <form action="" method="POST" id="formulario-cadastro">
                    <div id="texto-cadastro"><h3>CADASTRO</h3></div>
                    <label for="input">Nome:</label>
                        <input type="text" class="form-control" id="nome" name="nome" placeholder="Nome" required>
                    <label for="input">Apelido:</label>
                        <input type="text" class="form-control" id="apelido" name="apelido" placeholder="Apelido" required>
                    <label for="input">Faixa etária:</label>
                      	<select class="form-control form-control-sm" id="faixaEtaria" name="faixaEtaria">
            		        <option value="null">----</option>
            		        <option value="10-14">10 a 14</option>
            		        <option value="15-19">15 a 19</option>
            		        <option value="20-24">20 a 24</option>
            		        <option value="25-29">25 a 29</option>
            		        <option value="30-34">30 a 34</option>
            		        <option value="35-39">35 a 39</option>
            		        <option value="40-44">40 a 44</option>
            		        <option value="45-49">45 a 49</option>
            		        <option value="50-54">50 a 54</option>
            		        <option value="55-59">55 a 59</option>
            		        <option value="60-64">60 a 64</option>
            		        <option value="65-69">65 a 69</option>
            		        <option value="70-74">70 a 74</option>
            		        <option value="75-79">75 a 79</option>
            		        <option value="80-mais">80 anos ou mais</option>
            		    </select>
                    <label for="input">Email:</label>
                        <input type="text" class="form-control" id="email" name="email" placeholder="Email" required>
                    <label for="input">Senha:</label>
                        <input type="password" class="form-control" id="senha" name="senha" placeholder="Senha" required>
                    <br>
                    <button type="submit" class="btn btn-primary btn-lg btn-block">CADASTRAR</button>
                </form>
            </div>
        <div class="col-xl-4 col-sm-2"></div>
    </div>
</template>

<script>
	export default{

	}
</script>

