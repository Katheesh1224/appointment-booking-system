const express = require('express');
const pool = require('../config/db');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();


const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' }); 
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.userId; 
    next(); 
  } catch (err) {
    return res.status(403).json({ error: 'Invalid or expired token' }); 
  }
};


router.get('/userdata', verifyToken, async (req, res) => { 
  try {
    const [user] = await pool.query('SELECT * FROM users WHERE user_id = ?', [req.userId]);
    
    if (user.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    res.json(user[0]); 
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving user data' });
  }
});


router.get('/appointment_data', verifyToken, async (req, res) => { 
  console.log('API route reached');
  try {
    const [appointment] = await pool.query('SELECT * FROM appointments WHERE user_id = ?', [req.userId]);
    
    if (appointment.length === 0) {
      return res.status(404).json({ error: 'Appointment not found' });
    }
    
    res.json(user[0]); 
  } catch (err) {
    res.status(500).json({ error: 'Error retrieving appointment data' });
  }
});


router.get("/available_slots", async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const fiveDaysLater = new Date();
  fiveDaysLater.setDate(today.getDate() + 5);
  fiveDaysLater.setHours(23, 59, 59, 999);

  const availableTimes = [
      "08:00", "09:00", "10:00", "11:00", "12:00",
      "13:00", "14:00", "15:00", "16:00", "17:00",
  ];

  try {
      const [bookings] = await pool.query(
        "SELECT appointment_id, user_id, DATE_FORMAT(date, '%Y-%m-%d') AS date, DATE_FORMAT(time, '%H:%i') AS time, reason FROM appointments WHERE date BETWEEN ? AND ?",
        [today.toISOString().split("T")[0], fiveDaysLater.toISOString().split("T")[0]]
    );

      const bookedSlots = {};
      bookings.forEach(({ date, time, user_id, reason }) => {
          if (!bookedSlots[date]) bookedSlots[date] = {};
          bookedSlots[date][time] = { user_id, reason };
      });

      const slots = [];
      for (let i = 0; i < 5; i++) {
          const date = new Date(today);
          date.setDate(today.getDate() + i);
          const dateString = date.toISOString().split("T")[0]; 

          availableTimes.forEach((time) => {
              let status = "available";
              let reason = "";

              if (bookedSlots[dateString]?.[time]) {
                  if (bookedSlots[dateString][time].user_id == req.query.user_id) {
                      status = "booked";
                      reason = bookedSlots[dateString][time].reason; 
                  } else {
                      status = "unavailable"; 
                  }
              }

              slots.push({ date: dateString, time, status, reason });
          });
      }

      res.json(slots);
  } catch (err) {
      console.error("Error fetching slots:", err);
      res.status(500).json({ error: "Error fetching slots" });
  }
});


router.post("/book_appointment", async (req, res) => {
  const { user_id, date, time, reason, contact_no } = req.body;

  if (!user_id || !date || !time || !reason || !contact_no) {
      return res.status(400).json({ error: "All fields are required!" });
  }

  try {
      const query = `
          INSERT INTO appointments (user_id, date, time, reason, contact_no)
          VALUES (?, ?, ?, ?, ?)`;
      const values = [user_id, date, time, reason, contact_no];

      await pool.query(query, values);

      return res.status(201).json({ message: "Appointment booked successfully!" });

  } catch (error) {
      console.error("Database Error:", error);
      return res.status(500).json({ error: "Internal Server Error. Please try again later." });
  }
});



module.exports = router;