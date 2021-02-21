const Sequelize = require('sequelize');
const database = require('../db');

const Contribuicao = database.define('contribuicao', {
	idcontribuicao: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	titulo: {
		type: Sequelize.STRING,
		allowNull: false
	},
	data: {
		type: Sequelize.DATE,
		allowNull: false
	},
	distanciaarea: {
		type: Sequelize.DOUBLE,
		allowNull: false
	},
	descricao: {
		type: Sequelize.STRING,
		allowNull: false
	},
	tipogeometria: {
		type: Sequelize.STRING,
		allowNull: false
	},
	publicado: {
		type: Sequelize.STRING,
		allowNull: false
	},
	geometria: {
		type: Sequelize.GEOMETRY,
		allowNull: false
	}
})

module.exports = Contribuicao;