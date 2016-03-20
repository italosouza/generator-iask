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
    this.fs.copyTpl(
      this.templatePath('database.js'),
      this.destinationPath(path.join('./server/config/database.js'))
    );

    this.fs.copyTpl(
      this.templatePath('express.js'),
      this.destinationPath(path.join('./server/config/express.js'))
    );

    this.fs.copyTpl(
      this.templatePath('server.js'),
      this.destinationPath(path.join('./server/server.js')), {
        generatorName: packageJSON.name
      }
    );

    this.fs.copy(
      this.templatePath('auth.js'),
      this.destinationPath(path.join('./server/app/services/auth.js'))
    );

    //conteudo relacionado ao front
    this.fs.copyTpl(
      this.templatePath('.jshintrc'),
      this.destinationPath(path.join('./client/.jshintrc'))
    );

    this.fs.copyTpl(
      this.templatePath('*.html'),
      this.destinationPath(path.join('./client/'))
    );

    this.fs.copyTpl(
      this.templatePath('*.css'),
      this.destinationPath(path.join('./client/'))
    );

    this.fs.copyTpl(
      this.templatePath('app.js'),
      this.destinationPath(path.join('./client/app.js'))
    );
    
    this.fs.copyTpl(
      this.templatePath('services/**.*'),
      this.destinationPath(path.join('./client/services'))
    );
    
    this.fs.copyTpl(
      this.templatePath('modulo/server/**/**.js'),
      this.destinationPath(path.join('./server/app'))
    );
    
    this.fs.copyTpl(
      this.templatePath('modulo/login/**.*'),
      this.destinationPath(path.join('./client/modules/login'))
    );
    this.fs.copyTpl(
      this.templatePath('modulo/usuario/**.*'),
      this.destinationPath(path.join('./client/modules/usuario'))
    );
    
    this.fs.copyTpl(
      this.templatePath('modelo.env'),
      this.destinationPath(path.join('./modelo.env'))
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
