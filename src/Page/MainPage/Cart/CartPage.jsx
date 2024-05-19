import Navbar from "../../../Component/Navbar";
import { NavLink } from "react-router-dom";
import Button from "../../../Component/Button";
import Input from "../../../Component/Input";
import Footer from "../../../Component/Footer";
import { Pagination } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import { RotateLoader } from "react-spinners";
import { getPicture } from "../../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faChevronDown,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import {
  FetchCartsPerDate,
  UpdateCartItem,
  DeleteCartItem,
} from "../../../api/CartApi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function CartPage() {
  function formatCurrency(amount) {
    const formatter = new Intl.NumberFormat("ID", {
      style: "currency",
      currency: "IDR",
    });
    return formatter.format(amount);
  }
  const [carts, setCarts] = useState([]);
  const [filteredCarts, setFilteredCarts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [dataSelected, setDataSelected] = useState();
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");

  const handleSearch = (event) => {
    setSearch(event.target.value);
    const filteredItem = carts.filter((item) =>
      item.order_date.toLowerCase().includes(event.target.value.toLowerCase()),
    );
    console.log(filteredItem);
    setFilteredCarts(filteredItem);
  };

  const handleOrderSelected = (event) => {
    const orderDataSelected = filteredCarts.filter(
      (item) => item.order_date === event.target.value,
    );
    setDataSelected(orderDataSelected);
    let total = 0;
    orderDataSelected[0].data.forEach((element) => {
      total += element.total_price;
    });
    setTotal(total);
  };
  const handleChangeAmount = (type, index, item) => {
    if (!dataSelected || dataSelected[0]?.order_date !== item.order_date) {
      toast.error("Please Check The Order Before", {
        style: {
          backgroundColor: "#000000",
          color: "#ffffff",
        },
        position: "bottom-right",
      });
    } else {
      setDataSelected((prevDataSelected) => {
        const updatedDataSelected = [...prevDataSelected];
        const updatedCart = { ...updatedDataSelected[0] };

        if (
          type === "increment" &&
          updatedCart.data[index].quantity < updatedCart.data[index].limit_item
        ) {
          updatedCart.data[index] = {
            ...updatedCart.data[index],
            quantity: updatedCart.data[index].quantity + 1,
            total_price:
              updatedCart.data[index].products.product_price *
              (updatedCart.data[index].quantity + 1),
          };
          console.log("up", updatedCart.data[index]);
        } else if (
          type === "decrement" &&
          updatedCart.data[index].quantity > 1
        ) {
          updatedCart.data[index] = {
            ...updatedCart.data[index],
            quantity: updatedCart.data[index].quantity - 1,
            total_price:
              updatedCart.data[index].products.product_price *
              (updatedCart.data[index].quantity - 1),
          };
        }

        updatedDataSelected[0] = updatedCart;
        let total = 0;
        updatedCart.data.forEach((element) => {
          total += element.total_price;
        });
        setTotal(total);

        setCarts((prevCarts) =>
          prevCarts.map((cart) =>
            cart.order_date === updatedCart.order_date ? updatedCart : cart,
          ),
        );

        UpdateCartItem(updatedCart.data[index])
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.error(err);
          });

        return updatedDataSelected;
      });
    }
  };

  const handleDeletePerItem = (event, data) => {
    event.preventDefault();
    if (!dataSelected || dataSelected[0]?.order_date !== data.order_date) {
      toast.error("Please Check The Order Before", {
        style: {
          backgroundColor: "#000000",
          color: "#ffffff",
        },
        position: "bottom-right",
      });
    } else {
      swallDelete(data);
    }
  };

  const swallDelete = (data) => {
    withReactContent(Swal)
      .fire({
        title: `Are you sure to Delete ${data.products.product_name} ?  `,
        text: `You won't be able to revert this!`,
        icon: `warning`,
        showCancelButton: true,
        confirmButtonColor: `#3085d6`,
        cancelButtonColor: `#d33`,
        confirmButtonText: `Yes, update it!`,
      })
      .then((result) => {
        if (result.isConfirmed) {
          toast.promise(
            DeleteCartItem(data.id)
              .then(() => {
                setIsFetching(true);
                setDataSelected(null);
                FetchCartsPerDate()
                  .then((res) => {
                    setCarts(res);
                    setFilteredCarts(res);
                    setTotal(0);
                    setIsFetching(false);
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              })
              .catch((err) => {
                console.error(err);
              }),
            {
              loading: "Loading",
              success: "Your file has been Deleted",
              error: (err) => err,
            },
            {
              style: {
                backgroundColor: "#000000",
                color: "#ffffff",
              },
              position: "top-center",
            },
          );
        }
      });
  };

  useEffect(() => {
    setIsFetching(true);
    FetchCartsPerDate()
      .then((res) => {
        setCarts(res);
        setFilteredCarts(res);
        setIsFetching(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <AnimatePresence>
      <div className="flex h-screen w-full flex-col bg-transparent">
        {console.log(dataSelected)}
        <Navbar />
        <div className="px-12 pt-36">
          <div className="grid grid-cols-3 rounded-3xl border-transparent bg-gradient-to-t from-orange-400 to-orange-500 ps-6 drop-shadow-md">
            <h1 className="col-span-2 py-6 text-left font-semibold text-white">
              <FontAwesomeIcon icon={faCartShopping} /> CART ITEM
            </h1>
            <div className="col-span-1 ms-12 rounded-tl-full bg-orange-600" />
          </div>
          <div className="flex items-center justify-between gap-x-2 pt-2">
            <div>
              <Button className="border-orange-500 text-orange-500 hover:text-white">
                <FontAwesomeIcon icon={faTrash} className="pe-2" />
                Remove Item
              </Button>
            </div>
            <div className="w-1/3 ps-2">
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
          <div className="grid grid-cols-12 gap-x-8">
            <div className="col-span-8 pt-5">
              {isFetching ? (
                <RotateLoader
                  color="orange"
                  loading={isFetching}
                  cssOverride={{
                    position: "absolute",
                    top: "40%",
                    left: "30%",
                    transform: "translate(-50%, -50%)",
                    borderColor: "red",
                  }}
                  size={50}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                <>
                  {filteredCarts.map((item) => {
                    return (
                      <div
                        className="py-2"
                        key={item.order_date}
                        aria-disabled={true}
                      >
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
                              id={item.order_date}
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
                                {item.data.map((order, index) => {
                                  return (
                                    <motion.tr
                                      className="border-t-2 border-gray-100  text-black"
                                      key={order.id}
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
                                          <div>
                                            <p className="ps-3 text-start text-lg">
                                              {order.products
                                                ? order.products.product_name
                                                : order.hampers.hampers_name}
                                            </p>
                                            <p className="ps-3 text-start text-sm text-gray-400">
                                              {order.status_item}
                                            </p>
                                            <Button
                                              className="flex justify-start bg-transparent text-start text-orange-500"
                                              withoutAnimate
                                              onClick={(event) =>
                                                handleDeletePerItem(
                                                  event,
                                                  order,
                                                )
                                              }
                                            >
                                              Delete
                                            </Button>
                                          </div>
                                        </div>
                                      </td>
                                      <td>
                                        <div className="flex w-2/4 justify-between py-2">
                                          <div className="pt-2">
                                            <Button
                                              className={`border-orange-500 bg-transparent text-orange-500 hover:text-white`}
                                              onClick={() =>
                                                handleChangeAmount(
                                                  "decrement",
                                                  index,
                                                  order,
                                                )
                                              }
                                            >
                                              -
                                            </Button>
                                          </div>
                                          <div className="w-3/5 text-center">
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
                                                handleChangeAmount(
                                                  "increment",
                                                  index,
                                                  order,
                                                )
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
            <div className="col-span-4 mt-7 h-20 rounded-2xl border-2 border-gray-300 px-5 pt-5 text-start text-black">
              <p className="text-lg font-semibold">Total Price : </p>
              <p className="text-lg font-semibold">{formatCurrency(total)} </p>
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
