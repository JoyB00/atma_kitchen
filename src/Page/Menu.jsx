import Navbar from "../Component/Navbar";
import { NavLink } from "react-router-dom";
import defaultImage from "../assets/ProductAsset/lapis leggite.jpg";
import CardProduct from "../Component/Card";
import Footer from "../Component/Footer";
import { Pagination } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FetchAllProducts } from "../api/ProductApi";
import { RotateLoader } from "react-spinners";
import { useQuery } from "@tanstack/react-query";
import { getPicture } from "../api";
export default function Menu() {
  const [page, setPage] = useState(1);

  const handleChange = (e, p) => {
    setPage(p);
  };

  const productPerPage = 6;
  const startIndex = (page - 1) * productPerPage;
  const endIndex = page * productPerPage;

  const card = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.1,
        staggerChildren: 0.2,
      },
    },
  };

  const productItem = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const { isPending, data } = useQuery({
    queryKey: ["products"],
    queryFn: FetchAllProducts,
  });

  return (
    <AnimatePresence>
      <div className="h-screen w-full bg-transparent">
        <Navbar />
        <div className="pb-20 ps-6 pt-36 text-orange-500">
          <div className="flex ps-6 text-xl ">
            <h1 className="text-5xl font-semibold">What We Served</h1>
          </div>
          <div className="flex ps-8 text-xl ">
            <NavLink to="/">
              <p className="text-black hover:text-orange-500">Home</p>
            </NavLink>
            <p className="text-black "> / </p>
            <NavLink to="/menu">
              <p className="text-black hover:text-orange-500">Menu</p>
            </NavLink>
          </div>
        </div>
        <div className=" grid grid-cols-5 gap-x-3 gap-y-6 px-12">
          <div className=" col-span-1 h-fit rounded-xl border-2 border-gray-100 text-left text-black ">
            <h2 className="px-4 pt-4 font-semibold">Sorted By</h2>
            <ul className="border-b-2 px-8 pb-6 pt-3 text-black">
              <li className="pt-2">
                <NavLink className="text-black">Available Product</NavLink>
              </li>
              <li className="pt-2">
                <NavLink className="text-black">A-Z</NavLink>
              </li>
              <li className="pt-2">
                <NavLink className="text-black">Z-A</NavLink>
              </li>
              <li className="pt-2">
                <NavLink className="text-black">Recommended</NavLink>
              </li>
            </ul>

            {/* Category */}
            <h2 className="px-4 pt-4 font-semibold">Category</h2>
            <ul className="px-8 pb-6 pt-3 text-black ">
              <li className="pt-2">
                <NavLink className="text-black">Cake</NavLink>
              </li>
              <li className="pt-2">
                <NavLink className="text-black">Bread</NavLink>
              </li>
              <li className="pt-2">
                <NavLink className="text-black">Drink</NavLink>
              </li>
              <li className="pt-2">
                <NavLink className="text-black">Entrusted</NavLink>
              </li>
              <li className="pt-2">
                <NavLink className="text-black">Hampers</NavLink>
              </li>
            </ul>
          </div>
          <div className="col-span-4">
            {isPending ? (
              <div className="h-screen w-full bg-transparent">
                <RotateLoader
                  color="orange"
                  loading={isPending}
                  cssOverride={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    borderColor: "red",
                  }}
                  size={100}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
            ) : (
              <>
                <motion.ul
                  variants={card}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-3 gap-4 rounded-xl"
                >
                  {data.slice(startIndex, endIndex).map((product) => (
                    <motion.li
                      className="col-span-1"
                      key={product.id}
                      variants={productItem}
                      transition={{ type: "spring" }}
                    >
                      <CardProduct
                        alt={product.product_name}
                        image={
                          product.product_picture
                            ? getPicture(product.product_picture, "product")
                            : defaultImage
                        }
                        desc="
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim id eveniet nemo aut ad vel tempora?"
                        price={
                          product.product_price <= 999
                            ? product.product_price
                            : (product.product_price / 1000).toFixed(1) + "K"
                        }
                        title={product.product_name}
                      />
                    </motion.li>
                  ))}
                </motion.ul>
                <Pagination
                  count={Math.ceil(data.length / productPerPage)}
                  size="small"
                  className="mt-6 flex justify-center"
                  onChange={handleChange}
                />
              </>
            )}
          </div>
        </div>
        <div className="from-cyan-100 via-transparent md:pt-12">
          <Footer />
        </div>
      </div>
    </AnimatePresence>
  );
}
