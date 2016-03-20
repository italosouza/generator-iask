require('dotenv').config();
var http = require('http');
var app = require('./config/express')();

var db = {
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
  base: process.env.DB_BASE
};

var sConexao = 'mongodb://' + db.username + ':' + db.password + '@' + db.host + ':' + db.port + '/' + db.base;
require('./config/database')(sConexao);

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express em execução na porta: ' + app.get('port'));
});