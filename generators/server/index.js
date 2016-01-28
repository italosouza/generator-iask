'use strict';
var path = require('path');
var generators = require('yeoman-generator');
var _ = require('lodash');

module.exports = generators.Base.extend({

  constructor: function() {
    generators.Base.apply(this, arguments);

    if (arguments[0] == '') {
      this.log.error('Para construir um módulo servidor, informe o nome do módulo.');
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
      this.templatePath('routes/index.js'),
      this.destinationPath(path.join('./server/app/routes/' + this.namespace + '.js')), {
        //troca as tags <%= generatorName %> pelo valor passado por parametro
        generatorName: this.namespace
      }
    );

    this.fs.copyTpl(
      this.templatePath('models/index.js'),
      this.destinationPath(path.join('./server/app/models/' + this.namespace + '.js')), {
        generatorName: this.namespace,
        generatorModel: _.capitalize(this.namespace)
      }
    );

    this.fs.copyTpl(
      this.templatePath('controllers/index.js'),
      this.destinationPath(path.join('./server/app/controllers/' + this.namespace + '.js')), {
        generatorName: this.namespace
      }
    );

    // this.fs.copyTpl(
    //   this.templatePath('test.js'),
    //   this.destinationPath('test/' + this.namespace + '.js'), {
    //     namespace: this.namespace,
    //     generatorName: generatorName
    //   }
    // );
  }
});
