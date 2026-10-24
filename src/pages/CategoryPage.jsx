import { useParams, Link } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import products from "../data/getProducts.js";
import { useCart } from "../context/CartContext.jsx";

function CategoryPage() {
  const { categoryName } = useParams();
  const [zoomedImage, setZoomedImage] = useState(null);
  const [sortOrder, setSortOrder] = useState("default"); // "default" | "asc" | "desc"

  const categoryProducts = products.filter((p) => p.category === categoryName);
  const label = categoryProducts[0]?.categoryLabel || categoryName;

  const displayedProducts = useMemo(() => {
    if (sortOrder === "asc") {
      return [...categoryProducts].sort((a, b) => a.price - b.price);
    }
    if (sortOrder === "desc") {
      return [...categoryProducts].sort((a, b) => b.price - a.price);
    }
    return categoryProducts;
  }, [categoryProducts, sortOrder]);

  function toggleSort() {
    setSortOrder((prev) => {
      if (prev === "default") return "asc";
      if (prev === "asc") return "desc";
      return "default";
    });
  }

  // Jab lightbox khula ho, background scroll disable karo
  useEffect(() => {
    if (zoomedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [zoomedImage]);

  return (
    <section
      className="relative min-h-screen px-6 py-12"
      style={{ backgroundImage: "url('/categoryImage.png')", backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-white/90 text-[#3b0000] font-semibold text-sm shadow-md hover:bg-white hover:scale-105 transition-all"
        >
          ← Back to Home
        </Link>

        <h1 className="text-4xl md:text-6xl font-bold text-yellow-400 mb-4 text-center font-display drop-shadow-lg">
          {label}
        </h1>

        <div className="flex items-center justify-center gap-2 mb-10">
          <span className="text-yellow-400 text-xs font-semibold uppercase tracking-wide">
            Filter:
          </span>
          <button
            onClick={toggleSort}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-medium text-xs shadow-md transition-all ${
              sortOrder !== "default"
                ? "bg-yellow-400 text-[#3b0000]"
                : "bg-white/90 text-[#3b0000] hover:bg-white"
            }`}
          >
            Sort by Price
            {sortOrder === "asc" && <span>↑ Low to High</span>}
            {sortOrder === "desc" && <span>↓ High to Low</span>}
            {sortOrder === "default" && <span className="text-gray-400">↑↓</span>}
          </button>
        </div>

        {displayedProducts.length === 0 ? (
          <p className="text-gray-200 text-center">No products found in this category.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {displayedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onImageClick={() => setZoomedImage(product.image)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Image Lightbox/Zoom Modal */}
      {zoomedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-6"
          onClick={() => setZoomedImage(null)}
        >
          <button
            onClick={() => setZoomedImage(null)}
            className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#3b0000] text-xl font-bold flex items-center justify-center transition-colors"
          >
            ✕
          </button>

          <img
            src={zoomedImage}
            alt="Zoomed product"
            className="max-w-full max-h-full object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}

function ProductCard({ product, onImageClick }) {
  const { cart, addToCart, removeFromCart, updateQty } = useCart();
  const [qty, setQty] = useState(1);

  const cartItem = cart.find((item) => item.id === product.id);
  const isInCart = Boolean(cartItem);
  const originalPrice = Math.round(product.price * 1.25);

  function increase() {
    if (isInCart) {
      updateQty(product.id, cartItem.qty + 1);
    } else {
      setQty((q) => q + 1);
    }
  }

  function decrease() {
    if (isInCart) {
      if (cartItem.qty > 1) {
        updateQty(product.id, cartItem.qty - 1);
      }
    } else {
      setQty((q) => (q > 1 ? q - 1 : 1));
    }
  }

  function handleAddToCart() {
    addToCart(product, qty);
    setQty(1);
  }

  function handleRemoveFromCart() {
    removeFromCart(product.id);
  }

  return (
    <div className="bg-[#fdf6ec] border border-orange-300 rounded-2xl overflow-hidden shadow-lg flex">
      <div
        className="w-1/2 aspect-square flex-shrink-0 cursor-pointer"
        onClick={onImageClick}
      >
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "https://placehold.co/300x300/e5e5e5/555?text=No+Image";
          }}
        />
      </div>

      <div className="w-1/2 p-3 flex flex-col justify-between">
        <div>
          <h3 className="text-[#3b0000] font-semibold text-sm leading-tight mb-1">
            {product.name}
          </h3>
          <div className="flex flex-col">
            <span className="text-gray-400 line-through text-xs">₹{originalPrice}</span>
            <span className="text-orange-600 font-bold text-lg">₹{product.price}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-2">
          <div className="flex items-center gap-2">
            <button
              onClick={decrease}
              className="w-7 h-7 rounded-full bg-orange-100 text-[#3b0000] font-bold hover:bg-orange-200 text-sm"
            >
              −
            </button>
            <span className="text-[#3b0000] font-medium w-5 text-center text-sm">
              {isInCart ? cartItem.qty : qty}
            </span>
            <button
              onClick={increase}
              className="w-7 h-7 rounded-full bg-orange-100 text-[#3b0000] font-bold hover:bg-orange-200 text-sm"
            >
              +
            </button>
          </div>

          {isInCart ? (
            <button
              onClick={handleRemoveFromCart}
              className="w-full py-1.5 rounded-lg bg-red-500 hover:bg-red-600 text-white font-bold text-xs transition-colors"
            >
              Remove
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              className="w-full py-1.5 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-xs hover:scale-105 transition-transform"
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;