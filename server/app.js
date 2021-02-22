const http = require('http');
const cors = require('cors');
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const Pool = require('pg').Pool;

const database = require('../database/db');
const Usuarios = require('../database/models/Usuario.js');
const Contatos = require('../database/models/Contato.js');
const Categorias = require('../database/models/Categorias.js');
const Subcategorias = require('../database/models/Subcategorias.js');
const Contribuicao = require('../database/models/Contribuicao.js');
const ConfInicial = require('../database/models/ConfInicial.js');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true, secure: false }));
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
	res.json("Servidor online");
});

app.post('/home', (req, res) => {
	
	app.locals.user = '';
	app.locals.logged = false;

	//executaSql('SELECT * FROM configuracaoinicial', res);
});

app.post('/cadastroNovoUsuario', (req, res) => {

	const senha = bcrypt.hashSync(req.body.senha, 10);
	const tipo = 'colaborador';

	const cadastro = Usuarios.create({
		nome: req.body.nome,
		apelido: req.body.apelido,
		email: req.body.email,
		faixaetaria: req.body.faixaEtaria,
		tipo: tipo,
		senha: senha
	}).then(res.json("Sucesso"));
});

app.post('/novoContato', (req, res) => {

	var date = new Date;
	const publicado = "sim";

	const contato = Contatos.create({
		nome: req.body.nome,
		assunto:  req.body.assunto,
		email: req.body.email,
		mensagem: req.body.mensagem,
		publicado: publicado,
		data: date
	}).then(res.json("Sucesso"));
})

app.post('/login', (req, res) => {
	console.log("Rota chamada");

	const usuario = req.body.usuario;
	const senha = req.body.senha;

	Usuarios.findOne({ where:{ apelido: usuario }}).then((user) =>{
		if(bcrypt.compareSync(senha, user.senha)){
			//Autenticação do usuário
			app.locals.user = user.apelido;
			app.locals.logged = true;
			res.json(user);
		}
	});
})

app.post('/perfil', (req, res) => {
	Usuarios.findOne({ where:{ apelido: app.locals.user }}).then((user) =>{
		res.json(user);
	});
})

app.post('/trocarSenha', (req, res) => {
	
})

app.post('/setCategoria', (req, res) => {
	
	if(app.locals.logged){
		Categorias.create({
			nomecat: req.body.categoria
		}).then(res.json("Categoria inserida."))
	}
})

app.get('/getCategoria', (req, res)=>{
	if(app.locals.logged){
		Categorias.findAll({
			raw: true,
			atributes: ['nomecat']
		}).then((data) => {
			res.json(data);
		})
	}
})

app.post('/setSubcategoria', (req, res) => {
	if(app.locals.logged){
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
	}
})

