import React, { useEffect, useState } from 'react';
import './body.css';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import Alert from '../Alert';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AppointmentEditForm from '../AppointmentEditForm';
import Profile from '../profile/Profile';

const Body = () => {
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [appointmentData, setAppointmentData] = useState([]);
  const [error, setError] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);


  useEffect(() => {
    const fetchAppointmentData = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('You need to be logged in');
        return;
      }

      try {
        const response = await axios.get('http://localhost:5000/appointments/appointment_data', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAppointmentData(response.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Error fetching appointment data');
        console.error(err);
      }
    };

    fetchAppointmentData();
  }, []);

  const handleAddAppointment = () => {
    navigate('/home/appointment-booking');
  };

  const handleEditClick = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const [appointments, setAppointments] = useState([]);

const fetchAppointments = async () => {
  try {
    const response = await axios.get("http://localhost:5000/appointments", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
    setAppointments(response.data);
  } catch (error) {
    console.error("Error fetching appointments:", error);
  }
};

useEffect(() => {
  fetchAppointments();
}, []);


  const openDeleteDialog = (appointmentId) => {
    setSelectedAppointmentId(appointmentId);
    setShowAlert(true);
  };  

  return (
    <div className="body">
      <Profile/>
      <div className="appointment-container">
        <div className="header">
          <h2>Your upcoming appointments with Panurgic</h2>
        </div>
        {appointmentData.length > 0 ? (
          appointmentData.map((appointment, index) => (
            <div key={index} className="appointment">
              <div className="appointment-details">
                <div className="date">
                  <p>{appointment.date}</p>
                </div>
                <div className="reason">
                  <h3>{appointment.reason}</h3>
                </div>
                <div className="time">
                  <p>{appointment.time}</p>
                </div>
              </div>

              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-xs hover:bg-gray-50">
                    <FontAwesomeIcon icon={faEllipsisVertical} />
                  </MenuButton>
                </div>

                <MenuItems className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5">
                  <div className="py-1">
                    <MenuItem>
                      <p
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => handleEditClick(appointment)}
                      >
                        Edit
                      </p>
                    </MenuItem>
                    <MenuItem>
                      <p
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => openDeleteDialog(appointment.appointment_id)}
                      >
                        Cancel
                      </p>
                    </MenuItem>
                  </div>
                </MenuItems>
              </Menu>
            </div>
          ))
        ) : (
          <p>No upcoming appointments.</p>
        )}
        <button className="add-button" onClick={handleAddAppointment}>
          Add Appointment
        </button>
      </div>

      {showAlert && selectedAppointmentId && (<Alert onClose={() => setShowAlert(false)} appointmentId={selectedAppointmentId} onDeleteSuccess={fetchAppointments} />)}
      {selectedAppointment && <AppointmentEditForm appointment={selectedAppointment} onClose={() => setSelectedAppointment(null)} />}
    </div>
  );
};

export default Body;
