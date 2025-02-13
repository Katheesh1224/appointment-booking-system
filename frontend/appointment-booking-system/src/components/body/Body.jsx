import React, { useEffect, useState, } from 'react';
import './body.css'; 
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import Alert from "../Alert"; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Body = () => {

    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
    const [appointmentData, setAppointmentData] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem('token');
            
            if (!token) {
              setError('You need to be logged in');
              return;
            }
            
            try {
                console.log('API route reached');
              const response = await axios.get('http://localhost:5000/appointments/appointment_data', {
                headers: {
                  Authorization: `Bearer ${token}`, // Ensure it's prefixed with 'Bearer'
                },
              });
              
              setAppointmentData(response.data);
            } catch (err) {
              setError(err.response?.data?.error || 'Error fetching user data');
            }
          };          
    
        fetchUserData();
    }, []);

    const handleAddAppointment = () => {
        navigate('/home/appointment-booking');
    }
  
    return (
        <div className="body">
            <div className="welcome-container">
                <img src="./logo.png" alt="" className=""/>
                <h1>Welcome to PANURGIC Appointment Booking System</h1>
            </div>
            <div className="appointment-container">
                <div className="header">
                    <h2>Your upcoming appointments with Panurgic</h2>
                </div>
                <div className="appointment">
                    {appointmentData ? (
                        <div className='appointment-info'>
                            <div className="date">
                                <p>{appointmentData.date}</p>
                            </div>
                            <div className="reason">
                                <h3>{appointmentData.reason}</h3>
                            </div>
                            <div className="time">
                                <p>{appointmentData.time}</p>
                            </div>
                        </div>
                        
                    ) : (
                        <p>Loading...</p>
                    )}

                    <Menu as="div" className="relative inline-block text-left">
                        <div>
                            <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs hover:bg-gray-50">
                            <FontAwesomeIcon icon={faEllipsisVertical} />
                            </MenuButton>
                        </div>

                        <MenuItems
                            transition
                            className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                        >
                            <div className="py-1">
                                <MenuItem>
                                    <p
                                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                                    >
                                    Edit
                                    </p>
                                </MenuItem>
                                <MenuItem>
                                    <p
                                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:text-gray-900 data-focus:outline-hidden"
                                    onClick={() => setShowAlert(true)}
                                    >
                                    Delete
                                    </p>
                                </MenuItem>
                            </div>
                        </MenuItems>                        
                    </Menu>
                </div>
                <button className='add-button' onClick={handleAddAppointment}>Add Appointment</button>

            </div>
            {showAlert && <Alert message="Are you sure you want to cancel this appointment?" onClose={() => setShowAlert(false)} />}

        </div>
    );
};
      
export default Body;
