const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const VmSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  available: {
    type: Boolean,
    required: true,
    default: true
  },
  ip: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

VmSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Vm', VmSchema)
