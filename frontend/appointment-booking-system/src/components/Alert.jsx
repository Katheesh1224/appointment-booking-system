import React, { useState } from "react";
import axios from "axios";
import "../App.css";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";

const Alert = ({ onClose, appointmentId, onDeleteSuccess }) => {
  const [open, setOpen] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleDeleteAppointment = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("User not authenticated");
        setLoading(false);
        return;
      }

      const response = await axios.delete(`http://localhost:5000/appointments/delete/${appointmentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        alert("Appointment deleted successfully!");
        setOpen(false);
        onDeleteSuccess(); 
      }
    } catch (error) {
      console.error("Error deleting appointment:", error);
      alert(error.response?.data?.error || "Failed to delete appointment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} className="relative z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity" />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-12 h-12 bg-red-100 rounded-full">
                <FontAwesomeIcon icon={faTriangleExclamation} className="text-red-500 text-xl" />
              </div>
              <div>
                <DialogTitle className="text-lg font-semibold text-gray-900">
                  Cancel Appointment
                </DialogTitle>
                <p className="text-sm text-gray-500 mt-2">
                  Are you sure you want to cancel your appointment? This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="flex justify-end mt-6 space-x-2">
              <button
                type="button"
                disabled={loading}
                onClick={handleDeleteAppointment}
                className="px-4 py-2 text-sm font-semibold text-white bg-red-600 rounded hover:bg-red-500"
              >
                {loading ? "Deleting..." : "Delete Appointment"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-semibold text-gray-900 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default Alert;
