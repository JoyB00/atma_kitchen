import Navbar from "../Component/Navbar";
import Intro from "./HomePartition/IntroPart";
import Product from "./HomePartition/ProductPart";
import About from "./HomePartition/AboutPart";
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
      <Footer />
    </div>
  );
}
