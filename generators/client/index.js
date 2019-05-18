const path = require('path')
const Generators = require('yeoman-generator')
const _ = require('lodash')
const mkdirp = require('mkdirp')
const yosay = require('yosay')

module.exports = class extends Generators {
  constructor(args, opts) {
    super(args, opts)
    this.projectName = args[0]
    this.projectRoot = this.fs.exists('docker-compose.yml')

    if (!this.projectName) {
      this.log(
        yosay(
          `Algo de errado não está certo.
          \nO nome do serviço não foi informado.
          \nTalvez você devesse tentar:
          \nyo iask:client NOME_FRONTEND`,
          { maxLength: 50 }
        )
      )
      process.exit(1)
    }
  }

  async prompting() {
    if (this.projectRoot) {
      this.answers = { serviceName: this.projectName }
      this.projectName = ''
      return
    }

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
      mkdirp(path.join(this.projectName, this.answers.serviceName))
    }
  }

  writing() {
    const { serviceName } = this.answers
    const { projectName } = this

    this.fs.copyTpl(
      this.templatePath('dockerfile'),
      this.destinationPath(path.join(projectName, serviceName, 'dockerfile'))
    )

    this.fs.copyTpl(
      this.templatePath(path.join('./**/.*')),
      this.destinationPath(path.join(projectName, serviceName)),
      {
        generatorName: serviceName,
        generatorModel: _.capitalize(serviceName)
      }
    )

    this.fs.copyTpl(
      this.templatePath(path.join('./**/*.*')),
      this.destinationPath(path.join(projectName, serviceName)),
      {
        generatorName: serviceName,
        generatorModel: _.capitalize(serviceName)
      }
    )
  }
}
