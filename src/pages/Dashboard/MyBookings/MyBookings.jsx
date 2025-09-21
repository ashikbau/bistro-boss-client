

import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAuth from '../../../hooks/useAuth';
import Swal from 'sweetalert2';

const MyBookings = () => {
    const axiosSecure = useAxiosSecure();
    const [bookings, setBookings] = useState([]);
    const [editing, setEditing] = useState(null); // booking being edited
    const { user } = useAuth();

    // Fetch user bookings on mount
    useEffect(() => {
        axiosSecure.get(`/my-bookings?email=${user.email}`)
            .then(res => setBookings(res.data))
            .catch(err => console.error(err));
    }, [axiosSecure]);

    const handleDelete = (id) => {
        Swal.fire({ title: "Delete?", text: "Are you sure?", icon: "warning", showCancelButton: true })
            .then(result => {
                if (result.isConfirmed) {
                    axiosSecure.delete(`/my-bookings/${id}`)
                        .then(() => setBookings(b => b.filter(x => x._id !== id)));
                }
            });
    };

    const handleUpdate = (id, updated) => {
        axiosSecure.put(`/my-bookings/${id}`, updated)
            .then(() => {
                setBookings(b => b.map(item => item._id === id ? { ...item, ...updated } : item));
                setEditing(null);
            });
    };

    return (
        <div className="max-w-3xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">My Bookings</h1>
            <table className="table-auto w-full border">
                <thead>
                    <tr className="bg-gray-100">
                        <th>Date</th><th>Time</th><th>Guests</th><th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map(b => (
                        <tr key={b._id} className="border-t">
                            <td>{b.date}</td>
                            <td>{b.time}</td>
                            <td>
                                {editing === b._id ? (
                                    <input
                                        type="number"
                                        min={1}
                                        defaultValue={b.guests}
                                        onBlur={e =>
                                            handleUpdate(b._id, { guests: parseInt(e.target.value, 10) })
                                        }
                                    />
                                ) : (
                                    b.guests
                                )}
                            </td>
                            <td className="space-x-2">
                                <button
                                    className="px-2 py-1 bg-yellow-500 text-white rounded"
                                    onClick={() => setEditing(b._id)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="px-2 py-1 bg-red-500 text-white rounded"
                                    onClick={() => handleDelete(b._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyBookings;
