const path = require('path')
const Generator = require('yeoman-generator')
const _ = require('lodash')
const mkdirp = require('mkdirp')
const yosay = require('yosay')

const sPASTAADONIS = 'adonisjs'
const sPASTAEXPMONGODB = 'expressMongoDB'
const sPASTAEXPSEQUELIZE = 'expressSequelize'
const sADONIS = 'AdonisJS'
const sEXPMONGODB = 'ExpressJS - MongoDB'
const sEXPSEQUELIZE = 'ExpressJS - Sequelize'

module.exports = class extends Generator {
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
          \nyo iask:server NOME_BACKEND`,
          { maxLength: 50 }
        )
      )
      process.exit(1)
    }
  }

  async prompting() {
    if (!this.projectRoot) {
      this.answers = await this.prompt([
        {
          type: 'input',
          name: 'serviceName',
          default: 'core-api',
          filter: val => val.toLowerCase(),
          message: 'Informe o nome do serviço (API):'
        }
      ])
    } else {
      this.answers = { serviceName: this.projectName }
      this.projectName = ''
    }

    const techPrompt = await this.prompt([
      {
        type: 'list',
        name: 'tech',
        message: 'Qual tecnologia vamos utilizar?',
        choices: [sADONIS, sEXPMONGODB, sEXPSEQUELIZE],
        validate: answer => {
          return answer.length < 1 ? 'Necessário escolher pelo menos uma opção.' : true
        }
      }
    ])

    const { tech } = techPrompt
    const { projectName } = this
    this.answers = { ...this.answers, projectName, tech }
  }

  configuring() {
    if (path.basename(this.destinationPath()) !== this.projectName) {
      mkdirp(path.join(this.projectName, this.answers.serviceName))
    }
  }

  writing() {
    const { serviceName, tech } = this.answers
    const { projectName } = this

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

    this.fs.copyTpl(
      this.templatePath(path.join(templatePath, './**/*.*')),
      this.destinationPath(path.join(projectName, serviceName)),
      {
        generatorName: serviceName,
        generatorModel: _.capitalize(serviceName)
      }
    )

    this.fs.copyTpl(
      this.templatePath(path.join(templatePath, './**/.*')),
      this.destinationPath(path.join(projectName, serviceName)),
      {
        generatorName: serviceName,
        generatorModel: _.capitalize(serviceName)
      }
    )

    this.fs.copyTpl(
      this.templatePath(path.join(templatePath, 'dockerfile')),
      this.destinationPath(path.join(projectName, serviceName, 'dockerfile'))
    )
  }
}
