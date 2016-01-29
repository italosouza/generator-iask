'use strict';
var path = require('path');
var generators = require('yeoman-generator');
var _ = require('lodash');
var extend = require('deep-extend');
var mkdirp = require('mkdirp');
var yosay = require('yosay');

//valida o nome projeto
function gerarNomeProjeto(pNome) {
  pNome = _.kebabCase(pNome);
  return pNome;
}

module.exports = generators.Base.extend({

  //inicializando configurações do gerador
  initializing: function() {
    this.props = {};
  },

  //solicitando informações sobre o conteudo a ser gerado
  prompting: function() {
    var done = this.async();

    var prompts = [{
      type: 'input',
      name: 'name',
      default: gerarNomeProjeto('iask-express'),
      filter: gerarNomeProjeto,
      message: 'Informe o nome do projeto:'
    }];

    this.prompt(prompts, function(pRespostas) {
      this.props.name = pRespostas.name;

      done();
    }.bind(this));

  },

  //roda o gerador principal
  default: function() {
    //verifica se a pasta atual possui o mesmo nome informado no parametro
    if (path.basename(this.destinationPath()) !== this.props.name) {
      this.log(
        '\nPor padrão o gerador deve ser invocado apartir próprio diretório: ' + this.props.name + '\n' +
        'Neste caso, iremos criar esta pasta para você.\n'
      );
      mkdirp(this.props.name);
      this.destinationRoot(this.destinationPath(this.props.name));
    };

    this.fs.copyTpl(
      this.templatePath('*.js'),
      this.destinationPath(path.join('./'))
    );
    this.fs.copyTpl(
      this.templatePath('*.json'),
      this.destinationPath(path.join('./'))
    );
    this.fs.copy(
      this.templatePath('.bowerrc'),
      this.destinationPath(path.join('./.bowerrc'))
    );
    this.fs.copy(
      this.templatePath('*.md'),
      this.destinationPath(path.join('./'))
    );

    //define o arquivo template (corresponde a pasta template contida na pasta autal [app])
    var pkg = this.fs.readJSON(this.templatePath('package.json'), {});
    extend(pkg, {
      name: this.props.name
    });
    this.fs.writeJSON(this.destinationPath('package.json'), pkg);

    //gerador do sub-modulo
    this.composeWith('config', {
      arguments: ['core']
    }, {
      local: require.resolve('../config')
    });
  },

  //grava as informações no disco
  writing: function() {},

  install: function() {
    this.installDependencies({
      bower: true
    });
  },

  end: function() {

    this.log(yosay('\nPara criar um módulo digite: \nyo iask:scaffold modulo\ngulp build'));
  }

});
