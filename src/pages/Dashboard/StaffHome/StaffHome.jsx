
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import {
//     FaClipboardList,
//     FaBook,
//     FaShoppingCart,
//     FaHome,
// } from "react-icons/fa";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import useCart from "../../../hooks/useCart";

// const StaffHome = () => {
//     const axiosSecure = useAxiosSecure();
//     const [cart] = useCart(); // staff can reuse cart system
//     const [staffStats, setStaffStats] = useState({
//         bookings: [],
//         orders: [],
//     });

//     // 🧮 Fetch staff stats
//     useEffect(() => {
//         axiosSecure
//             .get("/staff-stats")
//             .then((res) => {
//                 setStaffStats({
//                     bookings: res.data.bookings || [],
//                     orders: res.data.orders || [],
//                 });
//             })
//             .catch((err) => {
//                 console.error("Error fetching staff stats:", err);
//             });
//     }, [axiosSecure]);

//     // 💰 Total cart value (safe calculation)
//     const totalCartValue = cart.reduce(
//         (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
//         0
//     );

//     return (
//         <div className="p-6">
//             <h2 className="text-3xl font-bold mb-6">👋 Welcome, Staff!</h2>

//             {/* 📊 Stat Cards */}
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
//                     value={cart?.length || 0}
//                     icon={<FaShoppingCart className="text-purple-500 text-4xl" />}
//                 />
//             </div>

//             {/* 🛒 Staff Cart Summary */}
//             <div className="mt-10 bg-yellow-50 border border-yellow-300 rounded-xl p-5 shadow-md">
//                 <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
//                     <FaShoppingCart className="text-yellow-600" /> Current Cart Overview
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
//                             {/* 🧺 View Cart (optional) */}
//                             <Link
//                                 to="/dashboard/cart"
//                                 className="btn btn-outline btn-sm text-sm"
//                             >
//                                 View Cart
//                             </Link>

//                             {/* 🧾 Proceed to Staff Order Form */}
//                             <Link
//                                 to="/dashboard/placeOrders"
//                                 className="btn btn-warning btn-sm text-sm text-white"
//                             >
//                                 Proceed to Create Order ➜
//                             </Link>
//                         </div>
//                     </div>
//                 )}
//             </div>

//             {/* 🔗 Quick Links Section */}
//             <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                 <Link to="/" className="btn btn-primary">
//                     <FaHome className="inline mr-2" /> Main Home
//                 </Link>
//                 <Link to="/dashboard/handleBookings" className="btn btn-secondary">
//                     <FaBook className="inline mr-2" /> Manage Bookings
//                 </Link>
//                 <Link to="/dashboard/staffOrders" className="btn btn-accent">
//                     <FaClipboardList className="inline mr-2" /> View Staff Orders
//                 </Link>
//             </div>
//         </div>
//     );
// };

// // ✅ Simple reusable stat card
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
        bookings: [],
        orders: [],
    });

    // Fetch staff stats
    useEffect(() => {
        axiosSecure
            .get("/staff-stats")
            .then((res) => {
                setStaffStats({
                    bookings: res.data.bookings || [],
                    orders: res.data.orders || [],
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

            {/* Cart Summary Section */}
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

// ✅ Reusable StatCard
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
