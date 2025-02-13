import React, { useState } from 'react';
import '../App.css';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import axios from "axios";
import { toast } from 'react-toastify';


const Form = ({ slot, onClose }) => {
  const [open, setOpen] = useState(true);
  const [reason, setReason] = useState("");
  const [contact, setContact] = useState("");

  const userId = localStorage.getItem('user_id');

  const handleSubmit = async () => {

    if (!userId) {
        alert("User ID is required!");
        return;
    }

    const appointmentData = {
        user_id: userId,
        date: slot.date,
        time: slot.time,
        reason,
        contact_no: contact,
    };


    try {
        const response = await axios.post("http://localhost:5000/appointments/book_appointment", appointmentData);

        if (response.status === 201) {
            toast.success("Appointment booked successfully!");
            onClose();  
        }
    } catch (error) {
        console.error("Error booking appointment:", error.response?.data || error.message);
        toast.error("Error booking appointment. Please try again.");
    }
};

const handleKeyDown = (event) => {
  if (event.key === "Enter") {
    handleSubmit();
  }
};

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
              <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
                  Book your appointment
                </h2>
              </div>

              <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <p>Date: {slot.date} | Time: {slot.time}</p>
                  <div>
                    <label htmlFor="reason" className="block text-sm/6 font-medium text-gray-900">
                      Reason
                    </label>
                    <div className="mt-2">
                      <input
                        id="reason"
                        name="reason"
                        type="text"
                        placeholder="Reason"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        required
                        className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="contact" className="block text-sm/6 font-medium text-gray-900">
                        Contact number
                      </label>
                    </div>
                    <div className="mt-2">
                      <input
                        id="contact"
                        name="contact"
                        type="text"
                        placeholder="Contact Number"
                        value={contact}
                        onChange={(e) => setContact(e.target.value)}
                        onKeyDown={handleKeyDown}
                        required
                        className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm/6"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Confirm Booking
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default Form;
