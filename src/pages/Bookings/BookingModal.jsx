
import { useState, useEffect } from 'react';
import useAxiosPublic from '../../hooks/useAxiosPublic';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useAdmin from '../../hooks/useAdmin';
import useStaff from '../../hooks/useStaff';
import useAuth from '../../hooks/useAuth';

const BookingModal = ({ date, slot, onClose }) => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const [isAdmin] = useAdmin();
    const [isStaff, isStaffLoading] = useStaff();

    const [name, setName] = useState('');
    const [customerEmail, setCustomerEmail] = useState(''); // Editable for staff
    const [phone, setPhone] = useState('');
    const [guests, setGuests] = useState(2);
    const [status, setStatus] = useState('');

    // Pre-fill customer email for non-staff (user email)
    useEffect(() => {
        if (!isStaff && user?.email) {
            setCustomerEmail(user.email);
        }
    }, [isStaff, user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isAdmin) {
            setStatus("Admins are not allowed to make bookings.");
            return;
        }
        if (!date || !slot) {
            setStatus("Invalid booking details.");
            return;
        }

        try {
            if (isStaff) {
                // Staff creates booking for a customer
                const bookingData = {
                    name,
                    customerEmail,
                    customerPhone: phone,
                    date: date.toISOString().split('T')[0],
                    time: slot,
                    createdBy: user?.email,
                };
                await axiosSecure.post('/staff-bookings', bookingData);
            } else {
                // Normal user booking
                const bookingData = {
                    name,
                    email: customerEmail,
                    phone,
                    guests,
                    date: date.toISOString().split('T')[0],
                    time: slot,
                };
                await axiosPublic.post('/api/book', bookingData);
            }

            setStatus('Reservation confirmed!');
            setTimeout(onClose, 1500);
        } catch (err) {
            const errorMsg = err.response?.data?.error || err.message || 'Error occurred.';
            setStatus(errorMsg);
        }
    };

    


    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded p-6 w-80 shadow-lg">
                <h3 className="text-xl font-semibold mb-4">
                    Book {slot} on {date?.toDateString()}
                </h3>

                {status ? (
                    <>
                        <p className={`mb-4 ${status.includes('confirmed') ? 'text-green-600' : 'text-red-600'}`}>
                            {status}
                        </p>
                        <button onClick={onClose} className="bg-blue-500 text-white px-3 py-1 rounded">
                            Close
                        </button>
                    </>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <input
                            type="text"
                            placeholder="Customer Name"
                            className="border p-2 w-full"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />

                        {!isStaffLoading && (
                            isStaff ? (
                                <>
                                    {/* STAFF email (readonly) */}
                                    <input
                                        type="email"
                                        className="border p-2 w-full bg-gray-100 text-gray-700"
                                        value={user?.email || ''}
                                        readOnly
                                        placeholder="Staff Email"
                                    />
                                    {/* CUSTOMER email (editable) */}
                                    <input
                                        type="email"
                                        className="border p-2 w-full"
                                        placeholder="Customer Email"
                                        value={customerEmail}
                                        onChange={(e) => setCustomerEmail(e.target.value)}
                                        required
                                    />
                                </>
                            ) : (
                                <input
                                    type="email"
                                    className="border p-2 w-full bg-gray-100 text-gray-700 cursor-not-allowed"
                                    value={customerEmail}
                                    readOnly
                                    placeholder="Your Email"
                                    required
                                />
                            )
                        )}

                        <input
                            type="tel"
                            placeholder="Customer Phone Number"
                            className="border p-2 w-full"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />

                        {/* Only normal users see guests field */}
                        {!isStaff && (
                            <input
                                type="number"
                                min={1}
                                className="border p-2 w-full"
                                value={guests}
                                onChange={(e) => setGuests(e.target.value)}
                                required
                            />
                        )}

                        <div className="flex justify-end space-x-2">
                            <button type="button" onClick={onClose}>Cancel</button>
                            <button
                                type="submit"
                                className={`px-3 py-1 rounded text-white ${isAdmin ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500'}`}
                                disabled={isAdmin}
                            >
                                Confirm
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default BookingModal;
