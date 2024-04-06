import Navbar from "../Component/Navbar";
import Intro from "./HomePartition/IntroPart";
import Product from "./HomePartition/ProductPart";
import About from "./HomePartition/AboutPart";
import FeaturedProduct from "./HomePartition/FeaturedProductPart";
import BestSeller from "./HomePartition/BestSellerPart";
import Footer from "../Component/Footer";
export default function Home() {
  return (
    <div className="w-full bg-transparent">
      <div className="bg-white w-full">
        <Navbar />
      </div>
      <Intro />
      <Product />
      <About />
      <FeaturedProduct />
      <BestSeller />
      <Footer />
    </div>
  );
}
