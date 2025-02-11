import React from 'react';
import '../App.css'; 
import { useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel} from '@headlessui/react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

const Form = () => {

    const [open, setOpen] = useState(true)

  
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
                                <form action="#" method="POST" className="space-y-6">
                                    <div>
                                        <label htmlFor="reason" className="block text-sm/6 font-medium text-gray-900">
                                            Reason
                                        </label>
                                        <div className="mt-2">
                                        <input
                                            id="reason"
                                            name="reason"
                                            type="text"
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
                                            type="contact"
                                            required
                                            className="block w-full rounded-md border border-gray-300 bg-white px-3 py-1.5 text-base text-gray-900 placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm/6"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <button
                                        type="submit"
                                        onClick={() => setOpen(false)}
                                        className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                        Book Appointment
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
