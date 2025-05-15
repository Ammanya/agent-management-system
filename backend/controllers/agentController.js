const Agent = require('../models/Agent');
const bcrypt = require('bcryptjs');


exports.addAgent = async (req, res) => {
  const { name, email, mobile, password } = req.body;

  try {
    const existing = await Agent.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Agent already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newAgent = new Agent({ name, email, mobile, password: hashedPassword });

    await newAgent.save();
    res.status(201).json({ message: 'Agent added successfully' });
  } catch (error) {
    console.error('Add agent error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getAgents = async (req, res) => {
  try {
    const agents = await Agent.find().select('-password');
    res.json(agents);
  } catch (error) {
    console.error('Get agents error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
