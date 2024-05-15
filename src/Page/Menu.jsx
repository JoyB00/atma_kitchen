import Navbar from "../Component/Navbar";
import { NavLink } from "react-router-dom";
import defaultImage from "../assets/ProductAsset/lapis leggite.jpg";
import Input from "../Component/Input";
import CardProduct from "../Component/Card";
import Footer from "../Component/Footer";
import { Pagination } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FetchAllProducts } from "../api/ProductApi";
import { RotateLoader } from "react-spinners";
import { getPicture } from "../api";
export default function Menu() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProduct, setFilteredProduct] = useState([]);
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
    const filteredItem = products.filter(
      (item) =>
        item.product_name
          .toLowerCase()
          .includes(event.target.value.toLowerCase()) ||
        item.categories.category_name
          .toLowerCase()
          .includes(event.target.value.toLowerCase())
    );
    setFilteredProduct(filteredItem);
  };

  const handleSortByCategory = (event) => {
    setPage(1);
    setFilterSelected(event.target.id);
    setSortSelected("default");
    const filteredItem = products.filter(
      (item) =>
        item.categories.category_name === event.target.id ||
        event.target.id === "all"
    );
    setFilteredProduct(filteredItem);
    filteredProduct.sort;
  };

  const handleSortByAscDsc = (event) => {
    setPage(1);
    setSortSelected(event.target.value);
    if (event.target.value === "ascending") {
      const ascSort = [...filteredProduct].sort((a, b) =>
        a.product_name.toLowerCase() < b.product_name.toLowerCase() ? -1 : 1
      );
      setFilteredProduct(ascSort);
    } else if (event.target.value === "descending") {
      const dscSort = [...filteredProduct].sort((a, b) =>
        a.product_name.toLowerCase() > b.product_name.toLowerCase() ? -1 : 1
      );
      setFilteredProduct(dscSort);
    } else {
      setFilteredProduct(products);
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
    FetchAllProducts()
      .then((res) => {
        setProducts(res);
        setFilteredProduct(res);
        setIsPending(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <AnimatePresence>
      <div className="h-screen w-full bg-transparent">
        <Navbar />
        <div className="text-orange-500 pt-36 ps-6 ">
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
        <div className="flex justify-between px-10 items-center pb-4">
          <div className="w-1/5 ps-2">
            <motion.select
              {...animate}
              className="mt-2 w-full text-black border-0 py-3 px-3 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm rounded-3xl"
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
        <div className=" grid grid-cols-5 gap-y-6 gap-x-3 px-12">
          <div className=" h-fit col-span-1 border-2 border-gray-100 rounded-xl text-black text-left ">
            <h2 className="font-semibold pt-4 px-4">Filtered By Category</h2>
            <ul className="text-black px-8 pt-3 pb-6 ">
              <li className="pt-2">
                <NavLink
                  className={`${
                    filterSelected === "all" ? "text-orange-500" : "text-black"
                  }`}
                  id="all"
                  onClick={handleSortByCategory}
                >
                  All
                </NavLink>
              </li>
              <li className="pt-2">
                <NavLink
                  className={`${
                    filterSelected === "Cake" ? "text-orange-500" : "text-black"
                  }`}
                  id="Cake"
                  onClick={handleSortByCategory}
                >
                  Cake
                </NavLink>
              </li>
              <li className="pt-2">
                <NavLink
                  className={`${
                    filterSelected === "Bread"
                      ? "text-orange-500"
                      : "text-black"
                  }`}
                  id="Bread"
                  onClick={handleSortByCategory}
                >
                  Bread
                </NavLink>
              </li>
              <li className="pt-2">
                <NavLink
                  className={`${
                    filterSelected === "Drink"
                      ? "text-orange-500"
                      : "text-black"
                  }`}
                  id="Drink"
                  onClick={handleSortByCategory}
                >
                  Drink
                </NavLink>
              </li>
              <li className="pt-2">
                <NavLink
                  className={`${
                    filterSelected === "Titipan"
                      ? "text-orange-500"
                      : "text-black"
                  }`}
                  id="Titipan"
                  onClick={handleSortByCategory}
                >
                  Entrusted
                </NavLink>
              </li>
              <li className="pt-2">
                <NavLink
                  className="text-black"
                  id="Hampers"
                  onClick={handleSortByCategory}
                >
                  Hampers
                </NavLink>
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
                  {filteredProduct.length === 0 ? (
                    <div className="bg-orange-50 col-span-3 h-screen flex justify-center items-center ">
                      <p className="text-black">Product Not Found</p>
                    </div>
                  ) : (
                    filteredProduct
                      .slice(startIndex, endIndex)
                      .map((product) => (
                        <motion.li
                          className="col-span-1"
                          key={product.id}
                          variants={productItem}
                          transition={{ type: "spring" }}
                        >
                          <CardProduct
                            id={product.id}
                            alt={product.product_name}
                            image={
                              product.product_picture
                                ? getPicture(product.product_picture, "product")
                                : defaultImage
                            }
                            desc={
                              product.description.length < 120
                                ? product.description
                                : `${product.description.substring(0, 100)}...`
                            }
                            price={
                              product.product_price <= 999
                                ? product.product_price
                                : (product.product_price / 1000).toFixed(1) +
                                  "K"
                            }
                            title={product.product_name}
                          />
                        </motion.li>
                      ))
                  )}
                </motion.ul>
                <Pagination
                  count={Math.ceil(filteredProduct.length / productPerPage)}
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
