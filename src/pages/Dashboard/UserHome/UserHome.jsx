import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
    FaList,
    FaStar,
    FaShoppingCart,
    FaBook,
    FaHome
} from "react-icons/fa";
import { BiFoodMenu } from "react-icons/bi";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useCart from "../../../hooks/useCart";

const UserHome = () => {
    const axiosSecure = useAxiosSecure();
    const [cart] = useCart();
    const [userStats, setUserStats] = useState({
        bookings: [],
        reviews: [],
    });

    useEffect(() => {
        axiosSecure.get("/user-stats")
            .then((res) => {
                console.log("User Stats Response:", res.data);
                setUserStats({
                    bookings: res.data.bookings || [],
                    reviews: res.data.reviews || [],
                });
            })
            .catch((err) => {
                console.error("Error fetching user stats:", err);
            });
    }, [axiosSecure]);

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6">👋 Welcome Back, User!</h2>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard
                    title="My Bookings"
                    value={userStats.bookings.length}
                    icon={<FaList className="text-blue-500 text-4xl" />}
                />
                <StatCard
                    title="My Reviews"
                    value={userStats.reviews.length}
                    icon={<FaStar className="text-green-500 text-4xl" />}
                />
                <StatCard
                    title="Cart Items"
                    value={cart?.length || 0}
                    icon={<FaShoppingCart className="text-purple-500 text-4xl" />}
                />
            </div>

            {/* Recent Bookings */}
            <div className="mt-10">
                <h3 className="text-xl font-bold mb-4">🗓️ Recent Bookings</h3>
                {userStats.bookings.length > 0 ? (
                    userStats.bookings.map((booking) => (
                        <div key={booking._id} className="p-4 bg-white shadow rounded mb-4">
                            <p><strong>Name:</strong> {booking.name}</p>
                            <p><strong>Email:</strong> {booking.email}</p>
                            <p><strong>Date:</strong> {booking.date} at {booking.time}</p>
                            <p><strong>Guests:</strong> {booking.guests}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No bookings yet.</p>
                )}
            </div>

            {/* Quick Links */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link to="/dashboard/addReview" className="btn btn-primary">➕ Add a Review</Link>
                <Link to="/dashboard/myReviews" className="btn btn-secondary">📋 Manage Reviews</Link>
                <Link to="/dashboard/my-bookings" className="btn btn-accent">📅 Manage Bookings</Link>
                <Link to="/book" className="btn btn-outline btn-primary hover:bg-primary hover:text-white">
                    ✉️ Booking
                </Link>
                <Link to="/" className="btn btn-outline">🏠 Home</Link>
                <Link to="/menu" className="btn btn-outline">📖 Menu</Link>
                <Link to="/contact" className="btn btn-outline">✉️ Contact</Link>
            </div>
        </div>
    );
};

// ✅ Reusable stat card component
const StatCard = ({ title, value, icon }) => (
    <div className="bg-white rounded-lg shadow-md p-5 flex items-center justify-between">
        <div>
            <h4 className="text-sm text-gray-500">{title}</h4>
            <p className="text-2xl font-semibold">{value}</p>
        </div>
        <div>{icon}</div>
    </div>
);

export default UserHome;
