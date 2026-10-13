function OfferBanner() {
  const text = "🎉 First 100 Customers Special — Flat 20% to 50% OFF! Limited Time Offer 🎉";

  return (
    <div className="w-full bg-gradient-to-r from-yellow-500 via-orange-500 to-red-600 py-3 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee">
        {/* text ko do baar repeat kar rahe hain taaki loop seamless dikhe */}
        <span className="text-black font-bold text-sm md:text-base px-8">
          {text}
        </span>
        <span className="text-black font-bold text-sm md:text-base px-8">
          {text}
        </span>
        <span className="text-black font-bold text-sm md:text-base px-8">
          {text}
        </span>
        <span className="text-black font-bold text-sm md:text-base px-8">
          {text}
        </span>
      </div>
    </div>
  );
}

export default OfferBanner;