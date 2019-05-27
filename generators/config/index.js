const path = require('path')
const Generator = require('yeoman-generator')
const _ = require('lodash')
const mkdirp = require('mkdirp')
const yosay = require('yosay')

/**
 * Modulo gerador de configuração padrão do projeto
 */
module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)
    this.projectName = args[0]

    if (!this.projectName) {
      this.log(
        yosay(
          `Algo de errado não está certo.
          \nNenhum nome de projeto foi informado.
          \nTalvez você devesse tentar:
          \nyo iask:config NOME_PROJETO`, { maxLength: 50 }
        )
      )
      process.exit(1)
    }
  }

  configuring() {
    if (path.basename(this.destinationPath()) !== this.projectName) {
      mkdirp(path.join(this.projectName, 'config'))
    }
  }

  writing() {
    const { projectName } = this

    this.fs.copy(
      this.templatePath('nginx.conf'),
      this.destinationPath(path.join(projectName, 'config', 'nginx.conf'))
    )

    this.fs.copy(
      this.templatePath('docker-compose.yml'),
      this.destinationPath(path.join(projectName, 'docker-compose.yml'))
    )

    this.fs.copy(
      this.templatePath('docker-service-builder.sh'),
      this.destinationPath(path.join(projectName, 'docker-service-builder.sh'))
    )
  }
}
