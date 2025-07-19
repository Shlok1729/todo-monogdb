const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  priority: {
    type: String,
    enum: ['Low', 'High', 'Urgent'],
    default: 'Low'
  }
});

module.exports = mongoose.model('Task', taskSchema);
