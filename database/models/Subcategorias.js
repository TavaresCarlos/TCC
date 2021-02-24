const Sequelize = require('sequelize');
const database = require('../db');
const Categorias = require('./Categorias.js')

const Subcategorias = database.define('subcategorias', {
	idsubcategorias: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	nomesubcat: {
		type: Sequelize.STRING,
		allowNull: false
	},
	idcategorias:{
		type: Sequelize.INTEGER,
		allowNull: false
	}
})

module.exports = Subcategorias;