'use strict';
var path = require('path');
var generators = require('yeoman-generator');
var _ = require('lodash');
var mkdirp = require('mkdirp');

module.exports = generators.Base.extend({

  constructor: function() {
    generators.Base.apply(this, arguments);

    // if (arguments[0] == '') {
    //   this.log.error('Para construir um módulo servidor, informe o nome do CRUD.');
    //   process.exit(1);
    // };

    // this.argument('namespace', {
    //   type: String,
    //   required: true,
    //   description: 'Nome do módulo'
    // });
  },

  //este modulo espera que o package.json já tenha sido criado
  writing: function() {
    var packageJSON = this.fs.readJSON(this.destinationPath('package.json')) || {};
    if (packageJSON.name == undefined) {
      this.log.error('Este comando deve ser executado no diretório do projeto.');
      process.exit(1);
    }

    // conteudo relacionado ao backend
    this.fs.copy(
      this.templatePath('server/**/**.js'),
      this.destinationPath(path.join('./server/'))
    );

    this.fs.copy(
      this.templatePath('server/dev.env'),
      this.destinationPath(path.join('./server/dev.env'))
    );

    this.fs.copy(
      this.templatePath('server/prod.env'),
      this.destinationPath(path.join('./server/prod.env'))
    );

    //conteudo relacionado ao front
    this.fs.copyTpl(
      this.templatePath('client/**/**.json'),
      this.destinationPath(path.join('./client/'))
    );

    this.fs.copyTpl(
      this.templatePath('client/**/**.js'),
      this.destinationPath(path.join('./client/'))
    );

    this.fs.copyTpl(
      this.templatePath('client/**/**.ts'),
      this.destinationPath(path.join('./client/'))
    );

    this.fs.copyTpl(
      this.templatePath('client/**/**.html'),
      this.destinationPath(path.join('./client/'))
    );

    this.fs.copy(
      this.templatePath('client/**/**.ico'),
      this.destinationPath(path.join('./client/'))
    );

    this.fs.copyTpl(
      this.templatePath('client/**/**.md'),
      this.destinationPath(path.join('./client/'))
    );

    this.fs.copyTpl(
      this.templatePath('client/.gitignore'),
      this.destinationPath(path.join('./client/.gitignore'))
    );

    this.fs.copy(
      this.templatePath('client/.editorconfig'),
      this.destinationPath(path.join('./client/.editorconfig'))
    );

    this.fs.copyTpl(
      this.templatePath('client/**/**.css'),
      this.destinationPath(path.join('./client/'))
    );

    this.fs.copy(
      this.templatePath('client/**/**.svg'),
      this.destinationPath(path.join('./client/'))
    );

    this.fs.copy(
      this.templatePath('client/**/**.otf'),
      this.destinationPath(path.join('./client/'))
    );

    this.fs.copy(
      this.templatePath('client/**/**.eot'),
      this.destinationPath(path.join('./client/'))
    );

    this.fs.copy(
      this.templatePath('client/**/**.ttf'),
      this.destinationPath(path.join('./client/'))
    );

    this.fs.copy(
      this.templatePath('client/**/**.wof*'),
      this.destinationPath(path.join('./client/'))
    );

    this.fs.copy(
      this.templatePath('client/**/**.png'),
      this.destinationPath(path.join('./client/'))
    );

    this.fs.copy(
      this.templatePath('client/**/**.jpg'),
      this.destinationPath(path.join('./client/'))
    );

    this.fs.copy(
      this.templatePath('client/src/scss/**/**.scss'),
      this.destinationPath(path.join('./client/src/scss/'))
    );

    //gerador do sub-modulo
    this.composeWith('cliente', {
      arguments: ['navegacao']
    }, {
      local: require.resolve('../client')
    });

    //gerador do sub-modulo
    this.composeWith('server', {
      arguments: ['navegacao']
    }, {
      local: require.resolve('../server')
    });

  }
});
