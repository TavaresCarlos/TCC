const Sequelize = require('sequelize');
const database = require('../db');

const Contato = database.define('contato', {
	idcontato: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	nome: {
		type: Sequelize.STRING,
		allowNull: false
	},
	assunto: {
		type: Sequelize.STRING,
		allowNull: false
	},
	email: {
		type: Sequelize.STRING,
		allowNull: false
	},
	mensagem: {
		type: Sequelize.STRING,
		allowNull: false
	},
	publicado: {
		type: Sequelize.STRING,
		allowNull: false
	},
	data: {
		type: Sequelize.DATE,
		allowNull: false
	}

})