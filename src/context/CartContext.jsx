import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cart, setCart] = useState(() => {
        const saved = localStorage.getItem("buradi-cart");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("buradi-cart", JSON.stringify(cart));
    }, [cart]);

    function addToCart(product, qty) {
        setCart((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
                return prev.map((item) =>
                    item.id === product.id
                        ? { ...item, qty: item.qty + qty }
                        : item
                );
            }
            return [...prev, { ...product, qty }];
        });
    }

    function removeFromCart(id) {
        setCart((prev) => prev.filter((item) => item.id !== id));
    }

    function updateQty(id, qty) {
        if (qty < 1) return;
        setCart((prev) =>
            prev.map((item) => (item.id === id ? { ...item, qty } : item))
        );
    }

    function clearCart() {
        setCart([]);
    }

    const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

    return (
        <CartContext.Provider
            value={{ cart, addToCart, removeFromCart, updateQty, clearCart, total, totalItems }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}