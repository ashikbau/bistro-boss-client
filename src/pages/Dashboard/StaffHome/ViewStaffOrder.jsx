import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ViewStaffOrder = () => {
    const axiosSecure = useAxiosSecure();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axiosSecure.get("/viewStaffOrder");
                setOrders(res.data);
            } catch (error) {
                console.error("Error loading orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [axiosSecure]);

    // Filter orders by email or status
    const filteredOrders = orders.filter((order) => {
        const email = order.customerEmail || "";
        const status = order.status || "";
        return (
            email.toLowerCase().includes(search.toLowerCase()) ||
            status.toLowerCase().includes(search.toLowerCase())
        );
    });


    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-4">Staff Orders</h2>

            {/* Search box */}
            <input
                type="text"
                placeholder="Search by email or status..."
                className="input input-bordered w-full max-w-xs mb-4"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            {loading ? (
                <div className="flex justify-center mt-10">
                    <span className="loading loading-spinner text-primary text-4xl"></span>
                </div>
            ) : filteredOrders.length === 0 ? (
                <div className="text-center mt-10">No orders found</div>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>Order ID</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Total</th>
                                <th>Status</th>
                                <th>Created At</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order) => (
                                <tr key={order._id}>
                                    <td>
                                        <Link
                                            to={`/dashboard/viewStaffOrder/${order._id}`}
                                            className="link link-primary"
                                        >
                                            {order._id}
                                        </Link>
                                    </td>
                                    <td>{order.customerEmail}</td>
                                    <td>{order.customerPhone}</td>
                                    <td>${order.total}</td>
                                    <td>
                                        <span className="badge badge-info">{order.status}</span>
                                    </td>
                                    <td>{new Date(order.createdAt).toLocaleString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ViewStaffOrder;

