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
      './.env',
      './.gitignore',
      './client',
      './gulpfile.js',
      './package.json',
      './README.md',
      './server',
      './client/.gitignore',
      './client/angular-cli.json',
      './client/e2e',
      './client/karma.conf.js',
      './client/package.json',
      './client/protractor.conf.js',
      './client/README.md',
      './client/src',
      './client/tslint.json',
      './client/e2e/app.e2e-spec.ts',
      './client/e2e/app.po.ts',
      './client/e2e/tsconfig.json',
      './client/src/app',
      './client/src/assets',
      './client/src/environments',
      './client/src/favicon.ico',
      './client/src/index.html',
      './client/src/main.ts',
      './client/src/polyfills.ts',
      './client/src/test.ts',
      './client/src/tsconfig.json',
      './client/src/typings.d.ts',
      './client/src/app/app.component.html',
      './client/src/app/app.component.spec.ts',
      './client/src/app/app.component.ts',
      './client/src/app/app.module.ts',
      './client/src/app/app.routing.ts',
      './client/src/app/index.ts',
      './client/src/app/layouts',
      './client/src/app/main.ts',
      './client/src/app/navegacao',
      './client/src/app/pages',
      './client/src/app/painel',
      './client/src/app/shared',
      './client/src/app/layouts/full-layout.component.html',
      './client/src/app/layouts/full-layout.component.ts',
      './client/src/app/layouts/simple-layout.component.html',
      './client/src/app/layouts/simple-layout.component.ts',
      './client/src/app/navegacao/components',
      './client/src/app/navegacao/models',
      './client/src/app/navegacao/navegacao.module.ts',
      './client/src/app/navegacao/services',
      './client/src/app/navegacao/components/navegacao.cad.component.html',
      './client/src/app/navegacao/components/navegacao.cad.component.spec.ts',
      './client/src/app/navegacao/components/navegacao.cad.component.ts',
      './client/src/app/navegacao/components/navegacao.component.css',
      './client/src/app/navegacao/components/navegacao.cons.component.html',
      './client/src/app/navegacao/components/navegacao.cons.component.spec.ts',
      './client/src/app/navegacao/components/navegacao.cons.component.ts',
      './client/src/app/navegacao/models/navegacao.ts',
      './client/src/app/navegacao/services/navegacao.service.ts',
      './client/src/app/pages/404.component.html',
      './client/src/app/pages/404.component.ts',
      './client/src/app/pages/500.component.html',
      './client/src/app/pages/500.component.ts',
      './client/src/app/pages/authentication.service.ts',
      './client/src/app/pages/login.component.html',
      './client/src/app/pages/login.component.ts',
      './client/src/app/pages/register.component.html',
      './client/src/app/pages/register.component.ts',
      './client/src/app/painel/components',
      './client/src/app/painel/components/painel.component.html',
      './client/src/app/painel/components/painel.component.ts',
      './client/src/app/shared/aside.directive.ts',
      './client/src/app/shared/breadcrumb.component.ts',
      './client/src/app/shared/cad.component.ts',
      './client/src/app/shared/cons.component.ts',
      './client/src/app/shared/core.object.ts',
      './client/src/app/shared/nav-dropdown.directive.ts',
      './client/src/app/shared/service.component.ts',
      './client/src/app/shared/sidebar.directive.ts',
      './client/src/assets/css',
      './client/src/assets/fonts',
      './client/src/assets/img',
      './client/src/assets/style.css',
      './client/src/assets/css/font-awesome.css',
      './client/src/assets/css/font-awesome.min.css',
      './client/src/assets/css/simple-line-icons.css',
      './client/src/assets/css/style.css',
      './client/src/assets/fonts/fontawesome-webfont.eot',
      './client/src/assets/fonts/fontawesome-webfont.svg',
      './client/src/assets/fonts/fontawesome-webfont.ttf',
      './client/src/assets/fonts/fontawesome-webfont.woff',
      './client/src/assets/fonts/fontawesome-webfont.woff2',
      './client/src/assets/fonts/FontAwesome.otf',
      './client/src/assets/fonts/Simple-Line-Icons.eot',
      './client/src/assets/fonts/Simple-Line-Icons.svg',
      './client/src/assets/fonts/Simple-Line-Icons.ttf',
      './client/src/assets/fonts/Simple-Line-Icons.woff',
      './client/src/assets/fonts/Simple-Line-Icons.woff2',
      './client/src/assets/img/avatars',
      './client/src/assets/img/favicon.png',
      './client/src/assets/img/logo.png',
      './client/src/assets/img/avatars/1.jpg',
      './client/src/assets/img/avatars/2.jpg',
      './client/src/assets/img/avatars/3.jpg',
      './client/src/assets/img/avatars/4.jpg',
      './client/src/assets/img/avatars/5.jpg',
      './client/src/assets/img/avatars/6.jpg',
      './client/src/assets/img/avatars/7.jpg',
      './client/src/assets/img/avatars/8.jpg',
      './client/src/environments/environment.prod.ts',
      './client/src/environments/environment.ts',
      './server/app',
      './server/config',
      './server/server.js',
      './server/app/controllers',
      './server/app/models',
      './server/app/routes',
      './server/app/services',
      './server/app/controllers/navegacao.js',
      './server/app/controllers/usuario.js',
      './server/app/models/navegacao.js',
      './server/app/models/usuario.js',
      './server/app/routes/navegacao.js',
      './server/app/routes/usuario.js',
      './server/app/services/auth.js',
      './server/config/database.js',
      './server/config/express.js'

    ]);
  });
});