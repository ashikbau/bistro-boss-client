
import { useState } from "react";
import useStaffCart from "../../../hooks/useStaffCart";
import axios from "axios";

const PlaceOrders = () => {
    const { cart, removeFromCart, clearCart } = useStaffCart();

    const [customerEmail, setCustomerEmail] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");

    //  Calculate total amount
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    //  Handle sending payment link to Stripe
    const handleSendPaymentLink = async () => {
        if (!customerEmail || !customerPhone || cart.length === 0) {
            alert("Please fill in customer info and add items to the cart.");
            return;
        }

        try {
            //  Get JWT token from localStorage
            const token = localStorage.getItem("access-token");

            if (!token) {
                alert("You are not authorized. Please login again.");
                return;
            }

            const orderData = {
                customerEmail,
                customerPhone,
                items: cart,
            };

            //  Send order data to backend
            const response = await axios.post(
                "http://localhost:5000/api/staff-orders/create-payment",
                orderData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const { url } = response.data;

            if (url) {
                alert(" Payment link generated! Redirecting to checkout...");

                // 🧹 Clear staff cart after successful link creation
                clearCart();

                //  Reset input fields
                setCustomerEmail("");
                setCustomerPhone("");

                //  Redirect to Stripe Checkout
                window.location.href = url;
            }
        } catch (error) {
            console.error("Error creating payment session:", error);
            alert(" Failed to create payment session");
        }
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                🧾 Create Customer Order
            </h2>

            {/*  Customer Info */}
            <div className="bg-white shadow-md rounded-lg p-4 mb-6">
                <input
                    type="email"
                    placeholder="Customer Email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="border border-gray-300 rounded p-2 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
                <input
                    type="text"
                    placeholder="Customer Phone"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="border border-gray-300 rounded p-2 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
            </div>

            {/* 🧾 Order Preview */}
            {cart.length > 0 ? (
                <div className="bg-white shadow-md rounded-lg p-4 mb-6">
                    <h3 className="text-xl font-semibold mb-3">🛒 Order Preview</h3>

                    {cart.map((item) => (
                        <div
                            key={item.productId}
                            className="flex justify-between items-center border-b py-2"
                        >
                            <span>
                                {item.name} × {item.quantity}
                            </span>
                            <div className="flex items-center gap-3">
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                                <button
                                    onClick={() => removeFromCart(item.productId)}
                                    className="text-red-500 hover:text-red-700"
                                >
                                    ❌
                                </button>
                            </div>
                        </div>
                    ))}

                    <div className="flex justify-between items-center mt-3 font-bold text-lg">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                </div>
            ) : (
                <p className="text-gray-500 text-center mb-6">
                    No items in staff cart. Please add products first.
                </p>
            )}

            {/* 💳 Send Payment Link */}
            <button
                onClick={handleSendPaymentLink}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-bold w-full transition duration-200"
            >
                💳 Send Payment Link
            </button>
        </div>
    );
};

export default PlaceOrders;




