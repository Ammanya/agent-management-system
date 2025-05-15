const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = 'admin123';


router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    const token = jwt.sign({ username }, 'your_jwt_secret_key', { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

module.exports = router;
