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
      './.bowerrc',
      './bower.json',
      './client',
      './gulpfile.js',
      './package.json',
      './README.md',
      './server',
      './client/.jshintrc',
      './client/app.css',
      './client/app.js',
      './client/index.html',
      './client/modules',
      './client/style.css',
      './client/modules/navegacao',
      './client/modules/navegacao/navegacao.html',
      './client/modules/navegacao/navegacao.js',
      './server/app',
      './server/config',
      './server/server.js',
      './server/app/controllers',
      './server/app/models',
      './server/app/routes',
      './server/app/services',
      './server/app/controllers/navegacao.js',
      './server/app/models/navegacao.js',
      './server/app/routes/navegacao.js',
      './server/app/services/auth.js',
      './server/config/database.js',
      './server/config/express.js',

    ]);
  });
});
