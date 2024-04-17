import Navbar from "../Component/Navbar";
import Intro from "./HomePartition/IntroPart";
import Product from "./HomePartition/ProductPart";
import About from "./HomePartition/AboutPart";
import FeaturedProduct from "./HomePartition/FeaturedProductPart";
import BestSeller from "./HomePartition/BestSellerPart";
import MobilePart from "./HomePartition/MobilePart";
import Footer from "../Component/Footer";
import { AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { FetchAllProducts } from "../api/ProductApi";
import { RotateLoader } from "react-spinners";

export default function Home() {
  const { isPending, error, data } = useQuery({
    queryKey: ["products"],
    queryFn: FetchAllProducts,
  });
  if (isPending)
    return (
      <div className="w-full h-screen bg-gradient-to-tl to-orange-50 via-transparent from-transparent">
        <RotateLoader
          color="orange"
          loading={isPending}
          cssOverride={{
            position: "absolute",
            top: "320%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            borderColor: "red",
          }}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  if (error) return <p>{error.message}</p>;
  return (
    <div className="w-full bg-transparent">
      <Navbar />
      <Intro />
      <AnimatePresence>
        <Product />
      </AnimatePresence>
      <About />
      <FeaturedProduct data={data} loading={isPending} />
      <BestSeller />
      <MobilePart />
      <Footer />
    </div>
  );
}
