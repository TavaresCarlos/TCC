const http = require('http');
const cors = require('cors');
const bcrypt = require('bcrypt');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const Pool = require('pg').Pool;

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(session({ secret: 'secret', resave: true, saveUninitialized: true }))

const pool = new Pool({
	user: 'postgres',
	host: 'localhost',
	database: 'tcc',
	password: 'admin',
	port: 5432,
});

function executaSql(sql, res) {
	pool.query(sql, (error, results) => {
		if(error){
			res.json(error);
		}
		else{
			res.json(results.rows);
		}
	})
}

//Rotas
app.get('/', (req, res) => {
	//res.json({ message: 'Funcionando' })
	executaSql('SELECT * FROM contato', res);
});

app.post('/cadastroNovoUsuario', (req, res) => {
	console.log("Rota chamada");

	const nome = req.body.nome;
	const apelido = req.body.apelido;
	const faixaEtaria = req.body.faixaEtaria;
	const email = req.body.email;
	const senha = bcrypt.hashSync(req.body.senha, 10);
	const tipo = 'colaborador';

	var query = `INSERT INTO usuario (nome, apelido, email, senha, faixaEtaria, tipo) VALUES ( '${nome}', '${apelido}', '${email}', '${senha}', '${faixaEtaria}', '${tipo}' )`;
	executaSql(query, res);

	console.log(query);
});

app.post('/novoContato', (req, res) => {
	console.log("Rota chamada");

	var date = new Date;

	const nome = req.body.nome;
	const email = req.body.email;
	const assunto = req.body.assunto;
	const mensagem = req.body.mensagem;
	const data = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

	var query = `INSERT INTO contato (nome, email, assunto, mensagem, data) VALUES ('${nome}', '${email}', '${assunto}', '${mensagem}', '${data}')`;
	executaSql(query, res);

	console.log(query);
})

//Rodando o servidor
http.createServer(app).listen(port, () => {
	console.log("Servidor online");
})
