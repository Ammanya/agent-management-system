const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  firstName: String,
  phone: String,
  notes: String,
  agentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Agent',
  },
});

module.exports = mongoose.model('Contact', contactSchema);
