import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaTrash, FaEdit } from "react-icons/fa";

const StaffBookings = () => {
    const axiosSecure = useAxiosSecure();
    const [bookings, setBookings] = useState([]);
    const [editBooking, setEditBooking] = useState(null);

    //  Load bookings for logged-in staff
    useEffect(() => {
        axiosSecure.get("/staff-bookings")
            .then(res => setBookings(res.data))
            .catch(err => console.error("Failed to fetch bookings:", err));
    }, [axiosSecure]);

    //  Cancel a booking
    const handleCancel = async (id) => {
        if (!confirm("Cancel this booking?")) return;
        try {
            await axiosSecure.delete(`/staff-bookings/${id}`);
            setBookings(bookings.filter(b => b._id !== id));
        } catch (err) {
            console.error("Cancel failed:", err);
        }
    };

    //  Save edited booking
    const handleUpdate = async () => {
        try {
            await axiosSecure.patch(`/staff-bookings/${editBooking._id}`, {
                date: editBooking.date,
                time: editBooking.time
            });

            // Refresh list
            const res = await axiosSecure.get("/staff-bookings");
            setBookings(res.data);

            setEditBooking(null); // close modal
        } catch (err) {
            console.error("Update failed:", err);
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">🪑 Manage Your Customer Bookings</h2>

            {bookings.length === 0 ? (
                <p>No bookings found.</p>
            ) : (
                <div className="overflow-x-auto w-full">
                    <table className="w-full border text-sm">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-2 py-1 border">Customer</th>
                                <th className="px-2 py-1 border">Email</th>
                                <th className="px-2 py-1 border">Phone</th>
                                <th className="px-2 py-1 border">Date</th>
                                <th className="px-2 py-1 border">Time</th>
                                <th className="px-2 py-1 border">Status</th>
                                <th className="px-2 py-1 border text-center">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.map(b => (
                                <tr key={b._id} className="border-t hover:bg-gray-50">
                                    <td className="px-2 py-1">{b.name || "—"}</td>
                                    <td className="px-2 py-1">{b.customerEmail}</td>
                                    <td className="px-2 py-1">{b.customerPhone}</td>
                                    <td className="px-2 py-1">{b.date}</td>
                                    <td className="px-2 py-1">{b.time}</td>
                                    <td className="px-2 py-1 text-green-600 font-semibold">{b.status}</td>
                                    <td className="px-2 py-1 flex justify-center gap-2">
                                        <button
                                            onClick={() => setEditBooking(b)}
                                            className="btn btn-xs btn-warning text-white flex items-center gap-1"
                                        >
                                            <FaEdit /> Edit
                                        </button>
                                        <button
                                            onClick={() => handleCancel(b._id)}
                                            className="btn btn-xs btn-error text-white flex items-center gap-1"
                                        >
                                            <FaTrash /> Cancel
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/*  Edit Booking Modal */}
            {editBooking && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
                    <div className=" bg-white p-6 rounded-lg w-80 shadow-lg">
                        <h3 className="text-xl font-semibold mb-4">Edit Booking</h3>

                        <label className="block mb-2 text-sm font-medium">Select Date</label>
                        <input
                            type="date"
                            className="input input-bordered w-full mb-3"
                            value={editBooking.date}
                            onChange={(e) =>
                                setEditBooking({ ...editBooking, date: e.target.value })
                            }
                        />

                        <label className="block mb-2 text-sm font-medium">Select Time</label>
                        <input
                            type="time"
                            className="input input-bordered w-full mb-4"
                            value={editBooking.time}
                            onChange={(e) =>
                                setEditBooking({ ...editBooking, time: e.target.value })
                            }
                        />

                        <div className="flex justify-end gap-3">
                            <button
                                className="btn btn-sm"
                                onClick={() => setEditBooking(null)}
                            >
                                Cancel
                            </button>

                            <button
                                className="btn btn-sm btn-success"
                                onClick={handleUpdate}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StaffBookings;

