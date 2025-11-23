// import React from 'react';

// import { useNavigate } from "react-router-dom";
// import useStaffCart from "../../hooks/useStaffCart";
// import Swal from "sweetalert2";

// const StaffCart = () => {
//     const { cart, removeFromCart, clearCart } = useStaffCart();
//     const navigate = useNavigate();

//     const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
//     if (!cart.length) return <p>Your staff cart is empty.</p>;



//     return (

//         <div className="max-w-2xl mx-auto p-4">
//             <h2 className="text-2xl font-bold mb-4">Staff Cart</h2>
//             {cart.map(item => (
//                 <div key={item.productId} className="flex justify-between items-center mb-2 border-b pb-2">
//                     <p>{item.name} x {item.quantity}</p>
//                     <p>${item.price * item.quantity}</p>
//                     <button onClick={() => removeFromCart(item.productId)} className="btn btn-sm btn-red">
//                         Remove
//                     </button>
//                 </div>
//             ))}
//             <h3 className="mt-4 font-bold">Total: ${totalPrice.toFixed(2)}</h3>
//             <div className="mt-4 flex gap-2">
//                 <button onClick={clearCart} className="btn btn-red">Clear Cart</button>
//                 {/* Here you can add a "Place Order" button if needed */}
//             </div>
//         </div>
//     );
// };

// export default StaffCart;
import { useEffect, useState } from "react";

const useStaffCart = () => {

    // Load cart on first render from LocalStorage
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("staffCart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Save cart every time it changes
    useEffect(() => {
        localStorage.setItem("staffCart", JSON.stringify(cart));
    }, [cart]);

    // Add item to cart
    const addToCart = (item) => {
        setCart((prev) => {
            const exists = prev.find((p) => p.productId === item.productId);

            if (exists) {
                return prev.map((p) =>
                    p.productId === item.productId
                        ? { ...p, quantity: p.quantity + 1 }
                        : p
                );
            }

            return [...prev, { ...item, quantity: 1 }];
        });
    };

    // Remove item from cart
    const removeFromCart = (productId) => {
        setCart((prev) => prev.filter((item) => item.productId !== productId));
    };

    // Clear all cart
    const clearCart = () => {
        setCart([]);
        localStorage.removeItem("staffCart");
    };

    return { cart, addToCart, removeFromCart, clearCart };
};

export default useStaffCart;

