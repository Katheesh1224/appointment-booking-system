### **Appointment Booking System**  

Project Overview

The Appointment Booking System allows users to:  
✅ View available time slots.  
✅ Book an appointment.  
✅ View and manage their booked appointments.  
✅ Cancel an appointment.  
---

This full-stack application is built with React.js for the frontend and Node.js (Express.js) for the backend. It uses MySQL for the database and JWT authentication for secure login.  

Tech Stack  
- Frontend: React.js, Tailwind CSS, Plain CSS  
- Backend: Node.js, Express.js  
- Authentication: JWT (JSON Web Token)  
- Database: MySQL  
- Notifications: React-Toastify  
- State Management: React useState & useEffect  
- Other Tools: Axios for API requests  
---

Setup & Installation  

1. Clone the Repository  
```bash
git clone https://github.com/your-username/appointment-booking-system.git
cd appointment-booking-system
```

2.Set Up the Backend (Node.js + Express.js)
```bash
cd backend
npm install
```
Create a .env file in the backend directory and add the following:
```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=appointments_db
JWT_SECRET=your_secret_key
```
Then, start the backend server:
```bash
npm start (or) nodemon server.js
```

3. Set Up the Frontend (React.js)
```bash
cd ../frontend/appointment-booking-system
npm install
npm start
```
Now, the frontend will be running at http://localhost:3000/.

Features:
- Authentication: Users can sign up and log in securely using JWT.
- Appointment Booking: Users can view available slots and book appointments.
- Appointment Management: Users can edit or cancel their booked appointments.
- Real-Time Status: Available, booked, and unavailable slots are displayed dynamically.
- User Validation: Checks that user is already exist or not based on the email

Slots
- Available:  No appointments
- Booked:  Slot booked by the current user
- unavailable:  Slot booked by ather users
---

API Endpoints:

Authentication

Method	                  Endpoint	                                Description
- POST	                /auth/signup	                        User registration
- POST	                /auth/signin	                        User login
- POST                  /auth/logout                          User logout 
- GET                   /auth/check-email                      check user email exist or not

Appointments

Method	                        Endpoint	                                                    Description
- GET                   /appointments/userdata                                        Get user details 
- GET	                  /appointments/appointment_data	                              Get user’s booked appointments
- PUT	                  /appointments/edit_appointment/:appointment_id	              Get user’s booked appointments
- DELETE	              /appointments/delete/:appointment_id	                        Cancel an appointment
- GET	                  /appointments/available_slots	                                Get available, booked and unavailable slots
- POST	                /appointments/book_appointment	                              Book an appointment









