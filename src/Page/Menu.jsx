import React, { useEffect, useState } from "react";
import Navbar from "../Component/Navbar";
import { NavLink, useLocation } from "react-router-dom";
import defaultImage from "../assets/ProductAsset/lapis leggite.jpg";
import Input from "../Component/Input";
import CardProduct from "../Component/Card";
import Footer from "../Component/Footer";
import { Pagination } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { FetchAllProducts } from "../api/ProductApi";
import { RotateLoader } from "react-spinners";
import { getPicture } from "../api";
import Category from "../assets/CategoryProduct/Category";

export default function Menu() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProduct, setFilteredProduct] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [filterSelected, setFilterSelected] = useState("all");
  const [sortSelected, setSortSelected] = useState("default");
  const location = useLocation();

  const animate = {
    initial: { opacity: 0, y: -100 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get("category") || "all";
    setFilterSelected(category);
  }, [location]);

  useEffect(() => {
    setIsPending(true);
    FetchAllProducts()
      .then((res) => {
        setProducts(res);
        setIsPending(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    handleSortByCategory(filterSelected);
  }, [products, filterSelected]);

  const handleChange = (e, p) => {
    setPage(p);
  };

  const handleSearch = (event) => {
    setPage(1);
    setSearch(event.target.value);
    const filteredItem = products.filter(
      (item) =>
        item.product_name.toLowerCase().includes(event.target.value.toLowerCase()) ||
        item.categories.category_name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredProduct(filteredItem);
  };

  const handleSortByCategory = (categoryId) => {
    const filteredItem = products.filter(
      (item) =>
        item.categories.category_name === categoryId ||
        categoryId === "all"
    );
    setFilteredProduct(filteredItem);
  };

  const handleSortByAscDsc = (event) => {
    setPage(1);
    setSortSelected(event.target.value);
    let sortedProducts = [...filteredProduct];

    if (event.target.value === "ascending") {
      sortedProducts.sort((a, b) => a.product_name.localeCompare(b.product_name));
    } else if (event.target.value === "descending") {
      sortedProducts.sort((a, b) => b.product_name.localeCompare(a.product_name));
    } else {
      sortedProducts = filteredProduct;
    }

    setFilteredProduct(sortedProducts);
  };

  const productPerPage = 9;
  const startIndex = (page - 1) * productPerPage;
  const endIndex = page * productPerPage;

  const card = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1, scale: 1, transition: { delayChildren: 0.1, staggerChildren: 0.2 }
    },
  };

  const productItem = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <AnimatePresence>
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
            <NavLink to="/menu">
              <p className="text-black hover:text-orange-500">Menu</p>
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
        <div className="grid grid-cols-5 gap-x-3 gap-y-6 px-12">
          <div className="col-span-1">
            <motion.ul
              initial="hidden"
              animate="visible"
              variants={card}
              className="sticky top-36 mx-auto flex w-full flex-col space-y-5 rounded-xl bg-transparent shadow-none"
            >
              <motion.li
                key="all"
                variants={productItem}
                transition={{ type: "spring" }}
                className={`${
                  filterSelected === "all" ? "text-orange-500" : "text-black"
                } cursor-pointer hover:text-orange-500`}
                onClick={() => handleSortByCategory("all")}
              >
                All
              </motion.li>
              {Category.map((item) => (
                <motion.li
                  key={item.alt}
                  variants={productItem}
                  transition={{ type: "spring" }}
                  className={`${
                    filterSelected === item.alt
                      ? "text-orange-500"
                      : "text-black"
                  } cursor-pointer hover:text-orange-500`}
                  onClick={() => handleSortByCategory(item.alt)}
                >
                  {item.alt}
                </motion.li>
              ))}
            </motion.ul>
          </div>
          <div className="col-span-4 h-screen">
            {isPending ? (
              <div className="flex h-screen items-center justify-center">
                <RotateLoader color="#F99417" />
              </div>
            ) : (
              <>
                <motion.ul
                  variants={card}
                  initial="hidden"
                  animate="visible"
                  className="grid w-full grid-cols-3 gap-6"
                >
                  {filteredProduct.length === 0 ? (
                    <div className="col-span-3 flex h-screen items-center justify-center bg-orange-50">
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
                            url="menu"
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
                                : (product.product_price / 1000).toFixed(1) + "K"
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
        <div className="from-cyan-100 via-transparent md:pt-12">
          <Footer />
        </div>
      </div>
    </AnimatePresence>
  );
}
