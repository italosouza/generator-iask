/**
 * @brief implementa as rotas utilizadas pelo modulo usuario
 * @details [long description]
 *
 * @return json string
 * @param req
 * @param res
 * @param next
 */

module.exports = function(app) {
  var controller = app.controllers.usuario;
  var auth = app.services.auth;

  app.route('/usuario')
    .get(auth.validarAutenticacao, controller.listar)
    .post(auth.validarAutenticacao, controller.salvar);

  app.route('/usuario-teste')
    .post(controller.salvar);

  app.route('/usuario/login')
    .post(auth.login);

  app.route('/usuario/:id')
    .get(auth.validarAutenticacao, controller.buscar)
    .delete(auth.validarAutenticacao, controller.remover);
};
