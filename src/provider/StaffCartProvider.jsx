// src/contexts/StaffCartProvider.jsx
import { createContext, useContext, useEffect, useState } from "react";

// 1️⃣ Create the context
const StaffCartContext = createContext();

// 2️⃣ Provider component
export const StaffCartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        // Load initial cart from localStorage
        const savedCart = localStorage.getItem("staffCart");
        return savedCart ? JSON.parse(savedCart) : [];
    });

    // Persist cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("staffCart", JSON.stringify(cart));
    }, [cart]);

    // Add an item to the cart
    const addToCart = (item) => {
        setCart((prevCart) => {
            const existing = prevCart.find((i) => i.productId === item.productId);
            if (existing) {
                // Increase quantity if item already exists
                return prevCart.map((i) =>
                    i.productId === item.productId
                        ? { ...i, quantity: i.quantity + item.quantity }
                        : i
                );
            } else {
                return [...prevCart, item];
            }
        });
    };

    // Remove an item by productId
    const removeFromCart = (productId) => {
        setCart((prevCart) => prevCart.filter((item) => item.productId !== productId));
    };

    // Clear the entire cart
    const clearCart = () => setCart([]);

    // Context value
    const value = {
        cart,
        addToCart,
        removeFromCart,
        clearCart,
    };

    return (
        <StaffCartContext.Provider value={value}>
            {children}
        </StaffCartContext.Provider>
    );
};

// 3️⃣ Hook to use staff cart in any component
export const useStaffCart = () => {
    const context = useContext(StaffCartContext);
    if (!context) {
        throw new Error("useStaffCart must be used within a StaffCartProvider");
    }
    return context;
};
