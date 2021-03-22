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
	//res.json({ message: 'Funcionando' })
	executaSql('SELECT * FROM usuario', res);
});

app.post('/home', (req, res) => {
	
	app.locals.user = '';
	app.locals.logged = false;

	executaSql('SELECT * FROM configuracaoinicial', res);
});

app.post('/cadastroNovoUsuario', (req, res) => {
	console.log("Rota chamada");

	const nome = req.body.nome;
	const apelido = req.body.apelido;
	const faixaEtaria = req.body.faixaEtaria;
	const email = req.body.email;
	const senha = bcrypt.hashSync(req.body.senha, 10);
	const tipo = 'colaborador';

	var query = `INSERT INTO usuario (nome, apelido, email, senha, faixaetaria, tipo) VALUES ( '${nome}', '${apelido}', '${email}', '${senha}', '${faixaEtaria}', '${tipo}' )`;
	executaSql(query, res);

	console.log(query);
});

app.post('/setContato', (req, res) => {
	console.log("Rota chamada");

	var date = new Date;

	const nome = req.body.nome;
	const email = req.body.email;
	const assunto = req.body.assunto;
	const mensagem = req.body.mensagem;
	const publicado = 'sim';
	const data = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();

	var query = `INSERT INTO contato (nome, email, assunto, mensagem, data, publicado) VALUES ('${nome}', '${email}', '${assunto}', '${mensagem}', '${data}', '${publicado}')`;
	executaSql(query, res);

	console.log(query);
})

app.post('/logout', (req, res) => {
	app.locals.user = '';
	app.locals.logged = false;
})

app.post('/login', (req, res) => {
	console.log("Rota chamada");

	const usuario = req.body.usuario;
	const senha = req.body.senha;

	if(usuario == 'anonimo'){
		//Autenticação do usuário
		app.locals.user = 'anonimo';
		app.locals.logged = true;
		res.json('Anonimo logado');
	}
	else{
		var query = `SELECT nome, senha, tipo FROM usuario WHERE apelido = '${usuario}' OR email = '${usuario}'`;
		pool.query(query, (error, results) => {
			if(error){
				res.json(error);
			}
			else{
				if(results.rows.length == 0){
					res.json("Usuário inválido. Tente novamente.");
				}
				else{
					//Compara a senha que o usuário digitou com a senha que retornou da consulta ao banco de dados
					if(bcrypt.compareSync(senha, results.rows[0].senha)){

						//Autenticação do usuário
						app.locals.user = usuario;
						app.locals.type = results.rows[0].tipo;
						app.locals.logged = true;

						res.json(results.rows);
					}
					else{
						res.json("Senha inválida. Tente novamente.");
					}
				}
			}
		})
		console.log(query);
	}	
})

