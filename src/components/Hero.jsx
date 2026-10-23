import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import FireworksBackground from "./FireworksBackground.jsx";

function Hero() {
    const titleRef = useRef(null);
    const subRef = useRef(null);
    const btnRef = useRef(null);
    const heroRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline();
            tl.from(titleRef.current, { y: 60, opacity: 0, duration: 1, ease: "power3.out" })
                .from(subRef.current, { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" }, "-=0.5")
                .from(btnRef.current, {
                    opacity: 0,
                    duration: 0.6,
                    ease: "back.out(1.7)",
                    // clearProps: "transform",
                }, "-=0.3");
        }, heroRef);

        return () => ctx.revert();
    }, []);

    function scrollToCategories() {
        document.getElementById("categories")?.scrollIntoView({ behavior: "smooth" });
    }

    return (
        <section
            ref={heroRef}
            className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-cover bg-center"
            style={{ backgroundImage: "url('/heroImage.png')" }}
        >
            {/* dark overlay taaki text clearly dikhe image ke upar */}
            <div className="absolute inset-0 bg-black/40"></div>

            <div className="absolute top-10 left-10 w-72 h-72 bg-yellow-500/30 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-10 w-72 h-72 bg-orange-600/30 rounded-full blur-3xl"></div>

            {/* <FireworksBackground /> */}



            <p className="relative z-10 text-yellow-400 tracking-[0.3em] uppercase text-sm mb-4">This Diwali</p>

            <h1
                ref={titleRef}
                className="font-display relative z-10 text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 mb-4 drop-shadow-[0_0_25px_rgba(255,150,0,0.6)] tracking-wide"
                style={{ backgroundSize: "200% auto", animation: "shine 3s linear infinite" }}
            >
                Burari Crackers
            </h1>

            <p ref={subRef} className="relative z-10 text-gray-200 text-lg md:text-xl max-w-xl px-2 mb-8">
                Roshni, dhamaka aur khushiyaan — sabse best crackers, best price mein.
            </p>

            <button
                ref={btnRef}
                onClick={scrollToCategories}
                className="relative z-10 px-8 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 hover:scale-95 text-black font-bold text-lg shadow-lg shadow-orange-500/40 transition-transform cursor-pointer"
            >
                Shop Now
            </button>
        </section>
    );
}

export default Hero;