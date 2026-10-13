import { Link } from "react-router-dom";
import products from "../data/getProducts.js";

const categoryImages = {
    fuljhari: "/images/categories/fuljhari.png",
    rockets: "/images/categories/rockets.png",
    bombs: "/images/categories/bombs.png",
    chakri: "/images/categories/chakri.png",
    anar: "/images/categories/anar.png",
    skyShot: "/images/categories/skyShot.png",
    kids: "/images/categories/kids.png",
};

// har card ko alag tilt angle dene ke liye
const tilts = ["-rotate-3", "rotate-2", "-rotate-2", "rotate-3"];

function CategoryGrid() {
    const categories = [...new Map(
        products.map((p) => [p.category, { category: p.category, label: p.categoryLabel }])
    ).values()];

    return (
        <section id="categories" className="py-20 px-6 bg-[#0d0000] overflow-hidden">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-yellow-400 mb-16">
                Shop by Category
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-6xl mx-auto">
                {categories.map((cat, index) => (
                    <Link
                        key={cat.category}
                        to={`/category/${cat.category}`}
                        className={`group relative ${tilts[index % tilts.length]} hover:rotate-0 hover:scale-110 transition-all duration-300`}
                    >
                        <div
                            className="relative overflow-hidden border-4 border-yellow-400/70 shadow-xl shadow-black/50"
                            style={{ clipPath: "polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%)" }}
                        >
                            <img
                                src={categoryImages[cat.category]}
                                alt={cat.label}
                                className="w-full h-70 object-cover group-hover:scale-125 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent"></div>

                            <span className="absolute bottom-3 left-0 right-0 text-center text-white font-bold text-lg font-display tracking-wide drop-shadow-lg">
                                {cat.label}
                            </span>
                        </div>

                        {/* glow effect on hover */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg blur-lg opacity-0 group-hover:opacity-40 transition-opacity -z-10"></div>
                    </Link>
                ))}
            </div>
        </section>
    );
}

export default CategoryGrid;