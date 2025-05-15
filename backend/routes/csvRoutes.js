const express = require('express');
const router = express.Router();
const csvController = require('../controllers/csvController');


router.post('/upload', csvController.uploadCSV);


router.get('/records', csvController.getRecords);

module.exports = router;
