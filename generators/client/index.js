const path = require('path')
const Generators = require('yeoman-generator')
const _ = require('lodash')
const mkdirp = require('mkdirp')

module.exports = class extends Generators {
  constructor(args, opts) {
    super(args, opts)
    this.projectName = args[0]
  }

  async prompting() {
    this.answers = await this.prompt([
      {
        type: 'input',
        name: 'serviceName',
        default: 'core-app',
        filter: val => val.toLowerCase(),
        message: 'Informe o nome do serviço (Frontend):'
      }
    ])
  }

  configuring() {
    if (path.basename(this.destinationPath()) !== this.projectName) {
      this.log(`\nCriando novo diretorio para configurações extra: config.\n`)
      mkdirp(path.join(this.projectName, '/', this.answers.serviceName))
    }
  }

  writing() {
    const { serviceName } = this.answers
    const { projectName } = this

    this.fs.copyTpl(
      this.templatePath(path.join('./**/*.*')),
      this.destinationPath(path.join(projectName, serviceName, '/')),
      {
        generatorName: serviceName,
        generatorModel: _.capitalize(serviceName)
      }
    )
  }
}
