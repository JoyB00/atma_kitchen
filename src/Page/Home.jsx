import Navbar from "../Component/Navbar";
import Intro from "./HomePartition/IntroPart";
import Product from "./HomePartition/ProductPart";
import About from "./HomePartition/AboutPart";
import FeaturedProduct from "./HomePartition/FeaturedProductPart";
import BestSeller from "./HomePartition/BestSellerPart";
import MobilePart from "./HomePartition/MobilePart";
import Footer from "../Component/Footer";
import { AnimatePresence } from "framer-motion";
export default function Home() {
  return (
    <div className="w-full bg-transparent">
      <Navbar />
      <Intro />
      <AnimatePresence>
        <Product />
      </AnimatePresence>
      <About />
      <FeaturedProduct />
      <BestSeller />
      <MobilePart />
      <Footer />
    </div>
  );
}
