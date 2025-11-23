
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import {
//     FaClipboardList,
//     FaBook,
//     FaShoppingCart,
//     FaHome,
// } from "react-icons/fa";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import useStaffCart from "../../../hooks/useStaffCart";

// const StaffHome = () => {
//     const axiosSecure = useAxiosSecure();
//     const { cart, clearCart } = useStaffCart();
//     const [staffStats, setStaffStats] = useState({
//         bookings: [],
//         orders: [],
//     });
//     const [bookings, setBookings] = useState([]);

//     // ✅ Fetch staff stats
//     useEffect(() => {
//         axiosSecure
//             .get("/staff-stats")
//             .then((res) => {
//                 console.log('Fetched staff stats:', res.data);
//                 setStaffStats({
//                     bookings: res.data.bookings || [],
//                     orders: res.data.orders || [],
//                 });
//             })
//             .catch((err) => {
//                 console.error("Error fetching staff stats:", err);
//             });
//     }, [axiosSecure]);

//     // ✅ Fetch staff bookings (for staff who created them)
//     useEffect(() => {
//         axiosSecure
//             .get("/staff-bookings")
//             .then((res) => setBookings(res.data))
//             .catch((err) => console.error("Error loading staff bookings:", err));
//     }, [axiosSecure]);

//     const totalCartValue = cart.reduce(
//         (sum, item) => sum + item.price * item.quantity,
//         0
//     );

//     return (
//         <div className="p-6">
//             <h2 className="text-3xl font-bold mb-6">👋 Welcome, Staff!</h2>

//             {/* Stat Cards */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 <StatCard
//                     title="Total Orders"
//                     value={staffStats.orders.length}
//                     icon={<FaClipboardList className="text-blue-500 text-4xl" />}
//                 />
//                 <StatCard
//                     title="Total Bookings"
//                     value={staffStats.bookings.length}
//                     icon={<FaBook className="text-green-500 text-4xl" />}
//                 />
//                 <StatCard
//                     title="Active Cart Items"
//                     value={cart.length}
//                     icon={<FaShoppingCart className="text-purple-500 text-4xl" />}
//                 />
//             </div>

//             {/* Cart Summary */}
//             <div className="mt-10 bg-yellow-50 border border-yellow-300 rounded-xl p-5 shadow-md">
//                 <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
//                     <FaShoppingCart className="text-yellow-600" /> Current Order Cart
//                 </h3>

//                 {cart.length === 0 ? (
//                     <p className="text-gray-500">No items in your staff cart yet.</p>
//                 ) : (
//                     <div>
//                         <p className="text-gray-700">
//                             You have <strong>{cart.length}</strong> items totaling{" "}
//                             <strong>${totalCartValue.toFixed(2)}</strong>.
//                         </p>

//                         <div className="mt-4 flex flex-wrap gap-3">
//                             <Link
//                                 to="/dashboard/placeOrders"
//                                 className="btn btn-warning btn-sm text-sm text-white"
//                             >
//                                 🚀 Proceed to Create Order
//                             </Link>
//                             <button
//                                 onClick={clearCart}
//                                 className="btn btn-outline btn-sm text-sm"
//                             >
//                                 🗑️ Clear Cart
//                             </button>
//                         </div>
//                     </div>
//                 )}
//             </div>

//             {/* ✅ Staff Booking Summary */}
//             <div className="mt-10 bg-white border rounded-xl shadow-md p-5">
//                 <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
//                     <FaBook className="text-green-600" /> Your Customer Bookings
//                 </h3>

//                 {bookings.length === 0 ? (
//                     <p className="text-gray-500">No bookings created yet.</p>
//                 ) : (
//                     <div className="overflow-x-auto">
//                         <table className="table-auto w-full border text-sm">
//                             <thead className="bg-gray-100">
//                                 <tr>
//                                     <th className="p-2 border">Customer</th>
//                                     <th className="p-2 border">Email</th>
//                                     <th className="p-2 border">Phone</th>
//                                     <th className="p-2 border">Date</th>
//                                     <th className="p-2 border">Time</th>
//                                     <th className="p-2 border">Status</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {bookings.map((b) => (
//                                     <tr key={b._id} className="border-t hover:bg-gray-50">
//                                         <td className="p-2">{b.name || "—"}</td>
//                                         <td className="p-2">{b.customerEmail}</td>
//                                         <td className="p-2">{b.customerPhone}</td>
//                                         <td className="p-2">{b.date}</td>
//                                         <td className="p-2">{b.time}</td>
//                                         <td className="p-2 text-green-600 font-semibold">
//                                             {b.status}
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 )}
//             </div>

