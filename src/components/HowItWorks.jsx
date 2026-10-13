const steps = [
    {
        number: "01",
        icon: "🛍️",
        title: "Browse & Select",
        desc: "Categories dekho, products aur prices check karo.",
    },
    {
        number: "02",
        icon: "🛒",
        title: "Add to Cart",
        desc: "Jo chahiye add karo, quantity set karo.",
    },
    {
        number: "03",
        icon: "📱",
        title: "Book via WhatsApp",
        desc: "Cart se order WhatsApp pe bhejo — sirf 10-20% advance pay karo.",
    },
    {
        number: "04",
        icon: "🏪",
        title: "Pickup from Shop",
        desc: "Apka saaman side mein rakh diya jayega — apni availability se shop visit karke le jao.",
    },
];

function HowItWorks() {
    return (
        <section className="py-16 px-6 bg-[#0d0000]">
            <div className="max-w-6xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center text-yellow-400 mb-3 font-display">
                    How It Works
                </h2>
                <p className="text-gray-300 text-center mb-4">
                    Ye ek pickup-based booking site hai — home delivery nahi hoti.
                </p>

                <div className="flex justify-center mb-12">
                    <span className="inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-sm px-5 py-2 rounded-full">
                        🎁 Book Online & Get Extra 5% OFF
                    </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {steps.map((step) => (
                        <div
                            key={step.number}
                            className="relative bg-gradient-to-br from-orange-600/10 to-red-700/10 border border-orange-500/20 rounded-2xl p-6 flex flex-col items-center text-center"
                        >
                            <span className="absolute top-3 right-4 text-4xl font-extrabold text-orange-500/20">
                                {step.number}
                            </span>
                            <span className="text-4xl mb-3">{step.icon}</span>
                            <h3 className="text-white font-semibold mb-2">{step.title}</h3>
                            <p className="text-gray-300 text-sm">{step.desc}</p>
                        </div>
                    ))}
                </div>

                <p className="text-center text-gray-400 text-xs mt-8 max-w-2xl mx-auto">
                    Note: Booking confirm karne ke liye total amount ka 10-20% advance pay karna hoga. Poora saaman shop pe visit karke collect karna hoga — koi home delivery available nahi hai.
                </p>
            </div>
        </section>
    );
}

export default HowItWorks;