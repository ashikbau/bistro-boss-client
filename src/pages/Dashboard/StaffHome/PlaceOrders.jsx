
// import { useEffect, useState } from "react";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import useCart from "../../../hooks/useCart";

// const PlaceOrders = () => {
//     const axiosSecure = useAxiosSecure();
//     const [cart, setCart] = useCart(); // assume your hook supports setCart or removeFromCart
//     const [items, setItems] = useState([]);

//     const [customerName, setCustomerName] = useState("");
//     const [customerEmail, setCustomerEmail] = useState("");
//     const [customerPhone, setCustomerPhone] = useState("");

//     // 🧺 Load cart items into local state
//     useEffect(() => {
//         if (cart.length) {
//             const formattedItems = cart.map((item) => ({
//                 productId: item._id || item.menuId || "",
//                 name: item.name || "Unknown Item",
//                 price: Number(item.price),
//                 quantity: Number(item.quantity ?? 1),
//             }));
//             setItems(formattedItems);
//         }
//     }, [cart]);

//     // 💰 Calculate total dynamically
//     const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

//     // 🗑️ Handle item removal
//     const handleRemoveItem = (productId) => {
//         const updatedItems = items.filter((item) => item.productId !== productId);
//         setItems(updatedItems);

//         // Optional: update global cart if your hook supports it
//         setCart && setCart(updatedItems);
//     };

//     // 📤 Handle sending order to customer
//     const handleCreateOrder = async () => {
//         if (!customerName || !customerEmail || !customerPhone) {
//             alert("Please fill all customer details.");
//             return;
//         }

//         if (items.length === 0) {
//             alert("No items in cart to order.");
//             return;
//         }

//         const orderData = {
//             customerName,
//             customerEmail,
//             customerPhone,
//             items,
//         };

//         try {
//             const res = await axiosSecure.post("/api/staff-orders", orderData);
//             alert("✅ Order created and sent to customer successfully!");
//             console.log("Staff Order Created:", res.data);

//             // Optional: clear local cart after order
//             setItems([]);
//             setCart && setCart([]);
//         } catch (err) {
//             console.error("Error creating staff order:", err);
//             alert("❌ Failed to create order");
//         }
//     };

//     return (
//         <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-8">
//             <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
//                 🧾 Create Customer Order
//             </h2>

//             {/* 👤 Customer Details */}
//             <div className="space-y-3 mb-6">
//                 <input
//                     type="text"
//                     placeholder="Customer Full Name"
//                     value={customerName}
//                     onChange={(e) => setCustomerName(e.target.value)}
//                     className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
//                 />
//                 <input
//                     type="email"
//                     placeholder="Customer Email"
//                     value={customerEmail}
//                     onChange={(e) => setCustomerEmail(e.target.value)}
//                     className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
//                 />
//                 <input
//                     type="text"
//                     placeholder="Customer Phone Number"
//                     value={customerPhone}
//                     onChange={(e) => setCustomerPhone(e.target.value)}
//                     className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-yellow-400"
//                 />
//             </div>

//             {/* 🧺 Order Preview */}
//             <div className="bg-gray-50 border rounded-lg p-4 mb-6">
//                 <h3 className="text-lg font-semibold mb-3">🛒 Order Preview</h3>

//                 {items.length > 0 ? (
//                     <>
//                         {items.map((item, idx) => (
//                             <div
//                                 key={idx}
//                                 className="flex justify-between items-center border-b py-2"
//                             >
//                                 <span>
//                                     {item.name} × {item.quantity}
//                                 </span>
//                                 <div className="flex items-center gap-3">
//                                     <span>${(item.price * item.quantity).toFixed(2)}</span>
//                                     <button
//                                         onClick={() => handleRemoveItem(item.productId)}
//                                         className="text-red-500 hover:text-red-700 font-bold"
//                                         title="Remove item"
//                                     >
//                                         ✖
//                                     </button>
//                                 </div>
//                             </div>
//                         ))}
//                         <div className="flex justify-between font-bold text-lg mt-3">
//                             <span>Total</span>
//                             <span>${total.toFixed(2)}</span>
//                         </div>
//                     </>
//                 ) : (
//                     <p className="text-gray-500 text-center">
//                         No items in cart. Please add some first.
//                     </p>
//                 )}
//             </div>

//             {/* 🚀 Submit Button */}
//             <button
//                 onClick={handleCreateOrder}
//                 className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-bold w-full transition duration-200"
//             >
//                 🚀 Send Order to Customer
//             </button>
//         </div>
//     );
// };

// export default PlaceOrders;
import { useState } from "react";
import useStaffCart from "../../../hooks/useStaffCart";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const PlaceOrders = () => {
    const { cart, removeFromCart, clearCart } = useStaffCart();
    const axiosSecure = useAxiosSecure();

    const [customerEmail, setCustomerEmail] = useState("");
    const [customerPhone, setCustomerPhone] = useState("");

    // Total price calculation
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    // Submit order to backend
    const handleSendOrder = async () => {
        if (!customerEmail || !customerPhone || cart.length === 0) {
            alert("Please fill in customer info and add items to the cart.");
            return;
        }

        try {
            const orderData = {
                customerEmail,
                customerPhone,
                items: cart,
            };

            const response = await axiosSecure.post("/api/staff-orders", orderData);
            console.log("Created order:", response.data);

            alert("✅ Order sent to customer successfully!");
            clearCart(); // clear staff cart after sending
            setCustomerEmail("");
            setCustomerPhone("");
        } catch (error) {
            console.error("Error creating order:", error);
            alert("❌ Failed to create order");
        }
    };

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
                🧾 Create Customer Order
            </h2>

            {/* Customer Info */}
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

            {/* Order Preview */}
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

            {/* Send Order Button */}
            <button
                onClick={handleSendOrder}
                className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg font-bold w-full transition duration-200"
            >
                🚀 Send Order to Customer
            </button>
        </div>
    );
};

export default PlaceOrders;

