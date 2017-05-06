module.exports = function (app) {
  var controller = app.controllers.<%= generatorName %>;
  var auth = app.services.auth;

  app.route('/<%= generatorName %>')
    .get(auth.validarAutenticacao, controller.listar)
    .post(auth.validarAutenticacao, controller.salvar);

  app.route('/<%= generatorName %>/:id')
    .get(auth.validarAutenticacao, controller.buscar)
    .put(auth.validarAutenticacao, controller.salvar)
    .delete(auth.validarAutenticacao, controller.remover);
};