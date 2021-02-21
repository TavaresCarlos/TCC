const Sequelize = require('sequelize');
const database = require('../db');

const Categorias = database.define('categorias', {
	idcategorias: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	nomecat: {
		type: Sequelize.STRING,
		allowNull: false
	}
})

module.exports = Categorias;