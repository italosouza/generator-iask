const path = require('path')
const Generator = require('yeoman-generator')
const _ = require('lodash')
const mkdirp = require('mkdirp')

const sPASTAADONIS = 'adonisjs'
const sPASTAEXPMONGODB = 'expressMongoDB'
const sPASTAEXPSEQUELIZE = 'expressSequelize'
const sADONIS = 'AdonisJS'
const sEXPMONGODB = 'ExpressJS - MongoDB'
const sEXPSEQUELIZE = 'ExpressJS - Sequelize'

module.exports = class extends Generator {
  // constructor(args, opts) {
  //   super(args, opts)

  // const packageJSON = this.fs.readJSON(this.destinationPath('package.yml')) || {}
  // if (packageJSON.name === undefined) {
  //   this.log.error('Este comando deve ser executado no diretório do projeto.')
  //   process.exit(1)
  // }
  // }

  async prompting() {
    this.answers = await this.prompt([
      {
        type: 'input',
        name: 'serviceName',
        default: 'core-api',
        filter: val => val.toLowerCase(),
        message: 'Informe o nome do serviço:'
      },
      {
        type: 'list',
        name: 'tech',
        message: 'Qual tecnologia vamos utilizar?',
        choices: [sADONIS, sEXPMONGODB, sEXPSEQUELIZE],
        store: true,
        validate: answer => {
          return answer.length < 1 ? 'Necessário escolher pelo menos uma opção.' : true
        }
      }
    ])
  }

  writing() {
    const { serviceName, tech } = this.answers

    mkdirp(serviceName)

    let templatePath = ''
    switch (tech) {
      case sADONIS:
        templatePath = sPASTAADONIS
        break
      case sEXPMONGODB:
        templatePath = sPASTAEXPMONGODB
        break
      case sEXPSEQUELIZE:
        templatePath = sPASTAEXPSEQUELIZE
        break
      default:
        break
    }
    this.destinationRoot(this.destinationPath(serviceName))
    this.log(this.destinationPath())

    this.fs.copyTpl(
      this.templatePath(path.join(templatePath, '/', 'package.json')),
      this.destinationPath('./package.json'),
      {
        // troca as tags <%= generatorName %> pelo valor passado por parametro
        generatorName: serviceName
      }
    )

    this.fs.copy(
      this.templatePath(path.join(templatePath, '/', 'readme.md')),
      this.destinationPath('./readme.md')
    )

    this.fs.copyTpl(
      this.templatePath(path.join(templatePath, '/', 'src/**/*.*')),
      this.destinationPath('./src/'),
      {
        generatorName: serviceName,
        generatorModel: _.capitalize(serviceName)
      }
    )

    // this.fs.copyTpl(
    //   this.templatePath('test.js'),
    //   this.destinationPath('test/' + this.namespace + '.js'), {
    //     namespace: this.namespace,
    //     generatorName: generatorName
    //   }
    // );
  }
}
