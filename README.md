<h1>Framework para Sistemas VGI</h1>
<img src="apresentação-do-sistema/imagens/home.jpg" width="700" height="500">
<h2>Trabalho de conclusão de curso (TCC)</h2>
<p>Framework inspirado no <a href="http://www.dpi.ufv.br/projetos/clickonmap/">ClickOnMap</a> para facilitar o desenvolvimento de sistemas que utilizam VGI.</p> 
<p>O sistema permite o compartilhamento de informações associados a pontos, linhas e polígonos traçados no mapa, gerado pela biblioteca gráfica Leaflet, e a exportação dos dados no formato GeoJSON, permitindo assim o dimensionamento dos fatos observados e a interoperabilidade do sistema com outros sistemas de informação geográfica (SIG) .
<h2>Tecnologias:</h2>
-HTML5
<br>-CSS3
<br>-Javascript
<br>-Bootstrap
<br>-Leaflet
<br>-PostgreSQL 
<br>
<br>-Frontend: VUE
<br>-Backend: NodeJS 
<h2>Tipos de usuários e funcionalidades:</h2>
-Default (Super Usuário)
<br>-Administrador
<br>-Anônimo
<br>-Colaborador
<h2>Como usar:</h2>
<p>Basta clonar o repositório do projeto em seu computador. Após isso, é necessário criar o banco de dados PostgreSQL, executando o script da pasta "banco-de-dados" e definir os parâmetros de conexão no arquivo "server/app.js".</p>
<h2>Observação:</h2>
<p>Cada categoria adicionada pelo usuário administrador deve conter pelo menos uma subcategoria cadastrada no sistema.</p>
<h2>Instalação</h2>
<h3>Dependências</h3>
<p>npm install</p>

<h3>Executar aplicação no localhost:8080</h3>
<p>npm run dev</p>
