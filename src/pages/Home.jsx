import Hero from "../components/Hero.jsx";
import OfferBanner from "../components/OfferBanner.jsx";
import CategoryGrid from "../components/CategoryGrid.jsx";
import HowItWorks from "../components/HowItWorks.jsx";
import ComboSection from "../components/ComboSection.jsx";

function Home() {
  return (
    <div>
      <OfferBanner />
      <Hero />
      <CategoryGrid />
      <ComboSection />
      <HowItWorks />
    </div>
  )
}

export default Home