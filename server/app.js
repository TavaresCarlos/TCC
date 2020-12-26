const http = require('http');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const postgresql = require('pg')

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

function executaSQLquery(query, res){
	var host = '';
	var port =  '';
	var user = '';
	var password = '';
	var database = '';
	
	var connection = `postgres://${username}:${password}@${host}/${database}`;

	pg.connect(connection, (error, results, fields) => {
		if(error){
			res.json(error);
		}
		else{
			res.json(results);
		}
	})
}

//Rotas
app.get('/', (req, res) => {
	res.json({ message: 'Funcionando' })
});

//Rodando o servidor
http.createServer(app).listen(port, () => {
	console.log("Servidor online");
})
