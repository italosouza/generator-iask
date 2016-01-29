var http = require('http');
var express = require('express');
var app = require('./config/express')();

require('./config/database')('mongodb://localhost/iask-express');

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express em execução na porta: ' + app.get('port'));
});
