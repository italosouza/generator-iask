'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;
var assert = require('yeoman-assert');

describe('gerador', function() {
  before(function(done) {
    helpers.run(path.join(__dirname, '../generators/app'))
      .inDir(path.join(__dirname, 'temp'))
      .withOptions({
        'skip-install': true
      })
      .withPrompts({
        features: []
      })
      .withGenerators([
        [helpers.createDummyGenerator(), 'mocha:app']
      ])
      .on('end', done);
  });

  it('deve ser invocado sem gerar excessões', function() {
    // not testing the actual run of generators yet
    require('../generators/app');
  });

  it('deve criar os arquivos esperados', function() {
    assert.file([
      'C:/workspace/nodes/teste/iask-express/.bowerrc',
      'C:/workspace/nodes/teste/iask-express/bower.json',
      'C:/workspace/nodes/teste/iask-express/client',
      'C:/workspace/nodes/teste/iask-express/gulpfile.js',
      'C:/workspace/nodes/teste/iask-express/package.json',
      'C:/workspace/nodes/teste/iask-express/README.md',
      'C:/workspace/nodes/teste/iask-express/server',
      'C:/workspace/nodes/teste/iask-express/client/.jshintrc',
      'C:/workspace/nodes/teste/iask-express/client/app.css',
      'C:/workspace/nodes/teste/iask-express/client/app.js',
      'C:/workspace/nodes/teste/iask-express/client/index.html',
      'C:/workspace/nodes/teste/iask-express/client/modules',
      'C:/workspace/nodes/teste/iask-express/client/style.css',
      'C:/workspace/nodes/teste/iask-express/client/modules/navegacao',
      'C:/workspace/nodes/teste/iask-express/client/modules/navegacao/navegacao.html',
      'C:/workspace/nodes/teste/iask-express/client/modules/navegacao/navegacao.js',
      'C:/workspace/nodes/teste/iask-express/server/app',
      'C:/workspace/nodes/teste/iask-express/server/config',
      'C:/workspace/nodes/teste/iask-express/server/server.js',
      'C:/workspace/nodes/teste/iask-express/server/app/controllers',
      'C:/workspace/nodes/teste/iask-express/server/app/models',
      'C:/workspace/nodes/teste/iask-express/server/app/routes',
      'C:/workspace/nodes/teste/iask-express/server/app/services',
      'C:/workspace/nodes/teste/iask-express/server/app/controllers/navegacao.js',
      'C:/workspace/nodes/teste/iask-express/server/app/models/navegacao.js',
      'C:/workspace/nodes/teste/iask-express/server/app/routes/navegacao.js',
      'C:/workspace/nodes/teste/iask-express/server/app/services/auth.js',
      'C:/workspace/nodes/teste/iask-express/server/config/database.js',
      'C:/workspace/nodes/teste/iask-express/server/config/express.js',

    ]);
  });
});
