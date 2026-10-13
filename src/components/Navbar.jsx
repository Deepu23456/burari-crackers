import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";

function Navbar({ onCartClick }) {
    const { totalItems } = useCart();

    return (
        <nav className="sticky top-0 z-50 bg-[#1a0000]/90 backdrop-blur-md border-b border-orange-500/20">
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                <Link
                    to="/"
                    className="font-display text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500"
                >
                    Burari Crackers
                </Link>

                <button
                    onClick={onCartClick}
                    className="relative flex items-center gap-2 px-4 py-2 cursor-pointer rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-yellow-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 1.994-4.693 2.602-7.163.106-.43-.212-.87-.655-.87H5.606m1.9 8.033l-1.9-8.033M7.5 14.25L5.106 5.272M7.5 14.25L4.75 4.5"
                        />
                    </svg>
                    <span className="text-white text-sm font-medium hidden sm:inline">Cart</span>

                    {totalItems > 0 && (
                        <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                            {totalItems}
                        </span>
                    )}
                </button>
            </div>
        </nav>
    );
}

export default Navbar;