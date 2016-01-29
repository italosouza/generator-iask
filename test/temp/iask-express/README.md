## Instalação

Primeiramente, instale [Yeoman](http://yeoman.io) e <%- generatorName %> usando o [npm](https://www.npmjs.com/) (presumimos que já tenha feito a instalação do [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g <%= generatorName %>
```

Para gerar um novo projeto:

```bash
yo <%= yoName %>
```

Para gerar um novo módulo no servidor (express):

```bash
yo <%= generatorName %>:server modulo
```

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).
