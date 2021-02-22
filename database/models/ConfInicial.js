const Sequelize = require('sequelize');
const database = require('../db');

const ConfInicial = database.define('configuracaoinicial', {
	idinicial: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	nomesistema: {
		type: Sequelize.STRING,
		allowNull: false
	},
	latitude: {
		type: Sequelize.DOUBLE,
		allowNull: false
	},
	longitude: {
		type: Sequelize.DOUBLE,
		allowNull: false
	},
	zoom: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	descricao: {
		type: Sequelize.STRING,
		allowNull: false
	}
})