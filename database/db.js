const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:admin@localhost:5432/test-sequelize', {dialect: 'postgres'});

module.exports = sequelize;
