import { useCart } from "../context/CartContext.jsx";

const WHATSAPP_NUMBER = "919871641179";

function CartDrawer({ isOpen, onClose }) {
    const { cart, removeFromCart, updateQty, clearCart, total, totalItems } = useCart();

    function handleCheckout() {
        if (cart.length === 0) return;

        let message = "Hi! Mujhe ye items order karne hain:\n\n";
        cart.forEach((item, index) => {
            message += `${index + 1}. ${item.name} (${item.categoryLabel}) x ${item.qty} = ₹${item.price * item.qty}\n`;
        });
        message += `\nTotal Items: ${totalItems}`;
        message += `\nTotal Amount: ₹${total}`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
        window.open(whatsappUrl, "_blank");

        clearCart(); // order place hote hi cart clear ho jayega
        onClose(); // drawer bhi band ho jayega
    }


    return (
        <>
            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40"
                    onClick={onClose}
                ></div>
            )}

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-[#fdf6ec] z-50 shadow-2xl transform transition-transform duration-300 flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-orange-200">
                    <h2 className="text-xl font-bold text-[#3b0000] font-display">Your Cart</h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-orange-100 text-[#3b0000] text-xl"
                    >
                        ✕
                    </button>
                </div>

                {/* Items */}
                <div className="flex-1 overflow-y-auto px-5 py-4">
                    {cart.length === 0 ? (
                        <p className="text-gray-500 text-center mt-10">Your cart is empty 🛒</p>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {cart.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center gap-3 border-b border-orange-100 pb-4"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-16 h-16 object-cover rounded-lg bg-gray-200"
                                        onError={(e) => {
                                            e.target.src = "https://placehold.co/100x100/e5e5e5/555?text=No+Img";
                                        }}
                                    />

                                    <div className="flex-1">
                                        <h3 className="text-[#3b0000] font-semibold text-sm">{item.name}</h3>
                                        <p className="text-orange-600 font-bold text-sm">₹{item.price}</p>

                                        <div className="flex items-center gap-2 mt-1">
                                            <button
                                                onClick={() => updateQty(item.id, item.qty - 1)}
                                                className="w-6 h-6 rounded-full bg-orange-100 text-[#3b0000] text-sm font-bold hover:bg-orange-200"
                                            >
                                                −
                                            </button>
                                            <span className="text-[#3b0000] text-sm w-5 text-center">{item.qty}</span>
                                            <button
                                                onClick={() => updateQty(item.id, item.qty + 1)}
                                                className="w-6 h-6 rounded-full bg-orange-100 text-[#3b0000] text-sm font-bold hover:bg-orange-200"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => removeFromCart(item.id)}
                                        className="text-red-500 text-xs font-medium hover:underline"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {cart.length > 0 && (
                    <div className="border-t border-orange-200 px-5 py-4">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-[#3b0000] font-semibold">Total ({totalItems} items)</span>
                            <span className="text-[#3b0000] font-bold text-lg">₹{total}</span>
                        </div>

                        <button
                            onClick={handleCheckout}
                            className="w-full py-3 cursor-pointer rounded-lg bg-green-500 hover:bg-green-600 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors"
                        >
                            📱 Book via WhatsApp
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}

export default CartDrawer;