import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const SingleStaffOrder = () => {
    const { id } = useParams();
    const axiosSecure = useAxiosSecure();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await axiosSecure.get(`/viewStaffOrder/${id}`);
                setOrder(res.data);
            } catch (error) {
                console.error("Error loading order:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrder();
    }, [id, axiosSecure]);

    if (loading)
        return (
            <div className="flex justify-center mt-10">
                <span className="loading loading-spinner text-primary text-4xl"></span>
            </div>
        );

    if (!order)
        return (
            <div className="text-center mt-10 text-red-500">
                Order not found
            </div>
        );

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <Link
                to="/dashboard/viewStaffOrder"
                className="btn btn-sm btn-secondary mb-4"
            >
                ← Back to Orders
            </Link>

            <div className="card bg-base-200 shadow-xl p-6">
                <h2 className="text-2xl font-bold mb-4">Order Details</h2>

                <div className="space-y-2">
                    <p><strong>Order ID:</strong> {order._id}</p>
                    <p><strong>Customer Email:</strong> {order.customerEmail}</p>
                    <p><strong>Customer Phone:</strong> {order.customerPhone}</p>
                    <p><strong>Total:</strong> ${order.total}</p>
                    <p>
                        <strong>Status:</strong>{" "}
                        <span className="badge badge-info">{order.status}</span>
                    </p>
                    <p>
                        <strong>Created At:</strong>{" "}
                        {new Date(order.createdAt).toLocaleString()}
                    </p>

                    <h3 className="text-lg font-semibold mt-4">Items:</h3>
                    {order.items && order.items.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {order.items.map((item, index) => (
                                <div
                                    key={index}
                                    className="p-4 border rounded-lg bg-base-100 shadow"
                                >
                                    <p><strong>Name:</strong> {item.name || "N/A"}</p>
                                    <p><strong>Quantity:</strong> {item.quantity || 1}</p>
                                    <p><strong>Price:</strong> ${item.price || "N/A"}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No items in this order.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SingleStaffOrder;

