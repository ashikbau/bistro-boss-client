
import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

export default function ManageBooking() {
    const [bookings, setBookings] = useState([]);
    const [editingBooking, setEditingBooking] = useState(null);
    const axiosSecure = useAxiosSecure();

    const fetchBookings = () => {
        axiosSecure.get("/managebooking")
            .then(res => setBookings(res.data))
            .catch(err => console.error(err));
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    // Delete booking
    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this booking?")) {
            axiosSecure.delete(`/managebooking/${id}`)
                .then(() => fetchBookings());
        }
    };

    // Start editing booking
    const handleEdit = (booking) => {
        setEditingBooking(booking);
    };

    // Save edited booking
    const handleSave = () => {
        axiosSecure.put(`/managebooking/${editingBooking._id}`, editingBooking)
            .then(() => {
                setEditingBooking(null);
                fetchBookings();
            });
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Manage Bookings</h1>

            <table className="w-full border-collapse border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Email</th>
                        <th className="border p-2">Date</th>
                        <th className="border p-2">Time</th>
                        <th className="border p-2">Guests</th>
                        <th className="border p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map(b => (
                        <tr key={b._id} className="text-center">
                            {/* Name */}
                            <td className="border p-2">
                                {editingBooking?._id === b._id ? (
                                    <input
                                        type="text"
                                        value={editingBooking.name}
                                        onChange={e =>
                                            setEditingBooking({ ...editingBooking, name: e.target.value })
                                        }
                                        className="border p-1 w-full"
                                    />
                                ) : (
                                    b.name
                                )}
                            </td>

                            {/* Email */}
                            <td className="border p-2">
                                {editingBooking?._id === b._id ? (
                                    <input
                                        type="email"
                                        value={editingBooking.email || ""}
                                        onChange={e =>
                                            setEditingBooking({ ...editingBooking, email: e.target.value })
                                        }
                                        className="border p-1 w-full"
                                    />
                                ) : (
                                    b.email
                                )}
                            </td>

                            {/* Date */}
                            <td className="border p-2">
                                {editingBooking?._id === b._id ? (
                                    <input
                                        type="date"
                                        value={editingBooking.date}
                                        onChange={e =>
                                            setEditingBooking({ ...editingBooking, date: e.target.value })
                                        }
                                        className="border p-1"
                                    />
                                ) : (
                                    b.date
                                )}
                            </td>

                            {/* Time */}
                            <td className="border p-2">
                                {editingBooking?._id === b._id ? (
                                    <input
                                        type="time"
                                        value={editingBooking.time}
                                        onChange={e =>
                                            setEditingBooking({ ...editingBooking, time: e.target.value })
                                        }
                                        className="border p-1"
                                    />
                                ) : (
                                    b.time
                                )}
                            </td>

                            {/* Guests */}
                            <td className="border p-2">
                                {editingBooking?._id === b._id ? (
                                    <input
                                        type="number"
                                        min={1}
                                        value={editingBooking.guests}
                                        onChange={e =>
                                            setEditingBooking({ ...editingBooking, guests: parseInt(e.target.value) })
                                        }
                                        className="border p-1 w-16"
                                    />
                                ) : (
                                    b.guests
                                )}
                            </td>

                            {/* Actions */}
                            <td className="border p-2">
                                {editingBooking?._id === b._id ? (
                                    <div className="flex flex-wrap gap-2 justify-center">
                                        <button
                                            onClick={handleSave}
                                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-24 text-sm"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={() => setEditingBooking(null)}
                                            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded w-24 text-sm"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex flex-wrap gap-2 justify-center">
                                        <button
                                            onClick={() => handleEdit(b)}
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-24 text-sm"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(b._id)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded w-24 text-sm"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </td>


                        </tr>
                    ))}
                </tbody>


            </table>
        </div>
    );
}
