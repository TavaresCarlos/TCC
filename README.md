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
<br>-CSS
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
<h2>Tipos de usuários:</h2>
-Root (Super Usuário)
<br>-Administrador
<br>-Anônimo
<br>-Colaborador
<h2>Rotas criadas:</h2>

<strong>/home:</strong>
<br><strong>/cadastroNovoUsuario:</strong>
<br><strong>/novoContato:</strong>
<br><strong>/login:</strong> 
<br><strong>/perfil:</strong> Retorna do banco de dados o nome, apelido, email, faixa etaria e tipo do usuário que está logado no sistema.
<br><strong>/trocarSenha:</strong>
<br><strong>/setCategoria:</strong> Busca no banco de dados a categoria fornecida e caso ainda não esteja cadastrada no sistema, insere ela.
<br><strong>/getCategoria:</strong> Retorna do banco de dados todas as categorias inseridas.
<br><strong>/setSubcategoria:</strong> Busca no banco de dados a subcategoria fornecida e caso ainda não esteja cadastrada no sistema, insere ela.
<br><strong>/getSubcategoria:</strong> Retorna do banco de dados todas as subcategorias inseridas.
<br><strong>/setColaboracao:</strong> Insere no banco de dados a colaboração com todos os atributos informados pelo usuário e com o atributo publicado = "não".
<br><strong>/getColaboracoes:</strong> Retorna todas as colaborações do banco de dados com o atributo publicado = "sim".
<br><strong>/exportar:</strong>  
<br><strong>/getContatos:</strong> Retorna os campos idcontato, nome, assunto, email, data e mensagem de todas as colaborações que foram realizadas para o sistema e com a propriedade publicado = "sim".
<br><strong>/alterarStatusColaboracao:</strong> Altera o status da colaboração para publicado = "sim", tornando-a visível na tela de "Colaborações".
<br><strong>/verColaboracoes:</strong>
<br><strong>/setConfInicial:</strong>
<br><strong>/setAdministradores:</strong>
<br><strong>/getColaboradores:</strong>
<br><strong>/apagarContato:</strong> Atualiza o status de um contato recebido como "publicado = não", mantendo assim ele ainda salvo no banco de dados como histórico para o sistema.
<h2>Como usar:</h2>
<p>Basta clonar o repositório do projeto em seu computador. Após isso, é necessário criar o banco de dados PostgreSQL, executando o script da pasta "banco-de-dados" e definir os parâmetros de conexão no arquivo "server/app.js".</p>

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
<h3>Executar aplicação no localhost:8080</h3>
<p>npm run dev</p>
