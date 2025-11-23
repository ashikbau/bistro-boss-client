import { useState, useEffect } from "react";



const useStaffCart = () => {
    //  Initialize from localStorage
    const [cart, setCart] = useState(() => {
        try {
            const saved = localStorage.getItem("staffCart");
            return saved ? JSON.parse(saved) : [];
        } catch (error) {
            console.error("Error loading staffCart from localStorage:", error);
            return [];
        }
    });

    //  Persist cart changes to localStorage
    useEffect(() => {
        localStorage.setItem("staffCart", JSON.stringify(cart));
    }, [cart]);

    // ➕ Add an item (increase quantity if already exists)
    const addToCart = (item) => {
        setCart((prev) => {
            const existing = prev.find((i) => i.productId === item.productId);
            if (existing) {
                return prev.map((i) =>
                    i.productId === item.productId
                        ? { ...i, quantity: i.quantity + (item.quantity || 1) }
                        : i
                );
            }
            return [...prev, { ...item, quantity: item.quantity || 1 }];
        });
    };

    // ➖ Remove an item by productId
    const removeFromCart = (productId) => {
        setCart((prev) => prev.filter((i) => i.productId !== productId));
    };

    //  Clear all items
    const clearCart = () => {
        setCart([]);
        localStorage.removeItem("staffCart");
    };

    return {
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        setCart,
    };
};

export default useStaffCart;

