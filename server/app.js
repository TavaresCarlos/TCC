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

app.use(session({ secret: 'secret', resave: true, saveUninitialized: false, cookie: {maxAge: 3600000} }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

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
	executaSql('SELECT * FROM usuario', res);
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

//Rota para autenticação do usuário e login
app.post('/login', (req, res) => {
	console.log("Rota chamada");

	const usuario = req.body.usuario;
	const senha = req.body.senha;
	
	var query = `SELECT nome,senha, tipo FROM usuario WHERE apelido = '${usuario}' OR email = '${usuario}'`;
	
	pool.query(query, (error, results) => {
		if(error){
			res.json(error);
		}
		else{
			if(results.rows.length == 0){
				res.json("Usuário inválido. Tente novamente.");
			}
			else{
				if(bcrypt.compareSync(senha, results.rows[0].senha)){
					//Iniciando a sessão do usuário no sistema
					req.session.loggedin = true;
					req.session.username = usuario;

					res.json(results.rows);
				}
				else{
					res.json("Senha inválida. Tente novamente.");
				}
			}
		}
	})

	console.log(query);
})

app.post('/perfil', (req, res) => {
	//if(req.session.loggedin){
		const usuario = req.session.username;
		var query = `SELECT * FROM usuario WHERE apelido = '${usuario}' OR email = '${usuario}'`;
		
		console.log(query);

		pool.query(query, (error, results) => {
			if(error){
				res.json(error);
			}
			else{
				res.json(results.rows);
			}
		})
	//}
})

app.post('/trocarSenha', (req, res) => {
	//if(req.session.loggedin){
		const usuario = req.session.username;
		var query = `SELECT * FROM usuario WHERE apelido = '${usuario}' OR email = '${usuario}'`;
		
		console.log(query);

		pool.query(query, (error, results) => {
			if(error){
				res.json(error);
			}
			else{
				res.json(results.rows);
			}
		})
	//}
})

app.post('/setCategoria', (req, res) => {
	const categoria = req.body.categoria;

	var query_01 = `SELECT nome FROM categorias WHERE nome = '${categoria}'`;
	var query_02 = `INSERT INTO categorias (nome) VALUES ('${categoria}')`;
	console.log(query_01);

	pool.query(query_01, (error, results) => {
		if(error){
			res.json(error);
		}
		else{
			//Categoria ainda não cadastrada
			if(results.rows.length == 0){
				executaSql(query_02, res);
			} 
			//Categoria já cadastrada
			else{
				res.json("Categoria já cadastrada");
			}
		}
	})
})

app.post('/getCategoria', (req, res)=>{
	var query = "SELECT nomecat FROM categorias";
	console.log(query);
	pool.query(query, (error, results) => {
		if(error){
			res.json(error);
		}
		else{
			res.json(results.rows);
		}
	})
})

app.post('/setSubcategoria', (req, res) => {
	const categoria = req.body.categoria;
	const subcategoria = req.body.subcategoria;

	var query_01 = `SELECT nomesubcat FROM subcategorias WHERE nomesubcat = '${subcategoria}'`;
	var query_02 = `SELECT idcategorias FROM categorias WHERE nomecat = '${categoria}'`;

	pool.query(query_01, (error, results) => {
		console.log(query_01);
		if(error){
			res.json(error);
		}
		else{
			//Subcategoria ainda não cadastrada
			if(results.rows.length == 0){
				console.log(query_02);
				pool.query(query_02, (error, results) => {
					if(error){
						res.json(error);
					}
					else{
						const idcategorias = results.rows[0].idcategorias;
						var query_03 = `INSERT INTO subcategorias (nomesubcat, idcategorias) VALUES ('${subcategoria}', '${idcategorias}')`;
						console.log(query_03);
						executaSql(query_03, res);
					}
				})
			} 
			//Subcategoria já cadastrada
			else{
				res.json("Categoria já cadastrada");
			}
		}
	})
})

app.post('/getSubcategoria', (req, res)=>{
	var categoria = req.body.categoria;

	var query_01 = `SELECT idcategorias FROM categorias WHERE nomecat = '${categoria}'`;

	console.log(query_01);
	pool.query(query_01, (error, results) => {
		if(error){
			res.json(error);
		}
		else{
			var idcategorias = (results.rows[0].idcategorias);
			var query_02 = `SELECT nomesubcat FROM subcategorias WHERE idcategorias = '${idcategorias}'`;
			console.log(query_02);
			pool.query(query_02, (error, results) => {
				if(error){
					res.json(error);
				}
				else{
					res.json(results.rows);
				}
			})
		}
	})
})

app.post('/setColaboracao', (req, res) => {
	const titulo = req.body.titulo;
	const categoria = req.body.categoria;
	const subcategoria = req.body.subcategoria;
	const distanciaArea = req.body.distanciaArea;
	const dataOcorrencia = req.body.dataOcorrencia;
	const tipoGeometria = req.body.tipoGeometria;
	const descricao = req.body.descricao;
	const publicado = 'nao';
	const coordenadas = req.body.coordenadas;

	var query_01 = `SELECT idcategorias FROM categorias WHERE nomecat = '${categoria}'`;
	var query_02 = `SELECT idsubcategorias FROM subcategorias WHERE nomesubcat = '${subcategoria}'`;

	pool.query(query_01, (error, results) => {
		console.log(query_01);
		if(error){
			res.json(error);
		}
		else{
			const idcategorias = results.rows[0].idcategorias;
			pool.query(query_02, (error, results) => {
				console.log(results.rows.length);
				console.log(query_02);
				if(error){
					res.json(error);
				}
				else{
					//Há subcategorias
					if(results.rows.length != 0){
						const idsubcategorias = results.rows[0].idsubcategorias;
						var query_03 = `INSERT INTO contribuicao (titulo, idcategorias, idsubcategorias, distanciaarea, data, tipoGeometria, descricao, publicado, geom) VALUES ('${titulo}', '${idcategorias}', '${idsubcategorias}', '${distanciaArea}', '${dataOcorrencia}', '${tipoGeometria}', '${descricao}', '${publicado}', ST_GeomFromGeoJSON('${coordenadas}'))`;
						executaSql(query_03, res);
						console.log(query_03);
					}
					//Não há subcategorias
					else if(results.rows.length == 0){
						const idsubcategorias = 0;
						var query_03 = `INSERT INTO contribuicao (titulo, idcategorias, idsubcategorias, distanciaarea, data, tipoGeometria, descricao, publicado) VALUES ('${titulo}', '${idcategorias}', '${idsubcategorias}', '${distanciaArea}', '${dataOcorrencia}', '${tipoGeometria}', '${descricao}', '${publicado}')`;
						executaSql(query_03, res);
						console.log(query_03);
					}
				}
			})
		}
	})
})

app.post('/getColaboracoes', (req, res) => {
	var query = `SELECT titulo, categorias.nomecat, subcategorias.nomesubcat, to_char(data, 'DD/MM/YYYY'), distanciaarea, descricao, tipogeometria, ST_AsGeoJSON(geom) FROM contribuicao INNER JOIN categorias ON contribuicao.idcategorias =  categorias.idcategorias INNER JOIN subcategorias ON contribuicao.idsubcategorias = subcategorias.idsubcategorias WHERE publicado = 'nao'`;
		
	console.log(query);

	pool.query(query, (error, results) => {
		if(error){
			res.json(error);
		}
		else{
			res.json(results.rows);
		}
	})
})

app.post('/exportar', (req, res) => {
	const formato = req.body.formato;

	if(formato == 'json'){
		var query = `SELECT array_to_json(array_agg(row_to_json(t)))
					  FROM (
					      SELECT titulo, categorias.nomecat, subcategorias.nomesubcat, to_char(data, 'DD/MM/YYYY'), distanciaarea, descricao, tipogeometria, ST_AsGeoJSON(geom) FROM contribuicao INNER JOIN categorias ON contribuicao.idcategorias =  categorias.idcategorias INNER JOIN subcategorias ON contribuicao.idsubcategorias = subcategorias.idsubcategorias WHERE publicado = 'nao'
					    ) t`;
		console.log(query);
	}
	pool.query(query, (error, results) => {
		if(error){
			res.json(error);
		}
		else{
			res.json(results.rows);
		}
	})
})

app.post('/getContatos', (req, res) => {
	var query = `SELECT idcontato, nome, assunto, email,  to_char(data, 'DD/MM/YYYY'), mensagem FROM contato ORDER BY data DESC`;

	console.log(query);

	pool.query(query, (error, results) => {
		if(error){
			res.json(error);
		}
		else{
			res.json(results.rows);
		}
	})
})

//Rodando o servidor
http.createServer(app).listen(port, () => {
	console.log("Servidor online");
})
