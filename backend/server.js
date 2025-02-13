const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: 'http://localhost:3000', // Your React frontend URL
    credentials: true,
  }));

 app.use(bodyParser.json());

// Routes
const authRoutes = require('./routes/auth');
const appointmentRoutes = require('./routes/appointments');

app.use('/auth', authRoutes);
app.use('/appointments', appointmentRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));

// const crypto = require('crypto');
// const secretKey = crypto.randomBytes(64).toString('hex');
// console.log(secretKey);

