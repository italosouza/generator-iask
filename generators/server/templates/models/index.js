var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

module.exports = function() {

  var schema = mongoose.Schema({
    nome: {
      type: String,
      required: true,
      index: {
        unique: true
      }
    },
    descricao: {
      type: String
    },
    inclusao: {
      type: Date,
      default: Date.now
    }
  });

  schema.plugin(findOrCreate);
  return mongoose.model('<%= generatorModel %>', schema);

};
