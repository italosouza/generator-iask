var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

module.exports = function() {

  var schema = mongoose.Schema({
    nome: {
      type: String
    },
    rota: {
      type: String,
      required: true,
      index: {
        unique: true
      }
    },
    icon: {
      type: String
    },
    descricao: {
      type: String
    },
    dtInclusao: {
      type: Date,
      default: Date.now
    },
    sistema: {
      type: String
    }
  });

  schema.plugin(findOrCreate);
  return mongoose.model('<%= generatorModel %>', schema);

};