app.post('/getSubcategoria', (req, res)=>{
	if(app.locals.logged){
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
	}
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
	var query = `SELECT idcontribuicao, titulo, categorias.nomecat, subcategorias.nomesubcat, to_char(data, 'DD/MM/YYYY'), distanciaarea, descricao, tipogeometria, ST_AsGeoJSON(geom), publicado FROM contribuicao INNER JOIN categorias ON contribuicao.idcategorias =  categorias.idcategorias INNER JOIN subcategorias ON contribuicao.idsubcategorias = subcategorias.idsubcategorias WHERE publicado = 'sim'`;
		
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

	if(formato == 'geojson'){
		var query = `SELECT json_agg(
			            json_build_object(
			            	'type', 'Feature',
							'geometry', ST_AsGeoJSON(geom)::json,
							'properties', json_build_object(
								'titulo', titulo,
								'categoria', categorias.nomecat, 
								'subcategoria', subcategorias.nomesubcat,
								'data',to_char(data, 'DD/MM/YYYY'),
								'distancia ou area',distanciaarea,
								'descricao', descricao,
								'tipo',tipogeometria
							)
			            )
			        ) 
					FROM contribuicao 
					INNER JOIN categorias ON contribuicao.idcategorias =  categorias.idcategorias 
					INNER JOIN subcategorias ON contribuicao.idsubcategorias = subcategorias.idsubcategorias
					WHERE publicado = 'sim'`;
		console.log(query);
	}
	else if(formato == 'csv'){
		var query = `
			SELECT 
				titulo,
				categorias.nomecat, 
				subcategorias.nomesubcat,
				to_char(data, 'DD/MM/YYYY'),
				distanciaarea,
				descricao,
				tipogeometria,
				ST_AsGeoJSON(geom)::json
				
			FROM contribuicao 
			INNER JOIN categorias ON contribuicao.idcategorias =  categorias.idcategorias 
			INNER JOIN subcategorias ON contribuicao.idsubcategorias = subcategorias.idsubcategorias
			WHERE publicado = 'sim'`;
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
	if(app.locals.logged){
		var query = `SELECT idcontato, nome, assunto, email,  to_char(data, 'DD/MM/YYYY'), mensagem FROM contato WHERE publicado = 'sim' ORDER BY data DESC`;

		console.log(query);

		pool.query(query, (error, results) => {
			if(error){
				res.json(error);
			}
			else{
				res.json(results.rows);
			}
		})
	}
})

app.post('/alterarStatusColaboracao', (req, res) => {
	if(app.locals.logged){
		const novoStatus = req.body.statusPublicacao;
		const idcontribuicao = req.body.idcontribuicao;

		console.log(idcontribuicao);
		console.log(novoStatus);

		var query = `UPDATE contribuicao SET publicado = '${novoStatus}' WHERE idcontribuicao = '${idcontribuicao}'`;
		console.log(query);
		executaSql(query, res);
	}
})

app.post('/verColaboracoes', (req, res) => {
	if(app.locals.logged){
		var query = `SELECT idcontribuicao, titulo, categorias.nomecat, subcategorias.nomesubcat, to_char(data, 'DD/MM/YYYY'), distanciaarea, descricao, tipogeometria, ST_AsGeoJSON(geom), publicado FROM contribuicao INNER JOIN categorias ON contribuicao.idcategorias =  categorias.idcategorias INNER JOIN subcategorias ON contribuicao.idsubcategorias = subcategorias.idsubcategorias`;
			
		console.log(query);

		pool.query(query, (error, results) => {
			if(error){
				res.json(error);
			}
			else{
				res.json(results.rows);
			}
		})
	}
})

app.post('/setConfInicial', (req, res) => {
	const nomeSistema = req.body.nomeSistema;
	const latitude = req.body.latitude;
	const longitude = req.body.longitude;
	const zoom = req.body.zoom;
	const descricao = req.body.descricao;

	var query = `INSERT INTO configuracaoinicial (nomesistema, latitude, longitude, zoom, descricao) VALUES ('${nomeSistema}', '${latitude}', '${longitude}', '${zoom}', '${descricao}')`;
	executaSql(query, res);

	console.log(query);
})

app.post('/setAdministradores', (req, res) => {
	if(app.locals.logged){
		const administrador = req.body.administrador;
		var query = `UPDATE usuario SET tipo = 'administrador' WHERE nome = '${administrador}'`;
		console.log(query);
		executaSql(query, res);
	}
})

app.post('/getColaboradores', (req, res) => {
	if(app.locals.logged){
		var query = "SELECT nome FROM usuario WHERE tipo = 'colaborador'";
		console.log(query);
		pool.query(query, (error, results) => {
			if(error){
				res.json(error);
			}
			else{
				res.json(results.rows);
			}
		})
	}
})

app.post('/apagarContato', (req, res) => {
	if(app.locals.logged){
		const idcontato = req.body.id;
		var query = `UPDATE contato SET publicado = 'nao' WHERE idcontato = '${idcontato}'`;
		console.log(query);
		executaSql(query, res);
	}
})

//Rodando o servidor
http.createServer(app).listen(port, () => {
	(async() => {
			try{
			Subcategorias.belongsTo(Categorias, {
				constraint: true,
				foreignKey: 'idcategorias'
			});

			Contribuicao.belongsTo(Subcategorias, {
				constraint: true,
				foreignKey: 'idsubcategorias'
			});

			Contribuicao.belongsTo(Categorias, {
				constraint: true,
				foreignKey: 'idcategorias'
			});

			Contribuicao.belongsTo(Usuarios, {
				constraint: true,
				foreignKey: 'idusuarios'
			});

			//Define 1:N
			Categorias.hasMany(Subcategorias, {
				foreignKey: 'idsubcategorias'
			});

			Subcategorias.hasMany(Contribuicao, {
				foreignKey: 'idcontribuicao'
			});

			Categorias.hasMany(Contribuicao, {
				foreignKey: 'idcontribuicao'
			});

			Usuarios.hasMany(Contribuicao, {
				foreignKey: 'idcontribuicao'
			});

			const result = await database.sync( /*{force: true}*/ );

			/*if(result){
				const admin = await Usuarios.create({
					nome: 'admin',
					apelido: 'admin',
					email: 'admin@admin',
					senha: 'admin',
					faixaetaria: '',
					tipo: 'admin'
				});

				const anoninmo = await Usuarios.create({
					nome: 'anonimo',
					apelido: 'anonimo',
					email: 'anonimo@anonimo',
					senha: '',
					faixaetaria: '',
					tipo: 'anonimo'
				});
			}*/

			console.log("Base de dados criada e atualizada.");
		}
		catch(error){
			console.log(error);
		}
	})();
	console.log("Servidor online");
})
