const express = require('express');
const router = express.Router();
const Task = require('../models/Task');


router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find().populate('agent'); 
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
});

module.exports = router;
