import React, { useState } from 'react';
import './calendar.css'; 
import Form from '../components/AppointmentForm';



const Calendar = () => {

    const [showForm, setShowForm] = useState(false);
    
  
    return (
        <div className="container">
            <div className="c-header">
                <h1>Book your appointment</h1>
            </div>
            <div className="appointment-body">
                <div className="appointment-header">
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
                                <th>Mon 11</th>
                                <th>Tue 12</th>
                                <th>Wed 13</th>
                                <th>Thu 14</th>
                                <th>Fri 15</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><div className='available' onClick={() => setShowForm(true)}>Available</div></td>
                                <td><div className='unavailable'>Unavailable</div></td>
                                <td><div className='booked'>Your Appointment</div></td>
                                <td><div className='unavailable'>Unavailable</div></td>
                                <td><div className='available'>Available</div></td>
                            </tr>
                            <tr>
                                <td><div className='available'>Available</div></td>
                                <td><div className='available'>Available</div></td>
                                <td><div className='unavailable'>Unavailable</div></td>
                                <td><div className='unavailable'>Unavailable</div></td>
                                <td><div className='available'>Available</div></td>
                            </tr>
                            <tr>
                                <td><div className='available'>Available</div></td>
                                <td><div className='unavailable'>Unavailable</div></td>
                                <td><div className='unavailable'>Unavailable</div></td>
                                <td><div className='unavailable'>Unavailable</div></td>
                                <td><div className='available'>Available</div></td>
                            </tr>
                            <tr>
                                <td><div className='available'>Available</div></td>
                                <td><div className='available'>Available</div></td>
                                <td><div className='available'>Available</div></td>
                                <td><div className='booked'>Your Appointment</div></td>
                                <td><div className='unavailable'>Unavailable</div></td>
                            </tr>
                            <tr>
                                <td><div className='available'>Available</div></td>
                                <td><div className='unavailable'>Unavailable</div></td>
                                <td><div className='available'>Available</div></td>
                                <td><div className='available'>Available</div></td>
                                <td><div className='unavailable'>Unavailable</div></td>
                            </tr>
                            <tr>
                                <td><div className='unavailable'>Unavailable</div></td>
                                <td><div className='available'>Available</div></td>
                                <td><div className='available'>Available</div></td>
                                <td><div className='available'>Available</div></td>
                                <td><div className='unavailable'>Unavailable</div></td>
                            </tr>
                            <tr>
                                <td><div className='unavailable'>Unavailable</div></td>
                                <td><div className='available'>Available</div></td>
                                <td><div className='available'>Available</div></td>
                                <td><div className='unavailable'>Unavailable</div></td>
                                <td><div className='unavailable'>Unavailable</div></td>
                            </tr>
                            <tr>
                                <td><div className='available'>Available</div></td>
                                <td><div className='available'>Available</div></td>
                                <td><div className='unavailable'>Unavailable</div></td>
                                <td><div className='booked'>Your Appointment</div></td>
                                <td><div className='unavailable'>Unavailable</div></td>
                            </tr>
                            <tr>
                                <td><div className='unavailable'>Unavailable</div></td>
                                <td><div className='booked'>Your Appointment</div></td>
                                <td><div className='unavailable'>Unavailable</div></td>
                                <td><div className='unavailable'>Unavailable</div></td>
                                <td><div className='available'>Available</div></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            {showForm && <Form message="Are you sure you want to cancel this appointment?" onClose={() => setShowForm(false)} />}

        </div>
    );
};
      
export default Calendar;
