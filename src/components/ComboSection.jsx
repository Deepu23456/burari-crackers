import combos from "../data/combos.json";

const WHATSAPP_NUMBER = "919871641179";

function ComboSection() {
    function handleBookCombo(combo) {
        let message = `Hi! Mujhe ye combo order karna hai:\n\n`;
        message += `*${combo.name}* — ₹${combo.price}\n\n`;
        combo.items.forEach((item, index) => {
            message += `${index + 1}. ${item}\n`;
        });

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
        window.open(whatsappUrl, "_blank");
    }

    return (
        <section className="py-20 px-6 bg-[#0d0000]">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-yellow-400 mb-4">
                Family Combo Packs
            </h2>
            <p className="text-gray-300 text-center mb-12">
                Sab kuch ek saath — best value, sabse kam jhanjhat
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {combos.map((combo) => (
                    <div
                        key={combo.name}
                        className="bg-[#fdf6ec] rounded-2xl overflow-hidden shadow-xl border border-orange-300 flex flex-col"
                    >
                        {/* Image — 4:5 ratio */}
                        {/* Image — reduced height */}
                        <div className="w-full aspect-video">
                            <img
                                src={combo.image}
                                alt={combo.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.src = "https://placehold.co/400x225/e5e5e5/555?text=Combo+Pack";
                                }}
                            />
                        </div>

                        {/* Content */}
                        <div className="p-5 flex flex-col flex-1">
                            <h3 className="font-display text-lg font-bold text-[#3b0000] mb-3">
                                🎉 {combo.name}
                            </h3>

                            <ul className="text-sm text-gray-700 space-y-1 mb-4 flex-1">
                                {combo.items.map((item, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                        <span className="text-orange-500">•</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>

                            <div className="flex items-center justify-between mb-4">
                                <span className="text-gray-500 text-sm">Total</span>
                                <span className="text-orange-600 font-extrabold text-2xl">₹{combo.price}</span>
                            </div>

                            <button
                                onClick={() => handleBookCombo(combo)}
                                className="w-full py-3 rounded-lg bg-green-500 hover:bg-green-600 text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors"
                            >
                                📱 Book via WhatsApp
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default ComboSection;