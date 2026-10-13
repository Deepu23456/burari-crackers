import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import products from "../data/getProducts.js";
import { useCart } from "../context/CartContext.jsx";

function CategoryPage() {
  const { categoryName } = useParams();

  const categoryProducts = products.filter((p) => p.category === categoryName);
  const label = categoryProducts[0]?.categoryLabel || categoryName;

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

        <h1 className="text-4xl md:text-6xl font-bold text-yellow-400 mb-10 text-center font-display drop-shadow-lg">
          {label}
        </h1>

        {categoryProducts.length === 0 ? (
          <p className="text-gray-200 text-center">No products found in this category.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ProductCard({ product }) {
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
      {/* Image — perfect square, half width */}
      <div className="w-1/2 aspect-square flex-shrink-0">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.src = "https://placehold.co/300x300/e5e5e5/555?text=No+Image";
          }}
        />
      </div>

      {/* Content — other half */}
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