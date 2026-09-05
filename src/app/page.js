// import Image from "next/image";
import HeroSection from "./components/HeroSection";
import Soupport from "./components/Soupport";
import Category from "./components/Category";
import FeaturedProducts from "./components/FeaturedProducts";
export default function Home() {
  return (
    <div className="">
    <HeroSection />
    <Soupport />
    <Category />
    <FeaturedProducts />
    </div>
  );
}
