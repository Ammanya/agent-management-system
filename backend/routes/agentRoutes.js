const express = require('express');
const router = express.Router();
const agentController = require('../controllers/agentController');

router.post('/', agentController.addAgent);
router.get('/', agentController.getAgents);

module.exports = router;
