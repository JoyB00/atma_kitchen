import Navbar from "../../../Component/Navbar";
import { NavLink } from "react-router-dom";
import defaultImage from "../../../assets/ProductAsset/lapis leggite.jpg";
import Input from "../../../Component/Input";
import CardProduct from "../../../Component/Card";
import Footer from "../../../Component/Footer";
import { Pagination } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FetchAllHampers } from "../../../api/HampersApi";
import { RotateLoader } from "react-spinners";
import { getPicture } from "../../../api";
export default function HampersMenu() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [hampers, setHampers] = useState([]);
  const [filteredHampers, setFilteredHampers] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [filterSelected, setFilterSelected] = useState("all");
  const [sortSelected, setSortSelected] = useState("default");
  let animate = {
    initial: { opacity: 0, y: -100 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const handleChange = (e, p) => {
    setPage(p);
  };
  const handleSearch = (event) => {
    setPage(1);
    setSearch(event.target.value);
    const filteredItem = hampers.filter((item) =>
      item.hampers_name
        .toLowerCase()
        .includes(event.target.value.toLowerCase()),
    );
    setFilteredHampers(filteredItem);
  };

  const handleSortByAscDsc = (event) => {
    setPage(1);
    setSortSelected(event.target.value);
    if (event.target.value === "ascending") {
      const ascSort = [...filteredHampers].sort((a, b) =>
        a.hampers_name.toLowerCase() < b.hampers_name.toLowerCase() ? -1 : 1,
      );
      setFilteredHampers(ascSort);
    } else if (event.target.value === "descending") {
      const dscSort = [...filteredHampers].sort((a, b) =>
        a.hampers_name.toLowerCase() > b.hampers_name.toLowerCase() ? -1 : 1,
      );
      setFilteredHampers(dscSort);
    } else {
      setFilteredHampers(hampers);
    }
  };

  const productPerPage = 9;
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

  useEffect(() => {
    setIsPending(true);
    FetchAllHampers()
      .then((res) => {
        setHampers(res.hampers);
        setFilteredHampers(res.hampers);
        setIsPending(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <AnimatePresence>
      {console.log(hampers)}
      <div className="h-screen w-full bg-transparent">
        <Navbar />
        <div className="ps-6 pt-36 text-orange-500 ">
          <div className="flex ps-6 text-xl ">
            <h1 className="text-5xl font-semibold">What We Served</h1>
          </div>
          <div className="flex ps-8 text-xl ">
            <NavLink to="/">
              <p className="text-black hover:text-orange-500">Home</p>
            </NavLink>
            <p className="px-2 text-black"> {">"} </p>
            <NavLink to="/hampers">
              <p className="text-black hover:text-orange-500">Hampers</p>
            </NavLink>
          </div>
        </div>
        <div className="flex items-center justify-between px-10 pb-4">
          <div className="w-1/5 ps-2">
            <motion.select
              {...animate}
              className="mt-2 w-full rounded-3xl border-0 px-3 py-3 text-sm text-black shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
              onChange={handleSortByAscDsc}
              name="category"
              id="category"
              value={sortSelected}
            >
              <option value="default">Sort By Default</option>
              <option value="ascending">A-Z</option>
              <option value="descending">Z-A</option>
            </motion.select>
          </div>
          <div className="w-1/4">
            <Input
              id="search"
              label="Search"
              withAnimate
              placeholder="Search..."
              type="text"
              onChange={handleSearch}
            />
          </div>
        </div>
        <div className=" grid grid-cols-5 gap-x-3 gap-y-6 px-12">
          <div className="col-span-5 ">
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
                  {filteredHampers.length === 0 ? (
                    <div className="col-span-3 flex h-screen items-center justify-center bg-orange-50 ">
                      <p className="text-black">Hampers Not Found</p>
                    </div>
                  ) : (
                    filteredHampers
                      .slice(startIndex, endIndex)
                      .map((hampers) => (
                        <motion.li
                          className="col-span-1"
                          key={hampers.id}
                          variants={productItem}
                          transition={{ type: "spring" }}
                        >
                          <CardProduct
                            id={hampers.id}
                            alt={hampers.hampers_name}
                            image={
                              hampers.hampers_picture
                                ? getPicture(hampers.hampers_picture, "hampers")
                                : defaultImage
                            }
                            desc={
                              `Detail Hampers: ` +
                              hampers.hampers_detail.map((detail) => {
                                if (detail.product?.product_name) {
                                  return " " + detail.product.product_name;
                                } else {
                                  return (
                                    " " + detail.ingredients.ingredient_name
                                  );
                                }
                              })
                            }
                            price={
                              hampers.hampers_price <= 999
                                ? hampers.hampers_price
                                : (hampers.hampers_price / 1000).toFixed(1) +
                                  "K"
                            }
                            title={hampers.hampers_name}
                          />
                        </motion.li>
                      ))
                  )}
                </motion.ul>
                <Pagination
                  count={Math.ceil(filteredHampers.length / productPerPage)}
                  size="small"
                  className="mt-6 flex justify-center"
                  onChange={handleChange}
                />
              </>
            )}
          </div>
        </div>
        <div className="from-cyan-100 via-transparent md:pt-12 ">
          <Footer />
        </div>
      </div>
    </AnimatePresence>
  );
}
