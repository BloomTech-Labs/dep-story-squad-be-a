const knex = require('knex');
const dbEnvironment = process.env.NODE_ENV || 'development';
//const dbEnvironment = 'production'
const knexConfig = require('../config/knexfile')[dbEnvironment];
module.exports = knex(knexConfig);
