<h1>Framework para Sistemas VGI</h1>
<img src="apresentação-do-sistema/imagens/home.jpg" width="700" height="500">
<h2>Trabalho de conclusão de curso (TCC)</h2>

<p><strong>Português</strong></p>
<p>Esse projeto é de um framework inspirado no <a href="http://www.dpi.ufv.br/projetos/clickonmap/">ClickOnMap</a> para facilitar o desenvolvimento de sistemas que utilizam VGI como forma de obtenção de dados georreferenciados (que possuem latitude e longitude).</p> 
<p>O sistema permite o compartilhamento de informações por usuários, associando-as a pontos, linhas e polígonos traçados no mapa e permitindo a exportação dos dados no formato GeoJSON, permitindo assim o dimensionamento dos fatos observados e a comunicação do sistema com outros sistemas de informação geográfica.

<p><strong>English</strong></p>
<p>This project is a framework inspired on <a href="http://www.dpi.ufv.br/projetos/clickonmap/">ClickOnMap</a> for easily the systems development that used to VGI for get spatial data.</p>
<p>The framework permit to share the users informations associate with points, lines or polygons in the map and export the spatial data in geojson or csv formats, adding the facts dimensionality and the comunication from this systems to all others GIS.</p>

<h2>Tecnologias utilizadas:</h2>
-HTML5
<br>-CSS3
<br>-Javascript
<br>-Bootstrap
<br>-Leaflet
<br>-PostgreSQL 
<br>-Frontend: VUE
<br>-Backend: NodeJS (Express)
<h2>Funcionalidades iniciais:</h2>
<p>Na tela inicial do sistema, ficam disponíveis as seguintes funcionalidades iniciais:</p>
-Cadastro de novo usuário
<br>-Formulário para contato
<br>-Visualização das colaborações já realizadas e aprovadas
<br>-Exportação das colaborações nos formatos GeoJSON e CSV
<br>-Possibilidade de realizar a colaboração de forma anônima

<h2>Tipos de usuários e funcionalidades:</h2>
-Root (Super Usuário)
<br>
<img src="apresentação-do-sistema/imagens/root.jpg" width="700" height="500">
<br><br>-Administrador
<br>
<img src="apresentação-do-sistema/imagens/admin.jpg" width="700" height="500">
<br><br>-Anônimo
<br>
<img src="apresentação-do-sistema/imagens/anonimo.jpg" width="700" height="500">
<br><br>-Colaborador
<br>
<img src="apresentação-do-sistema/imagens/colaborador.jpg" width="700" height="500">

<h2>Rotas criadas:</h2>
-/home:
<br>/cadastroNovoUsuario:
<br>/novoContato:
<br>/login:
<br>/perfil: Retorna o nome, apelido, email, faixa etaria e tipo do usuário que está logado no sistema. 
<br>/trocarSenha:
<br>/setCategoria: Busca no banco de dados a categoria fornecida e caso ainda não esteja cadastrada no sistema, insere ela. 
<br>/getCategoria: Retorna todas as categorias inseridas. 
<br>/setSubcategoria: Busca no banco de dados a subcategoria fornecida e caso ainda não esteja cadastrada no sistema, insere ela. 
<br>/getSubcategoria: Retorna todas as subcategorias inseridas. 
<br>/setColaboracao: Insere no banco de dados a colaboração com todos os atributos informados pelo usuário e com o atributo publicado = "não".
<br>/getColaboracoes: Retorna todas as colaborações com o atributo publicado = "sim". 
<br>/exportar:
<br>/getContatos: Retorna os campos idcontato, nome, assunto, email, data e mensagem de todas as colaborações que foram realizadas para o sistema e com a propriedade publicado = "sim". 
<br>/alterarStatusColaboracao: Altera o status da colaboração para publicado = "sim", tornando-a visível na tela de "Colaborações". 
<br>/verColaboracoes:
<br>/setConfInicial:
<br>/setAdministradores:
<br>/getColaboradores:
<br>/apagarContato: Atualiza o status de um contato recebido como "publicado = não", mantendo assim a integridade do banco de dados.

<h2>Como usar:</h2>
<p>A aplicação trabalha com dois servidores: localhost:3000 (servidor Express) e localhost:8081 (servidor do VUE).</p>
<p>Além disso, é necessário criar o banco de dados PostgreSQL com o script da pasta "banco de dados/esquema.txt"</p>

<h2>Observação:</h2>
<p><strong>Português</strong></p>
<p>Cada categoria adicionada pelo usuário administrador deve conter pelo menos uma subcategoria cadastrada no sistema.</p>
<p>A inserção dos polígonos não respeita a Regra da Mão Direita.</p>
<p><strong>English</strong></p>
<p>Each category add by administrator user need a once subcategory add too in the system.</p>
<p>The polygon insertion don't follow the righ-hand rule.</p>

<h2>Instalação</h2>
<h3>Dependências</h3>
<p>npm install</p>
<h3>Executar servidor VUE</h3>
<p>npm run dev</p>
<h3>Executar servidor Express</h3>
<p>node app.js</p>
