var bcrypt = require('bcrypt-nodejs');

module.exports = function(app) {
  var controller = {};
  //definir o MODEL
  var _objeto = app.models.usuario;

  controller.listar = function(req, res) {
    _objeto.find().exec()
      .then(function(pObjeto) {
          res.json(pObjeto);
        },
        function(erro) {
          console.error('Listar -> Erro: \n', erro);
          res.status(500).json(erro);
        });
  };

  controller.buscar = function(req, res) {
    var _id = req.params.id;
    _objeto.findById(_id).exec()
      .then(function(pObjeto) {
          res.status(200).json(pObjeto);
        },
        function(erro) {
          console.error('Buscar -> Erro: \n', erro);
          res.status(500).json(erro);
        });
  };

  controller.buscarPorNome = function(psNome) {
    var _obj = {};
    _objeto.find({
        nome: psNome
      }).exec()
      .then(function(pObjeto) {
        _obj = pObjeto;
      });
    return _obj;
  };

  controller.remover = function(req, res) {
    var _id = req.params.id;
    _objeto.remove({
        "_id": _id
      }).exec()
      .then(function() {
          res.status(204).end();
        },
        function(erro) {
          console.error('Remover -> Erro: \n', erro);
          res.status(500).json(erro);
        });
  };

  controller.salvar = function(req, res) {
    var _body = req.body;
    _body.senha = bcrypt.hashSync(req.body.senha);

    if (_body._id) {
      _objeto.findByIdAndUpdate(_body._id, _body).exec()
        .then(function(pObjeto) {
            res.status(200).json(_body);
          },
          function(erro) {
            console.error('Salvar -> Alterar -> Erro: \n', erro);
            res.status(500).json(erro);
          });
    } else {
      _objeto.create(_body)
        .then(function(pObjeto) {
            res.status(200).json(pObjeto);
          },
          function(erro) {
            console.error('Salvar -> Incluir -> Erro: \n', erro);
            res.status(500).json(erro);
          });
    }
  };

  return controller;
};
