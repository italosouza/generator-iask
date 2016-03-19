/**
 * Created by italo on 12/16/2015.
 */

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
    senha: {
      type: String,
      required: true
    },
    email: {
      type: String
    },
    inclusao: {
      type: Date,
      default: Date.now
    }
  });

  schema.plugin(findOrCreate);
  return mongoose.model('Usuario', schema);

};