const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');
const multer = require('multer');
const Record = require('../models/Record');
const Agent = require('../models/Agent');


if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}


const storage = multer.diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    cb(null, `upload-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'text/csv' || file.originalname.endsWith('.csv')) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only CSV files are allowed.'));
    }
  }
}).single('file');


exports.uploadCSV = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      console.error('Upload Error:', err);
      return res.status(500).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const results = [];


    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (data) => {
        if (data.name && data.email && data.mobile) {
          results.push(data);
        }
      })
      .on('end', async () => {
        try {
         
          const agents = await Agent.find();
          if (agents.length < 5) {
            return res.status(400).json({ error: 'Less than 5 agents available' });
          }

        
          const recordsToSave = results.map((record, index) => ({
            name: record.name,
            email: record.email,
            mobile: record.mobile,
            assignedAgent: agents[index % 5]._id
          }));

         
          await Record.insertMany(recordsToSave);
          res.status(200).json({ message: 'CSV uploaded & records distributed successfully!' });
        } catch (saveError) {
          console.error('DB Save Error:', saveError);
          res.status(500).json({ error: 'Failed to save records to database' });
        }
      });
  });
};


exports.getRecords = async (req, res) => {
  try {
    const records = await Record.find().populate('assignedAgent', 'name email');
    res.status(200).json(records);
  } catch (err) {
    console.error('Fetch Records Error:', err);
    res.status(500).json({ error: 'Failed to fetch records' });
  }
};
