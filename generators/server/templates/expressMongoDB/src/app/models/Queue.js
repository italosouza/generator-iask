const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const QueueSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

QueueSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Queue', QueueSchema)