//             {/* Quick Links */}
//             <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                 <Link to="/" className="btn btn-primary">
//                     <FaHome className="inline mr-2" /> Main Home
//                 </Link>
//                 <Link to="/dashboard/handleBookings" className="btn btn-secondary">
//                     <FaBook className="inline mr-2" /> Manage Bookings
//                 </Link>
//                 <Link to="/dashboard/placeOrders" className="btn btn-accent">
//                     <FaClipboardList className="inline mr-2" /> Manage Orders
//                 </Link>
//             </div>
//         </div>
//     );
// };

// // ✅ Reusable StatCard
// const StatCard = ({ title, value, icon }) => (
//     <div className="bg-white rounded-lg shadow-md p-5 flex items-center justify-between">
//         <div>
//             <h4 className="text-sm text-gray-500">{title}</h4>
//             <p className="text-2xl font-semibold">{value}</p>
//         </div>
//         <div>{icon}</div>
//     </div>
// );

// export default StaffHome;

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    FaClipboardList,
    FaBook,
    FaShoppingCart,
    FaHome,
} from "react-icons/fa";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useStaffCart from "../../../hooks/useStaffCart";

const StaffHome = () => {
    const axiosSecure = useAxiosSecure();
    const { cart, clearCart } = useStaffCart();
    const [staffStats, setStaffStats] = useState({
        bookings: 0,
        orders: 0,
    });

    // Fetch staff dashboard stats
    useEffect(() => {
        axiosSecure
            .get("/staffOnly-stats")
            .then((res) => {
                setStaffStats({
                    bookings: res.data.bookings || 0,
                    orders: res.data.orders || 0,
                });
            })
            .catch((err) => {
                console.error("Error fetching staff stats:", err);
            });
    }, [axiosSecure]);

    const totalCartValue = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6">👋 Welcome, Staff!</h2>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard
                    title="Total Orders"
                    value={staffStats.orders.length}
                    icon={<FaClipboardList className="text-blue-500 text-4xl" />}
                />
                <StatCard
                    title="Total Bookings"
                    value={staffStats.bookings.length}
                    icon={<FaBook className="text-green-500 text-4xl" />}
                />
                <StatCard
                    title="Active Cart Items"
                    value={cart.length}
                    icon={<FaShoppingCart className="text-purple-500 text-4xl" />}
                />
            </div>

            {/* Cart Summary */}
            <div className="mt-10 bg-yellow-50 border border-yellow-300 rounded-xl p-5 shadow-md">
                <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <FaShoppingCart className="text-yellow-600" /> Current Order Cart
                </h3>

                {cart.length === 0 ? (
                    <p className="text-gray-500">No items in your staff cart yet.</p>
                ) : (
                    <div>
                        <p className="text-gray-700">
                            You have <strong>{cart.length}</strong> items totaling{" "}
                            <strong>${totalCartValue.toFixed(2)}</strong>.
                        </p>

                        <div className="mt-4 flex flex-wrap gap-3">
                            <Link
                                to="/dashboard/placeOrders"
                                className="btn btn-warning btn-sm text-sm text-white"
                            >
                                🚀 Proceed to Create Order
                            </Link>
                            <button
                                onClick={clearCart}
                                className="btn btn-outline btn-sm text-sm"
                            >
                                🗑️ Clear Cart
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Quick Links */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link to="/" className="btn btn-primary">
                    <FaHome className="inline mr-2" /> Main Home
                </Link>
                <Link to="/dashboard/handleBookings" className="btn btn-secondary">
                    <FaBook className="inline mr-2" /> Manage Bookings
                </Link>
                <Link to="/dashboard/placeOrders" className="btn btn-accent">
                    <FaClipboardList className="inline mr-2" /> Manage Orders
                </Link>
            </div>
        </div>
    );
};

// Reusable Stat Card
const StatCard = ({ title, value, icon }) => (
    <div className="bg-white rounded-lg shadow-md p-5 flex items-center justify-between">
        <div>
            <h4 className="text-sm text-gray-500">{title}</h4>
            <p className="text-2xl font-semibold">{value}</p>
        </div>
        <div>{icon}</div>
    </div>
);

export default StaffHome;


