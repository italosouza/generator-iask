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
    this.answers = args[0]

    // generators.Base.apply(this, arguments)

    // if (arguments[0] == '') {
    //   this.log.error('Para construir um módulo servidor, informe o nome do CRUD.');
    //   process.exit(1);
    // };

    // const packageJSON = this.fs.readJSON(this.destinationPath('package.json')) || {}
    // if (packageJSON.name === undefined) {
    //   this.log.error('Este comando deve ser executado no diretório do projeto.')
    //   process.exit(1)
    // }
  }

  async prompting() {}

  writing() {
    mkdirp(path.join('./config'))
    this.fs.copy(
      this.templatePath('./nginx.conf'),
      this.destinationPath(path.join('./config/nginx.conf'))
    )
    this.fs.copy(
      this.templatePath('./docker-compose.yml'),
      this.destinationPath(path.join('./docker-compose.yml'))
    )
  }
}
