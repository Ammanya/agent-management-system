const express = require('express');
const router = express.Router();
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const Task = require('../models/Task');
const Agent = require('../models/Agent');


const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext === '.csv' || ext === '.xlsx' || ext === '.xls') {
      cb(null, true);
    } else {
      cb(new Error('Only .csv, .xlsx, .xls allowed'));
    }
  },
});


router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const agents = await Agent.find();
    if (agents.length < 5) return res.status(400).json({ error: 'Add at least 5 agents first.' });

    const results = [];

    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (data) => {
        results.push({
          firstName: data.FirstName,
          phone: data.Phone,
          notes: data.Notes || '',
        });
      })
      .on('end', async () => {
        const distributedTasks = [];
        const agentCount = 5;

        results.forEach((item, index) => {
          const agentIndex = index % agentCount;
          const task = new Task({
            ...item,
            agent: agents[agentIndex]._id,
          });
          distributedTasks.push(task.save());
        });

        await Promise.all(distributedTasks);
        fs.unlinkSync(req.file.path);
        res.status(200).json({ message: 'Tasks distributed successfully' });
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Task distribution failed' });
  }
});


router.get('/', async (req, res) => {
    try {
      const tasks = await Task.find().populate('agent');
      res.status(200).json(tasks);
    } catch (err) {
      console.error('Error fetching tasks:', err); 
      res.status(500).json({ error: 'Failed to fetch tasks', message: err.message });
    }
  });
  

module.exports = router;
