import React, { useState, useEffect } from "react";
import axios from "axios";
import "./calendar.css";
import Form from "../../components/AppointmentForm";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";


const Calendar = () => {
    const [slots, setSlots] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [selectedSlot, setSelectedSlot] = useState(null);
    const user_id = localStorage.getItem("user_id");
    const navigate = useNavigate();

    
    const fetchSlots = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/appointments/available_slots?user_id=${user_id}`);
            setSlots(data);
        } catch (error) {
            console.error("Error fetching slots:", error);
        }
    };
    
    useEffect(() => {
        fetchSlots();
    }, []);
    
    const handleSlotClick = (slot) => {
        if (slot.status === "available") {
            setSelectedSlot(slot);
            setShowForm(true);
        }
    };

    return (
        <div className="container">
            <div className="c-header">
                <h1>Book your appointment</h1>
            </div>
            <div className="appointment-body">
                <div className="appointment-header">
                    <button className="previous" onClick={() => navigate('/home')}><span><FontAwesomeIcon icon={faAnglesLeft} /></span>Previous</button>
                    <h2>You can only book for the next five days</h2>
                </div>
                <div className="calendar">
                <div className="time">
                        <div className="time-slot">8 AM</div>
                        <div className="time-slot">9 AM</div>
                        <div className="time-slot">10 AM</div>
                        <div className="time-slot">11 AM</div>
                        <div className="time-slot">12 PM</div>
                        <div className="time-slot">1 PM</div>
                        <div className="time-slot">2 PM</div>
                        <div className="time-slot">3 PM</div>
                        <div className="time-slot">4 PM</div>
                        <div className="time-slot">5 PM</div>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                {[...new Set(slots.map((slot) => slot.date))].map((date) => (
                                    <th key={date}>{new Date(date).toDateString()}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00"].map((time) => (
                                <tr key={time}>
                                    {slots
                                        .filter((slot) => slot.time === time)
                                        .map((slot) => (
                                            <td key={slot.date} className={slot.status} onClick={() => handleSlotClick(slot)}>
                                                {slot.status === "available"
                                                    ? "Available"
                                                    : slot.status === "unavailable"
                                                    ? "Unavailable"
                                                    : slot.reason} {/* Show reason if booked */}
                                            </td>
                                        ))}
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>
            {showForm && <Form slot={selectedSlot} onClose={() => setShowForm(false)} />}
        </div>
    );
};

export default Calendar;
