<template>
	<div class="wrapper">
	    <nav id="sidebar">
	        <div class="sidebar-header">
	            <img class="card-img-top" id="img-perfil" src="src/img/avatar.jpg" alt="Card image cap">
	        </div>

	        <ul class="list-unstyled components">
	            <p>Seja Bem-Vindo</p>
	            <li>
	                <a @click="configuracaoSistema">Configurar Sistema</a>
	            </li>
	            <li>
	                <a @click="addAdministradores">Adicionar Moderadores</a>
	            </li>
	            </li>
	            <li>
	                <a @click="sair">Sair</a>
	            </li>
	        </ul>
	    </nav>
	    <div id="content">
		    <nav class="navbar navbar-expand-lg navbar-light">
		        <div class="container-fluid">

		            <button type="button" id="sidebarCollapse" class="btn btn-primary">
		                <i class="fas fa-align-left"></i>
		                <span>Menu</span>
		            </button>

		        </div>

		    </nav>

		    <div id="conteudo">
		    	<router-view></router-view>
		    </div>

		</div>
	</div>
</template>

<script>
	export default{
		created(){
			$(document).ready(function () {
			    $('#sidebarCollapse').on('click', function () {
			        $('#sidebar').toggleClass('active');
			    });
			})
		},
		methods:{
			configuracaoSistema: function(){
				this.$router.push({ path: `/root/ConfiguracaoInicial` })
			},
			addAdministradores: function(){
				this.$router.push({ path: `/root/AddAdministradores` })
			},
			sair: function(){
				this.$router.push({ path: `/` })
			}
		}
	}
</script>

<style>
#conteudo{
	margin-left: 1%;
	width: 96vw;
}

#img-perfil{
	border: solid black 1px;
	border-radius: 200px;
}

.wrapper {
    display: flex;
    width: 100%;
    align-items: stretch;
}
#sidebar {
    min-width: 250px;
    max-width: 250px;
    min-height: 96vh;
}

#sidebar.active {
    margin-left: -250px;
}
a[data-toggle="collapse"] {
    position: relative;
}
.dropdown-toggle::after {
    display: block;
    position: absolute;
    top: 50%;
    right: 20px;
    transform: translateY(-50%);
}
@media (max-width: 768px) {
    #sidebar {
        margin-left: -250px;
    }
    #sidebar.active {
        margin-left: 0;
    }
}
@import "https://fonts.googleapis.com/css?family=Poppins:300,400,500,600,700";


body {
    font-family: 'Poppins', sans-serif;
}

p {
    font-family: 'Poppins', sans-serif;
    font-size: 1.1em;
    font-weight: 300;
    line-height: 1.7em;
    color: #999;
}

a, a:hover, a:focus {
    color: inherit;
    text-decoration: none;
    transition: all 0.3s;
}

#sidebar {
    /* don't forget to add all the previously mentioned styles here too */
    background: #315478;
    color: #fff;
    transition: all 0.3s;
}

#sidebar .sidebar-header {
    padding: 20px;
    background: #315478;
}

#sidebar ul.components {
    padding: 20px 0;
    border-bottom: 1px solid #47748b;
}

#sidebar ul p {
    color: #fff;
    padding: 10px;
}

#sidebar ul li a {
    padding: 10px;
    font-size: 1.1em;
    display: block;
}
#sidebar ul li a:hover {
    color: #000000;
    background: #fff;
}

#sidebar ul li.active > a, a[aria-expanded="true"] {
    color: #fff;
    background: #6d7fcc;
}
ul ul a {
    font-size: 0.9em !important;
    padding-left: 30px !important;
    background: #6d7fcc;
}
</style>
