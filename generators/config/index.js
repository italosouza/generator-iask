const path = require('path')
const Generator = require('yeoman-generator')
const _ = require('lodash')
const mkdirp = require('mkdirp')

/**
 * Modulo gerador de configuração padrão do projeto
 */
module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)
    this.projectName = args[0]

    if (!this.projectName) {
      this.log('Nome do projeto não foi informado.')
      process.exit(1)
    }

    // const packageJSON = this.fs.readJSON(this.destinationPath('package.json')) || {}
    // if (packageJSON.name === undefined) {
    //   this.log.error('Este comando deve ser executado no diretório do projeto.')
    //   process.exit(1)
    // }
  }

  configuring() {
    if (path.basename(this.destinationPath()) !== this.projectName) {
      this.log(`\nCriando novo diretorio para configurações extra: config.\n`)
      mkdirp(path.join(this.projectName, '/', 'config'))
    }
  }

  writing() {
    const { projectName } = this

    this.fs.copy(
      this.templatePath('./nginx.conf'),
      this.destinationPath(path.join(projectName, './config/nginx.conf'))
    )

    this.fs.copy(
      this.templatePath('./docker-compose.yml'),
      this.destinationPath(path.join(projectName, './docker-compose.yml'))
    )
  }
}
