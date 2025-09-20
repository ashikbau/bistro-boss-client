import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUsers, FaUtensils } from "react-icons/fa";

const AdminHome = () => {
    const axiosSecure = useAxiosSecure();
    const [stats, setStats] = useState({
        users: 0,
        menuItems: 0,
    });

    useEffect(() => {
        axiosSecure.get("/admin-stats")
            .then(res => {
                setStats(res.data);
            })
            .catch(err => {
                console.error("Error fetching admin stats:", err);
            });
    }, [axiosSecure]);

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6">👋 Welcome, Admin!</h2>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <StatCard
                    title="Total Users"
                    value={stats.users}
                    icon={<FaUsers className="text-blue-500 text-4xl" />}
                />
                <StatCard
                    title="Menu Items"
                    value={stats.menuItems}
                    icon={<FaUtensils className="text-green-500 text-4xl" />}
                />
            </div>

            {/* Quick Links */}
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link to="/dashboard/manageItems" className="btn btn-primary">🍽 Manage Items</Link>
                <Link to="/dashboard/users" className="btn btn-secondary">👤 Manage Users</Link>
                <Link to="/dashboard/addItems" className="btn btn-accent">➕ Add New Item</Link>
            </div>
        </div>
    );
};

// Reusable stat card
const StatCard = ({ title, value, icon }) => (
    <div className="bg-white rounded-lg shadow-md p-5 flex items-center justify-between">
        <div>
            <h4 className="text-sm text-gray-500">{title}</h4>
            <p className="text-2xl font-semibold">{value}</p>
        </div>
        <div>{icon}</div>
    </div>
);

export default AdminHome;
