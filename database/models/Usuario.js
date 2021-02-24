const Sequelize = require('sequelize');
const database = require('../db');

const Usuarios = database.define('usuario', {
	idusuario: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	nome: {
		type: Sequelize.STRING,
		allowNull: false
	},
	apelido: {
		type: Sequelize.STRING,
		allowNull: false
	},
	senha: {
		type: Sequelize.STRING,
		allowNull: false
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false
	},
	faixaetaria: {
		type: Sequelize.STRING,
		allowNull: false
	},
	tipo: {
		type: Sequelize.STRING,
		allowNull: false
	}

})

var users = [{
	nome: 'admin',
	apelido: 'admin',
	email: 'admin@admin',
	senha: 'admin',
	faixaetaria: '',
	tipo: 'admin',
	createdAt: new Date(),
    updatedAt: new Date()
},{
	nome: 'anonimo',
	apelido: 'anonimo',
	email: 'anonimo@anonimo',
	senha: '',
	faixaetaria: '',
	tipo: 'anonimo',
	createdAt: new Date(),
    updatedAt: new Date()
}];

/* Sincroniza o modelo com a base de dados, não substituindo tabelas existentes */
database.sync({ force: false }).then(() => {
    /* Insere dados padrão do framework */
    database.query('SELECT COUNT(*) AS count FROM usuarios') // Verifica se existem dados na base do WebGENTE
    .then(results => {
        if (results[0][0].count == 0) {
            console.log('Inserindo dados padrão do Framework')
            Usuarios.bulkCreate(users)
        }
    });
});

module.exports = Usuarios;