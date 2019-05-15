'use strict';
var path = require('path');
var Generator = require('yeoman-generator');
var _ = require('lodash');
var extend = require('deep-extend');
var mkdirp = require('mkdirp');
var yosay = require('yosay');

//valida o nome projeto
function gerarNomeProjeto(pNome) {
    pNome = _.kebabCase(pNome);
    return pNome;
}

module.exports = class extends Generator {

    constructor(args, opts) {
        super(args, opts)
        this.props = {};
    };

    /**
     * Your initialization methods (checking current project state, getting configs, etc)
     */
    initializing() {
        this.log('initializing')

    }

    /**
     * Where you prompt users for options (where you’d call this.prompt())
     */
    async prompting() {

        const answers = await this.prompt([{
                type: 'input',
                name: 'name',
                default: this.appname, // gerarNomeProjeto('iask-express'),
                filter: gerarNomeProjeto,
                message: 'Informe o nome do projeto:'
            },
            {
                type: "confirm",
                name: "cool",
                message: "Would you like to enable the Cool feature?"
            }
        ]);

        this.log(answers)

        // this.prompt(prompts, function(pRespostas) {
        //   this.props.name = pRespostas.name;

        //   done();
        // }

    };

    /**
     * Saving configurations and configure the project (creating .editorconfig files and other metadata files)
     */
    configuring() {

    }

    /**
     * If the method name doesn’t match a priority, it will be pushed to this group.
     */
    default () {
        //verifica se a pasta atual possui o mesmo nome informado no parametro
        if (path.basename(this.destinationPath()) !== this.props.name) {
            this.log(
                '\nPor padrão o gerador deve ser invocado apartir próprio diretório: ' + this.props.name + '\n' +
                'Neste caso, iremos criar esta pasta para você.\n'
            );
            mkdirp(this.props.name);
            this.destinationRoot(this.destinationPath(this.props.name));
        };

        this.fs.copyTpl(
            this.templatePath('*.js'),
            this.destinationPath(path.join('./'))
        );
        this.fs.copyTpl(
            this.templatePath('*.json'),
            this.destinationPath(path.join('./'))
        );
        this.fs.copy(
            this.templatePath('.gitignore'),
            this.destinationPath(path.join('./.gitignore'))
        );
        this.fs.copy(
            this.templatePath('*.md'),
            this.destinationPath(path.join('./'))
        );
        this.fs.copy(
            this.templatePath('.editorconfig'),
            this.destinationPath(path.join('./.editorconfig'))
        );

        //define o arquivo template (corresponde a pasta template contida na pasta autal [app])
        var pkg = this.fs.readJSON(this.templatePath('package.json'), {});
        extend(pkg, {
            name: this.props.name
        });
        this.fs.writeJSON(this.destinationPath('package.json'), pkg);

        //gerador do sub-modulo
        this.composeWith('config', {
            arguments: ['core']
        }, {
            local: require.resolve('../config')
        });

    };

    /**
     * Where you write the generator specific files (routes, controllers, etc)
     */
    writing() {};

    /**
     * Where installations are run (npm, bower)
     */
    install() {
        // this.installDependencies();
    };

    /**
     *  Called last, cleanup, say good bye, etc
     */
    end() {

        this.log(yosay(`
    \nAtenção às dependencias globais:\nnpm install -g @angular/cli gulp
    \nExperimente os comandos: \nyo iask:scaffold COMPONENTE\nnpm run build`, { maxLength: 50 }));
    }

};
