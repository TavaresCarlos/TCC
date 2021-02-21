(async() => {
	const database = require('./db');
	const Usuarios = require('./models/Usuario.js');
	const Contato = require('./models/Contato.js');
	const Categorias = require('./models/Categorias.js');
	const Subcategorias = require('./models/Subcategorias.js');
	const Contribuicao = require('./models/Contribuicao.js');

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


		const result = await database.sync( {force: true} );
		console.log(result);
	}
	catch(error){
		console.log(error);
	}
})();