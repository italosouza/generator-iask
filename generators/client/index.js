const path = require('path')
const Generators = require('yeoman-generator')
const _ = require('lodash')
const mkdirp = require('mkdirp')

module.exports = class extends Generators {
  async prompting() {
    this.answers = await this.prompt([
      {
        type: 'input',
        name: 'serviceName',
        default: 'core-app',
        filter: val => val.toLowerCase(),
        message: 'Informe o nome do serviço:'
      }
    ])
  }

  // este modulo espera que o package.json já tenha sido criado
  writing() {
    const { serviceName } = this.answers
    mkdirp(serviceName)
    this.destinationRoot(this.destinationPath(serviceName))

    // const packageJSON = this.fs.readJSON(this.destinationPath('package.json')) || {}
    // if (packageJSON.name === undefined) {
    //   this.log.error('Este comando deve ser executado no diretório do projeto.')
    //   process.exit(1)
    // }

    this.fs.copyTpl(this.templatePath(path.join('./**/*.*')), this.destinationPath('./'), {
      generatorName: serviceName,
      generatorModel: _.capitalize(serviceName)
    })
  }
}
