const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  assignedAgent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agent'
  }
});

module.exports = mongoose.model('Record', recordSchema);
