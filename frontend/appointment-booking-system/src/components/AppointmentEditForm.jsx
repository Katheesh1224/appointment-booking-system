import React, { useState, useEffect } from "react";
import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import axios from "axios";
import { toast } from 'react-toastify';


const AppointmentEditForm = ({ onClose, appointment }) => {
  const [open, setOpen] = useState(true);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [contact, setContact] = useState("");

  useEffect(() => {
    if (appointment) {
      setDate(appointment.date);
      setTime(appointment.time);
      setReason(appointment.reason);
      setContact(appointment.contact_no);
    }
  }, [appointment]);

  const handleEditAppointment = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("User not authenticated");
      return;
    }

    const updatedData = { date, time, reason, contact };
    try {
      const response = await axios.put(
        `http://localhost:5000/appointments/edit_appointment/${appointment.appointment_id}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        toast.success("Appointment updated successfully!");
        setOpen(false);
        onClose();
      }
    } catch (error) {
      console.error("Error updating appointment:", error);
      toast.error("Error updating appointment. Please try again.");
    }
  };

  const handleTimeChange = (e) => {
    const selectedTime = e.target.value;
    const [hours, minutes] = selectedTime.split(":").map(Number);

    if (hours < 8 || hours > 17 || (hours === 17 && minutes > 0)) {
      alert("Please select a time between 08:00 AM and 05:00 PM");
      return;
    }
    setTime(selectedTime);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleEditAppointment();
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold text-center">Edit Appointment</h2>
            <form onSubmit={handleEditAppointment} className="mt-4 space-y-4">
              <div>
                <label className="block font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700">Time</label>
                <input
                  type="time"
                  value={time}
                  onChange={handleTimeChange}
                  required
                  className="w-full p-2 border rounded"
                  min="08:00"
                  max="17:00"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700">Reason</label>
                <input
                  type="text"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700">Contact Number</label>
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  onKeyDown={handleKeyDown}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default AppointmentEditForm;
