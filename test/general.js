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
      '.bowerrc',
      'bower.json',
      'client',
      'gulpfile.js',
      'package.json',
      'README.md',
      'server',
      'client/.jshintrc',
      'client/app.css',
      'client/app.js',
      'client/index.html',
      'client/plugins.js',
      'client/static',
      'client/style.css',
      'client/static/font',
      'client/static/images',
      'client/static/font/material-design-icons',
      'client/static/font/roboto',
      'client/static/font/material-design-icons/Material-Design-Icons.svg',
      'client/static/font/material-design-icons/Material-Design-Icons.ttf',
      'client/static/font/material-design-icons/Material-Design-Icons.woff',
      'client/static/font/material-design-icons/Material-Design-Iconsd41d.eot',
      'client/static/font/roboto/Roboto-Bold.ttf',
      'client/static/font/roboto/Roboto-Bold.woff',
      'client/static/font/roboto/Roboto-Light.ttf',
      'client/static/font/roboto/Roboto-Light.woff',
      'client/static/font/roboto/Roboto-Medium.ttf',
      'client/static/font/roboto/Roboto-Medium.woff',
      'client/static/font/roboto/Roboto-Regular.ttf',
      'client/static/font/roboto/Roboto-Regular.woff',
      'client/static/font/roboto/Roboto-Thin.ttf',
      'client/static/font/roboto/Roboto-Thin.woff',
      'client/static/images/avatar.png',
      'client/static/images/favicon',
      'client/static/images/login-logo.png',
      'client/static/images/materialize-logo.png',
      'client/static/images/user-bg.jpg',
      'client/static/images/favicon/apple-touch-icon-152x152.png',
      'client/static/images/favicon/favicon-32x32.png',
      'client/static/images/favicon/mstile-144x144.png',
      'server/app',
      'server/config',
      'server/server.js',
      'server/app/services',
      'server/app/services/auth.js',
      'server/config/database.js',
      'server/config/express.js'
    ]);
  });
});
