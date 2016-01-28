var jwt = require('jwt-simple');
var bcrypt = require('bcrypt-nodejs');

module.exports = function(app) {
  var auth = {};


  auth.validarAutenticacao = function(req, res, next) {
    return next();

    // var _token = req.headers['x-auth'];

    // if (_token) {
    //   console.log('Validando token\n');

    //   _token = jwt.decode(_token, app.get('secretKey'));

    //   var Usuario = app.models.usuario;
    //   Usuario.findOne({
    //       nome: _token.usuario.nome,
    //       senha: _token.usuario.senha
    //     })
    //     // .select('senha')
    //     .select('nome')
    //     .exec(function(err, pUsuario) {
    //       if (err) {
    //         return next(err);
    //       }
    //       if (!pUsuario) {
    //         return res.sendStatus(401);
    //       }

    //       return next();
    //     });
    // } else {
    //   res.sendStatus('401');
    // }
  };


  auth.validarSenhaUsuario = function(pUsuario, psSenha, next, callBack) {
    bcrypt.compare(psSenha, pUsuario.senha, function(err, pSenhaValida) {
      if (err) {
        return next(err);
      }

      if (!pSenhaValida) {
        var erro = {
          code: 401,
          msg: 'Senha inválida'
        };
        return callBack(erro);
      }

      var _token = jwt.encode({
        usuario: pUsuario
      }, app.get('secretKey'));

      callBack(null, _token);

    });
  };

  auth.login = function(req, res, next) {

    var Usuario = app.models.usuario;
    Usuario.findOne({
        nome: req.body.nome
      })
      // .select('senha')
      // .select('nome')
      .exec(function(err, pUsuario) {
        if (err) {
          return next(err);
        }
        if (!pUsuario) {
          return res.sendStatus(401);
        }

        auth.validarSenhaUsuario(pUsuario, req.body.senha, next, function(err, token) {
          if (err) {
            res.status(err.code).json(err.msg);
          }
          res.status(200).json(token);
        });

      });

  };

  return auth;
};
