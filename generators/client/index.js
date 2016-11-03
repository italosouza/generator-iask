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

    // copiar arquivos basicos do componente
    this.fs.copyTpl(
      this.templatePath('components/modulo.module.ts'),
      this.destinationPath(path.join('./client/src/app/', this.namespace, '/', this.namespace + '.module.ts')), {
        //troca as tags <%= generatorName %> pelo valor passado por parametro
        generatorName: this.namespace,
        generatorModel: _.capitalize(this.namespace)
      }
    );

    // conteudo do componente
    this.fs.copyTpl(
      this.templatePath('components/components/modulo.cad.component.html'),
      this.destinationPath(path.join('./client/src/app/', this.namespace, '/components/', this.namespace + '.cad.component.html')), {
        generatorName: this.namespace,
        generatorModel: _.capitalize(this.namespace)
      }
    );

    this.fs.copyTpl(
      this.templatePath('components/components/modulo.cad.component.spec.ts'),
      this.destinationPath(path.join('./client/src/app/', this.namespace, '/components/', this.namespace + '.cad.component.spec.ts')), {
        generatorName: this.namespace,
        generatorModel: _.capitalize(this.namespace)
      }
    );

    this.fs.copyTpl(
      this.templatePath('components/components/modulo.cad.component.ts'),
      this.destinationPath(path.join('./client/src/app/', this.namespace, '/components/', this.namespace + '.cad.component.ts')), {
        generatorName: this.namespace,
        generatorModel: _.capitalize(this.namespace)
      }
    );

    this.fs.copyTpl(
      this.templatePath('components/components/modulo.component.css'),
      this.destinationPath(path.join('./client/src/app/', this.namespace, '/components/', this.namespace + '.component.css')), {
        generatorName: this.namespace,
        generatorModel: _.capitalize(this.namespace)
      }
    );

    this.fs.copyTpl(
      this.templatePath('components/components/modulo.cons.component.html'),
      this.destinationPath(path.join('./client/src/app/', this.namespace, '/components/', this.namespace + '.cons.component.html')), {
        generatorName: this.namespace,
        generatorModel: _.capitalize(this.namespace)
      }
    );

    this.fs.copyTpl(
      this.templatePath('components/components/modulo.cons.component.spec.ts'),
      this.destinationPath(path.join('./client/src/app/', this.namespace, '/components/', this.namespace + '.cons.component.spec.ts')), {
        generatorName: this.namespace,
        generatorModel: _.capitalize(this.namespace)
      }
    );

    this.fs.copyTpl(
      this.templatePath('components/components/modulo.cons.component.ts'),
      this.destinationPath(path.join('./client/src/app/', this.namespace, '/components/', this.namespace + '.cons.component.ts')), {
        generatorName: this.namespace,
        generatorModel: _.capitalize(this.namespace)
      }
    );

    // conteudo do model
    this.fs.copyTpl(
      this.templatePath('components/models/modulo.ts'),
      this.destinationPath(path.join('./client/src/app/', this.namespace, '/models/', this.namespace + '.ts')), {
        generatorName: this.namespace,
        generatorModel: _.capitalize(this.namespace)
      }
    );

    // conteudo do service
    this.fs.copyTpl(
      this.templatePath('components/services/modulo.service.ts'),
      this.destinationPath(path.join('./client/src/app/', this.namespace, '/services/', this.namespace + '.service.ts')), {
        generatorName: this.namespace,
        generatorModel: _.capitalize(this.namespace)
      }
    );

  }
});
