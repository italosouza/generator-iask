'use strict';
var path = require('path');
var generators = require('yeoman-generator');
var yosay = require('yosay');

module.exports = generators.Base.extend({
  constructor: function() {
    generators.Base.apply(this, arguments);

    var packageJSON = this.fs.readJSON(this.destinationPath('package.json')) || {};
    if (packageJSON.name == undefined) {
      this.log.error('Este comando deve ser executado no diretório do projeto.');
      process.exit(1);
    };

    if (arguments[0] == '') {
      this.log.error('Para construir um scaffold, informe o nome do módulo.');
      process.exit(1);
    };

    this.argument('namespace', {
      type: String,
      required: true,
      description: 'Nome do módulo'
    });

  },

  //solicitando informações sobre o conteudo a ser gerado
  prompting: function() {
    var done = this.async();

    var prompts = [{
      type: 'checkbox',
      name: 'features',
      message: 'O que deseja criar?',
      choices: [{
        name: 'Front-end',
        value: 'front',
        checked: false
      }, {
        name: 'Back-end',
        value: 'back',
        checked: true
      }]
    }];


    this.prompt(prompts, function(pRespostas) {
      var features = pRespostas.features;

      function hasFeature(pOpcao) {
        return features && features.indexOf(pOpcao) !== -1;
      }

      this.bCriarFront = hasFeature('front');
      this.bCriarBack = hasFeature('back');

      done();
    }.bind(this));


  },

  default: function() {

    if (this.bCriarBack) {
      this.composeWith('server', {
        arguments: [this.namespace]
      }, {
        local: require.resolve('../server')
      });
    }

    if (this.bCriarFront) {
      this.composeWith('client', {
        arguments: [this.namespace]
      }, {
        local: require.resolve('../client')
      });
    }
  },

  //este modulo espera que o package.json já tenha sido criado
  writing: function() {

  },

  end: function() {
    if (this.bCriarFront) {
      this.log(yosay('\nNão esqueça de incluir o módulo no: ./client/app.js'));
    }


    if (!this.bCriarFront && !this.bCriarBack) {
      this.log(yosay('Se nada for escolhido, nada será criado!'));
    }
  }
});