app.post('/perfil', (req, res) => {
	if(app.locals.logged){
		var query = `SELECT nome, apelido, email, faixaetaria, tipo FROM usuario WHERE apelido = '${app.locals.user}'`;
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

app.post('/trocarSenha', (req, res) => {
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
})

app.post('/setCategoria', (req, res) => {
	if(app.locals.logged){
		const categoria = req.body.categoria;

		var query_01 = `SELECT nomecat FROM categorias WHERE nomecat = '${categoria}'`;
		var query_02 = `INSERT INTO categorias (nomecat) VALUES ('${categoria}')`;

		pool.query(query_01, (error, results) => {
			console.log(query_01);
			if(error){
				res.json(error);
			}
			else{
				//Categoria ainda não cadastrada
				console.log(results.rows);
				if(results.rows.length == 0){
					executaSql(query_02, res);
					console.log(query_02);
				} 
				//Categoria já cadastrada
				else{
					res.json("Categoria já cadastrada");
				}
			}
		})
	}
})

app.post('/getCategoria', (req, res)=>{
	if(app.locals.logged){
		var query = "SELECT idcategorias, nomecat FROM categorias";
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

/* Seleciona a subcategoria de acordo com o id da categoria passado */
app.post('/getSubcategoria', (req, res)=>{
	if(app.locals.logged){
		var idcategoria = req.body.idcategoria;

		var query = `SELECT nomesubcat, idsubcategorias FROM subcategorias WHERE idcategorias = '${idcategoria}'`;

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

	const usuario = app.locals.user;

	var query_01 = `SELECT idcategorias FROM categorias WHERE nomecat = '${categoria}'`;
	var query_02 = `SELECT idsubcategorias FROM subcategorias WHERE nomesubcat = '${subcategoria}'`;
	var query_03 = `SELECT idusuario FROM usuario WHERE apelido = '${usuario}' OR email = '${usuario}'`;

	pool.query(query_01, (error, results) => {
		console.log(query_01);
		if(error){
			res.json(error);
		}
		else{
			const idcategorias = results.rows[0].idcategorias;
			pool.query(query_02, (error, results) => {
				console.log(query_02);
				if(error){
					res.json(error);
				}
				else{
					//Há subcategorias
					if(results.rows.length != 0){
						const idsubcategorias = results.rows[0].idsubcategorias;

						console.log(query_03);
						pool.query(query_03, (error, results) => {
							if(error){
								res.json(error);
							}
							else{
								const idusuario = results.rows[0].idusuario;
								console.log(idusuario);
								var query_04 = `INSERT INTO contribuicao (titulo, idcategorias, idsubcategorias, distanciaarea, data, tipoGeometria, descricao, publicado, geometria, idusuario) VALUES ('${titulo}', '${idcategorias}', '${idsubcategorias}', '${distanciaArea}', '${dataOcorrencia}', '${tipoGeometria}', '${descricao}', '${publicado}', ST_GeomFromGeoJSON('${coordenadas}'), '${idusuario}')`;
								executaSql(query_04, res);
								console.log(query_04);
							}
						})
					}
				}
			})
		}
	})
})

app.post('/getColaboracoes', (req, res) => {
	var query = `SELECT idcontribuicao, titulo, categorias.nomecat, subcategorias.nomesubcat, to_char(data, 'DD/MM/YYYY'), distanciaarea, descricao, tipogeometria, ST_AsGeoJSON(geometria), publicado, usuario.nome  
	FROM contribuicao 
	INNER JOIN categorias ON contribuicao.idcategorias =  categorias.idcategorias 
	INNER JOIN subcategorias ON contribuicao.idsubcategorias = subcategorias.idsubcategorias
	INNER JOIN usuario ON contribuicao.idusuario = usuario.idusuario
	WHERE publicado = 'sim'`;	

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
	if(app.locals.logged){
		const formato = req.body.formato;
		const categoria = req.body.categoria;
		const subcategoria = req.body.subcategoria;
		//const tipoUsuario = data.locals.type; 

		if(formato == 'geojson'){
			if(categoria != '' && subcategoria != ''){
				var query = `SELECT json_agg(
				            json_build_object(
				            	'type', 'Feature',
								'geometry', ST_AsGeoJSON(geometria)::json,
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
						WHERE publicado = 'sim' AND contribuicao.idcategorias = '${ categoria }' AND contribuicao.idsubcategorias = '${ subcategoria }'`;
				console.log(query);
			}
			else if(categoria != '' && subcategoria == ''){
				var query = `SELECT json_agg(
				            json_build_object(
				            	'type', 'Feature',
								'geometry', ST_AsGeoJSON(geometria)::json,
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
						WHERE publicado = 'sim' AND contribuicao.idcategorias = '${ categoria }'`;
				console.log(query);
			}
		}
		else if(formato == 'csv'){
			if(categoria != '' && subcategoria != ''){
				var query = `
					SELECT 
						titulo,
						categorias.nomecat, 
						subcategorias.nomesubcat,
						to_char(data, 'DD/MM/YYYY'),
						distanciaarea,
						descricao,
						tipogeometria,
						ST_AsGeoJSON(geometria)::json
						
					FROM contribuicao 
					INNER JOIN categorias ON contribuicao.idcategorias =  categorias.idcategorias 
					INNER JOIN subcategorias ON contribuicao.idsubcategorias = subcategorias.idsubcategorias
					WHERE publicado = 'sim' AND contribuicao.idcategorias = '${ categoria }' AND contribuicao.idsubcategorias = '${ subcategoria }'`;
			}
			else if(categoria != '' && subcategoria == ''){
				var query = `
					SELECT 
						titulo,
						categorias.nomecat, 
						subcategorias.nomesubcat,
						to_char(data, 'DD/MM/YYYY'),
						distanciaarea,
						descricao,
						tipogeometria,
						ST_AsGeoJSON(geometria)::json
						
					FROM contribuicao 
					INNER JOIN categorias ON contribuicao.idcategorias =  categorias.idcategorias 
					INNER JOIN subcategorias ON contribuicao.idsubcategorias = subcategorias.idsubcategorias
					WHERE publicado = 'sim' AND contribuicao.idcategorias = '${ categoria }'`;
			}
		}

		if(query != undefined){
			pool.query(query, (error, results) => {
				if(error){
					res.json(error);
				}
				else{
					res.json(results.rows);
				}
			})
		}
	}
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
		var query = `SELECT idcontribuicao, titulo, categorias.nomecat, subcategorias.nomesubcat, to_char(data, 'DD/MM/YYYY'), distanciaarea, descricao, tipogeometria, ST_AsGeoJSON(geometria), publicado, usuario.nome  
		FROM contribuicao 
		INNER JOIN categorias ON contribuicao.idcategorias =  categorias.idcategorias 
		INNER JOIN subcategorias ON contribuicao.idsubcategorias = subcategorias.idsubcategorias
		INNER JOIN usuario ON contribuicao.idusuario = usuario.idusuario`;
			
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

	var query = `UPDATE configuracaoinicial SET nomesistema = '${nomeSistema}', latitude = '${latitude}', longitude = '${longitude}',  zoom = '${zoom}', descricao = '${descricao}' WHERE idinicial = '1'`;
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

app.post('/contadorTabela', (req, res) => {
	if(app.locals.logged){
		const nomeTabela = req.body.nomeTabela;
		var query = `SELECT COUNT(*) FROM ${nomeTabela}`;
		executaSql(query, res);
	}
})

//Rodando o servidor
http.createServer(app).listen(port, () => {
	console.log("Servidor online");
})
