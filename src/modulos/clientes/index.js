const db = require('../../DB/mysql');
const crtl = require('./controlador');

module.exports = crtl(db);