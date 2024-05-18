import Navbar from "../../../Component/Navbar";
import { NavLink } from "react-router-dom";
import Button from "../../../Component/Button";
import Input from "../../../Component/Input";
import Footer from "../../../Component/Footer";
import { Pagination } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { RotateLoader } from "react-spinners";
import { getPicture } from "../../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import { useQuery } from "@tanstack/react-query";
import { FetchCartsPerDate } from "../../../api/CartApi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
export default function CartPage() {
  function formatCurrency(amount) {
    const formatter = new Intl.NumberFormat("ID", {
      style: "currency",
      currency: "IDR",
    });
    return formatter.format(amount);
  }
  const [carts, setCarts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [dataSelected, setDataSelected] = useState();

  const handleOrderSelected = (event) => {
    const orderDataSelected = carts.filter(
      (item) => item.order_date === event.target.value,
    );
    console.log(orderDataSelected);
    setDataSelected(orderDataSelected);
  };
  // const handleChangeAmount = (type) => {
  //   if (type === "increment") {
  //     setDataSelected({
  //       ...dataSelected,
  //       [dataSelected.data.quantity]: dataSelected.data.quantity + 1,
  //     });
  //   } else if (type === "decrement" && dataSelected.data.quantity - 1 > 0) {
  //     setDataSelected({
  //       ...dataSelected,
  //       [dataSelected.data.quantity]: dataSelected.data.quantity - 1,
  //     });
  //   }
  // };
  useEffect(() => {
    setIsFetching(true);
    FetchCartsPerDate()
      .then((res) => {
        setCarts(res);
        console.log(res);
        setIsFetching(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <AnimatePresence>
      <div className="flex h-screen w-full flex-col bg-transparent">
        <Navbar />
        <div className="px-12 pt-36">
          <div className="grid grid-cols-3 rounded-3xl border-transparent bg-gradient-to-t from-orange-400 to-orange-500 ps-6 drop-shadow-md">
            <h1 className="col-span-2 py-6 text-left font-semibold text-white">
              <FontAwesomeIcon icon={faCartShopping} /> CART ITEM
            </h1>
            <div className="col-span-1 ms-12 rounded-tl-full bg-orange-600" />
          </div>
          <div className="grid grid-cols-12">
            <div className="col-span-8 pt-5">
              {isFetching ? (
                <p>Loading...</p>
              ) : (
                <>
                  {carts.map((item) => {
                    return (
                      <div className="py-2" key={item.order_date}>
                        <Accordion>
                          <AccordionSummary
                            expandIcon={
                              <FontAwesomeIcon icon={faChevronDown} />
                            }
                            aria-controls="panel2-content"
                            id="panel2-header"
                          >
                            <input
                              onChange={handleOrderSelected}
                              id="default-radio-2"
                              type="radio"
                              value={item.order_date}
                              name="default-radio"
                              className="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                            />
                            <label
                              htmlFor={item.order_date}
                              className="ms-2 text-sm font-medium "
                            >
                              Order on date : {item.order_date}
                            </label>
                          </AccordionSummary>
                          <AccordionDetails>
                            <table className="w-full rounded-2xl bg-white text-gray-500 ">
                              <thead className="border-b-2">
                                <tr>
                                  <th className="py-4 ps-8 text-start font-medium">
                                    Items
                                  </th>
                                  <th className="text-start font-medium ">
                                    Quantity
                                  </th>
                                  <th className="text-start font-medium ">
                                    Subtotal
                                  </th>
                                </tr>
                              </thead>
                              <motion.tbody
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                              >
                                {item.data.map((order) => {
                                  return (
                                    <motion.tr
                                      className="border-t-2 border-gray-100  text-black"
                                      key={item.id}
                                    >
                                      <td className="py-6 ps-6 font-medium ">
                                        <div className="flex items-center ">
                                          <LazyLoadImage
                                            effect="blur"
                                            src={
                                              order.products
                                                ? getPicture(
                                                    order.products
                                                      .product_picture,
                                                    "product",
                                                  )
                                                : getPicture(
                                                    order.hampers
                                                      .hampers_picture,
                                                    "hampers",
                                                  )
                                            }
                                            alt=""
                                            className="h-24 w-24 rounded-3xl object-cover"
                                          />
                                          <p className="ps-3 text-lg">
                                            {order.products
                                              ? order.products.product_name
                                              : order.hampers.hampers_name}
                                          </p>
                                        </div>
                                      </td>
                                      <td>
                                        <div className="flex w-2/4 justify-between py-2">
                                          <div className="pt-2">
                                            <Button
                                              className="border-orange-500 bg-transparent text-orange-500 hover:text-white"
                                              onClick={() =>
                                                handleChangeAmount("decrement")
                                              }
                                            >
                                              -
                                            </Button>
                                          </div>
                                          <div className="w-1/5 text-center">
                                            <Input
                                              id="amount"
                                              value={order.quantity}
                                              textCenter
                                              readOnly
                                            />
                                          </div>
                                          <div className="pt-2">
                                            <Button
                                              className="border-orange-500 bg-transparent text-orange-500 hover:text-white"
                                              onClick={() =>
                                                handleChangeAmount("increment")
                                              }
                                            >
                                              +
                                            </Button>
                                          </div>
                                        </div>
                                      </td>
                                      <td className="text-start">
                                        {formatCurrency(order.total_price)}
                                      </td>
                                    </motion.tr>
                                  );
                                })}
                              </motion.tbody>
                            </table>
                          </AccordionDetails>
                        </Accordion>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </div>
        <div className="mt-auto from-cyan-100 via-transparent md:pt-12">
          <Footer />
        </div>
      </div>
    </AnimatePresence>
  );
}
