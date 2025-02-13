const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');
const router = express.Router();


// User registration
router.post('/signup', async (req, res) => {
  const { email, username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const [result] = await pool.query("INSERT INTO users (email, username, password) VALUES (?, ?, ?)", [email, username, hashedPassword]);
    res.json({ message: 'User registered successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Error registering user' });
  }
});


// User login
router.post('/signin', async (req, res) => {
  const { email, password } = req.body; 

  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

    if (rows.length === 0) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, rows[0].password);

    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ userId: rows[0].user_id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Login successful', token, userId: rows[0].user_id });

  } catch (err) {
    res.status(500).json({ error: 'Error logging in' });
  }
});


// User logout
router.post('/logout', (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1]; 
  console.log('API route reached'); 


  if (!token) {
    return res.status(400).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    res.json({ message: 'Logged out successfully' });

  } catch (err) {
    return res.status(400).json({ error: 'Invalid or expired token' });
  }
});


// Check if email is available
router.get('/check-email', async (req, res) => {
  const { email } = req.query;

  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);

    if (rows.length > 0) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    res.status(200).json({ message: 'Email is available' });
  } catch (err) {
    res.status(500).json({ error: 'Error checking email' });
  }
});

module.exports = router;
