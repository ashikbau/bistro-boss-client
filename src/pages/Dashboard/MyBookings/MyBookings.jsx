import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';

const MyBookings = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();

    const [bookings, setBookings] = useState([]);
    const [editing, setEditing] = useState(null);
    const [editForm, setEditForm] = useState({});
    const [slots, setSlots] = useState({});

    // Fetch user bookings
    useEffect(() => {
        if (!user?.email) return;
        axiosSecure.get(`/my-bookings?email=${user.email}`)
            .then(res => setBookings(res.data))
            .catch(err => console.error(err));
    }, [axiosSecure, user]);

    // Fetch available time slots for editing booking
    useEffect(() => {
        if (!editing) return;
        const booking = bookings.find(b => b._id === editing);
        if (!booking) return;

        axiosSecure.get(`/api/slots?date=${booking.date}`)
            .then(res => setSlots(prev => ({ ...prev, [editing]: res.data })))
            .catch(err => console.error(err));
    }, [editing, bookings, axiosSecure]);

    // Delete booking
    const handleDelete = (id) => {
        Swal.fire({
            title: "Delete?",
            text: "Are you sure?",
            icon: "warning",
            showCancelButton: true
        }).then(result => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/my-bookings/${id}`)
                    .then(() => {
                        setBookings(prev => prev.filter(x => x._id.toString() !== id.toString()));
                        Swal.fire("Deleted!", "Booking removed.", "success");
                    })
                    .catch(err => console.error(err));
            }
        });
    };

    // Update booking
    const handleUpdate = (b) => {
        const dataToUpdate = {
            date: editForm.date ?? b.date,
            time: editForm.time ?? b.time,
            guests: editForm.guests ?? b.guests
        };

        axiosSecure.put(`/my-bookings/${b._id}`, dataToUpdate)
            .then(res => {
                // Update UI instantly
                setBookings(prev =>
                    prev.map(item =>
                        item._id.toString() === b._id.toString() ? { ...item, ...res.data } : item
                    )
                );
                setEditing(null);
                setEditForm({});
                Swal.fire("Success", "Booking updated successfully", "success");
            })
            .catch(err => {
                console.error("Update failed:", err.response?.data || err.message);
                Swal.fire("Error", "Failed to update booking", "error");
            });
    };

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
            <table className="table-auto w-full border">
                <thead>
                    <tr className="bg-gray-100">
                        <th>Date</th>
                        <th>Time</th>
                        <th>Guests</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map(b => (
                        <tr key={b._id?.toString()} className="border-t">
                            {/* Date */}
                            <td>
                                {editing === b._id ? (
                                    <input
                                        type="date"
                                        value={editForm.date ?? b.date}
                                        onChange={e => {
                                            const newDate = e.target.value;
                                            setEditForm(prev => ({ ...prev, date: newDate }));

                                            axiosSecure.get(`/api/slots?date=${newDate}`)
                                                .then(res => setSlots(prev => ({ ...prev, [b._id]: res.data })))
                                                .catch(err => console.error(err));
                                        }}
                                        className="border p-1 rounded w-full"
                                    />
                                ) : (
                                    b.date
                                )}
                            </td>

                            {/* Time */}
                            <td>
                                {editing === b._id ? (
                                    <select
                                        value={editForm.time ?? b.time}
                                        onChange={e => setEditForm(prev => ({ ...prev, time: e.target.value }))}
                                        className="border p-1 rounded w-full"
                                    >
                                        {slots[b._id]?.length > 0 ? (
                                            slots[b._id].map(slot => (
                                                <option key={slot.time} value={slot.time} disabled={!slot.available}>
                                                    {slot.time} ({slot.remaining} left)
                                                </option>
                                            ))
                                        ) : (
                                            <option key="loading" disabled>Loading slots...</option>
                                        )}
                                    </select>
                                ) : (
                                    b.time
                                )}
                            </td>

                            {/* Guests */}
                            <td>
                                {editing === b._id ? (
                                    <input
                                        type="number"
                                        min={1}
                                        value={editForm.guests ?? b.guests}
                                        onChange={e => {
                                            const val = parseInt(e.target.value, 10);
                                            setEditForm(prev => ({
                                                ...prev,
                                                guests: isNaN(val) ? b.guests : val
                                            }));
                                        }}
                                        className="border p-1 rounded w-20"
                                    />
                                ) : (
                                    b.guests
                                )}
                            </td>

                            {/* Actions */}
                            <td className="space-x-2">
                                {editing === b._id ? (
                                    <>
                                        <button
                                            className="px-2 py-1 bg-green-500 text-white rounded"
                                            onClick={() => handleUpdate(b)}
                                        >
                                            Save
                                        </button>
                                        <button
                                            className="px-2 py-1 bg-gray-500 text-white rounded"
                                            onClick={() => {
                                                setEditing(null);
                                                setEditForm({});
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            className="px-2 py-1 bg-yellow-500 text-white rounded"
                                            onClick={() => {
                                                setEditing(b._id);
                                                setEditForm({
                                                    date: b.date,
                                                    time: b.time,
                                                    guests: b.guests
                                                });
                                            }}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="px-2 py-1 bg-red-500 text-white rounded"
                                            onClick={() => handleDelete(b._id)}
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyBookings;
