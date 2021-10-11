const dbConfig = require('./db.config');
const jwtConfig = require('./jwt.config');
const serverConfig = require('./server.config');

exports.database = dbConfig;
exports.server = serverConfig;
exports.jwt = jwtConfig;