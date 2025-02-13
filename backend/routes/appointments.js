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


//Fetch user data
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


//Fetch all appointments of a user
router.get('/appointment_data', verifyToken, async (req, res) => { 
  try {
    const [appointments] = await pool.query(
      "SELECT appointment_id, user_id, DATE_FORMAT(date, '%Y-%m-%d') AS date, DATE_FORMAT(time, '%H:%i') AS time, reason, contact_no FROM appointments WHERE user_id = ? AND CONCAT(date, ' ', time) >= NOW() ORDER BY date, time",
      [req.userId]
    );

    if (appointments.length === 0) {
      return res.status(404).json({ error: 'No upcoming appointments found' });
    }
    
    res.json(appointments);  
  } catch (err) {
    console.error("Database Error:", err);
    res.status(500).json({ error: 'Error retrieving appointment data' });
  }
});


//Edit an appointment
router.put('/edit_appointment/:appointment_id', verifyToken, async (req, res) => { 
  try {
    const { appointment_id } = req.params;
    const { date, time, reason, contact } = req.body;

    if (!date || !time || !reason || !contact) {
      return res.status(400).json({ error: "All fields (date, time, reason, contact) are required." });
    }

    const [existingAppointment] = await pool.query(
      "SELECT * FROM appointments WHERE appointment_id = ? AND user_id = ?",
      [appointment_id, req.userId]
    );

    if (existingAppointment.length === 0) {
      return res.status(404).json({ error: "Appointment not found or unauthorized to edit." });
    }

    await pool.query(
      "UPDATE appointments SET date = ?, time = ?, reason = ?, contact_no = ? WHERE appointment_id = ? AND user_id = ?",
      [date, time, reason, contact, appointment_id, req.userId]
    );

    res.json({ success: true, message: "Appointment updated successfully." });
  } catch (err) {
    console.error("Database Error:", err);
    res.status(500).json({ error: "Error updating appointment." });
  }
});


//Cancel an appointment
router.delete('/delete/:appointment_id', verifyToken, async (req, res) => {
  try {
    const { appointment_id } = req.params;
    const [appointment] = await pool.query(
      "SELECT * FROM appointments WHERE appointment_id = ? AND user_id = ?",
      [appointment_id, req.userId]
    );

    if (appointment.length === 0) {
      return res.status(404).json({ error: "Appointment not found or unauthorized to delete." });
    }

    await pool.query("DELETE FROM appointments WHERE appointment_id = ? AND user_id = ?", [appointment_id, req.userId]);

    res.json({ success: true, message: "Appointment deleted successfully." });
  } catch (err) {
    console.error("Database Error:", err);
    res.status(500).json({ error: "Error deleting appointment." });
  }
});


// Fetch available, booked and unavailable slots
router.get("/available_slots", async (req, res) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const fiveDaysLater = new Date();
  fiveDaysLater.setDate(today.getDate() + 8);
  fiveDaysLater.setHours(23, 59, 59, 999);

  const availableTimes = [
      "08:00", "09:00", "10:00", "11:00", "12:00",
      "13:00", "14:00", "15:00", "16:00", "17:00",
  ];

  try {
      const [bookings] = await pool.query(
          `SELECT appointment_id, user_id, 
                  DATE_FORMAT(date, '%Y-%m-%d') AS date, 
                  DATE_FORMAT(time, '%H:%i') AS time, 
                  reason, contact_no 
           FROM appointments 
           WHERE date >= CURDATE() AND date <= DATE_ADD(CURDATE(), INTERVAL 8 DAY)`
      );

      const bookedSlots = {};
      bookings.forEach(({ date, time, user_id, reason, contact_no, appointment_id }) => {
          if (!bookedSlots[date]) bookedSlots[date] = {};
          bookedSlots[date][time] = { user_id, reason, contact_no, appointment_id };
      });

      const slots = [];
      for (let i = 2; i < 9; i++) {  
          const date = new Date(today);
          date.setDate(today.getDate() + i);
          const dateString = date.toISOString().split("T")[0];

          availableTimes.forEach((time) => {
              let status = "available";
              let reason = "";
              let user_id = null;
              let contact_no = null;
              let appointment_id = null;

              if (bookedSlots[dateString]?.[time]) {
                  user_id = bookedSlots[dateString][time].user_id;
                  reason = bookedSlots[dateString][time].reason;
                  contact_no = bookedSlots[dateString][time].contact_no;
                  appointment_id = bookedSlots[dateString][time].appointment_id;

                  status = user_id == req.query.user_id ? "booked" : "unavailable";
              }

              slots.push({ date: dateString, time, status, reason, contact_no, user_id, appointment_id });
          });
      }
      res.json(slots);
  } catch (err) {
      console.error("Error fetching slots:", err);
      res.status(500).json({ error: "Error fetching slots" });
  }
});


//Appointment booking

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