const path = require('path')
const Generator = require('yeoman-generator')
const _ = require('lodash')
// const extend = require('deep-extend')
const mkdirp = require('mkdirp')
const yosay = require('yosay')

function gerarNomeProjeto(pNome) {
  pNome = _.kebabCase(pNome)
  return pNome
}

const sBACKEND = 'Backend - API'
const sFRONTEND = 'Frontend - APP'

/**
 * Modulo inicial do gerador, ele gera a config padrao e permite a escolha de quais serviços serão gerados
 */
module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts)
    this.props = {}
  }

  /**
   * Your initialization methods (checking current project state, getting configs, etc)
   */
  initializing() {}

  /**
   * Where you prompt users for options (where you’d call this.prompt())
   */
  async prompting() {
    this.answers = await this.prompt([
      {
        type: 'input',
        name: 'projectName',
        default: gerarNomeProjeto('iask-express'),
        filter: gerarNomeProjeto,
        message: 'Informe o nome do projeto:'
      },
      {
        type: 'checkbox',
        name: 'modulos',
        message: 'Quais serviços iremos gerar?',
        choices: [sFRONTEND, sBACKEND],
        validate: function(answer) {
          if (answer.length < 1) {
            return 'Necessário escolher pelo menos uma opção.'
          }

          return true
        }
      }
    ])
  }

  /**
   * Saving configurations and configure the project (creating .editorconfig files and other metadata files)
   */
  configuring() {
    if (path.basename(this.destinationPath()) !== this.answers.projectName) {
      this.log(
        '\nPor padrão o gerador deve ser invocado apartir próprio diretório: ' +
          this.answers.projectName +
          '\n' +
          'Neste caso, iremos criar esta pasta para você.\n'
      )
      mkdirp(this.answers.projectName)
    }
  }

  /**
   * If the method name doesn’t match a priority, it will be pushed to this group.
   */
  default() {
    // gerador do sub-modulo

    this.composeWith(require.resolve('../config'), {
      arguments: [this.answers.projectName]
    })

    if (this.answers.modulos.includes(sFRONTEND)) {
      this.composeWith(require.resolve('../client'), {
        arguments: [this.answers.projectName]
      })
    }

    if (this.answers.modulos.includes(sBACKEND)) {
      this.composeWith(require.resolve('../server'), {
        arguments: [this.answers.projectName]
      })
    }
  }

  /**
   * Where you write the generator specific files (routes, controllers, etc)
   */
  writing() {}

  /**
   * Where installations are run (npm, bower)
   */
  install() {}

  /**
   *  Called last, cleanup, say good bye, etc
   */
  end() {
    this.log(
      yosay(
        `
    \nSucesso! Não esquece de acessar o diretorio
    \n${this.answers.projectName}
    \ne usar o comandos:
    \nyo iask:scaffold COMPONENTE
    `,
        { maxLength: 50 }
      )
    )
  }
}
