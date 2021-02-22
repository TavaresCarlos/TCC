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

module.exports = Usuarios;