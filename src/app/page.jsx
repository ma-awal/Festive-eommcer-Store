import home from "@/data/home.json";
import Hero from "@/components/sections/Hero";
import CategoryRow from "@/components/sections/CategoryRow";

import BestSellers from "@/components/sections/BestSellers";

import AdBanner from "@/components/sections/AdBanner";
import HowItWorks from "@/components/sections/HowItWorks";

export default function HomePage() {
  return (
    <>
      <Hero data={home.hero} />
      <CategoryRow data={home.categoriesSection} />
      <BestSellers data={home.bestSellers} />
      <HowItWorks data={home.howItWorks} />
      <AdBanner data={home.adBanner} />
    </>
  );
}
