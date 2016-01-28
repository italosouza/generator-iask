'use strict';
var path = require('path');
var generators = require('yeoman-generator');
var _ = require('lodash');

module.exports = generators.Base.extend({

  constructor: function() {
    generators.Base.apply(this, arguments);

    if (arguments[0] == '') {
      this.log.error('Para construir um módulo cliente, informe o nome do módulo.');
      process.exit(1);
    };

    this.argument('namespace', {
      type: String,
      required: true,
      description: 'Nome do módulo'
    });
  },

  //este modulo espera que o package.json já tenha sido criado
  writing: function() {
    var packageJSON = this.fs.readJSON(this.destinationPath('package.json')) || {};
    if (packageJSON.name == undefined) {
      this.log.error('Este comando deve ser executado no diretório do projeto.');
      process.exit(1);
    };

    this.fs.copyTpl(
      this.templatePath('modulo/modulo.js'),
      this.destinationPath(path.join('./client/modules/', this.namespace, '/', this.namespace + '.js')), {
        //troca as tags <%= generatorName %> pelo valor passado por parametro
        generatorName: this.namespace,
        generatorModel: _.capitalize(this.namespace)
      }
    );

    this.fs.copyTpl(
      this.templatePath('modulo/modulo_cad.html'),
      this.destinationPath(path.join('./client/modules/', this.namespace, '/', this.namespace + '_cad.html')), {
        generatorName: this.namespace,
        generatorModel: _.capitalize(this.namespace)
      }
    );

    this.fs.copyTpl(
      this.templatePath('modulo/modulo_con.html'),
      this.destinationPath(path.join('./client/modules/', this.namespace, '/', this.namespace + '_con.html')), {
        generatorName: this.namespace,
        generatorModel: _.capitalize(this.namespace)
      }
    );

  }
});
