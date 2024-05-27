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
  faCalendar,
  faCartShopping,
  faChevronDown,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import {
  FetchCartsPerDate,
  UpdateCartItem,
  DeleteCartItem,
  DeleteListItem,
  UpdateListCartItem,
} from "../../../api/CartApi";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { StoreTransaction } from "../../../api/TransactionApi";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../../lib/FormatCurrency";
import InputDateTime from "../../../Component/InputDateTime";
import Modal from "@mui/material/Modal";

export default function CartPage() {
  const queryClient = useQueryClient();
  const [carts, setCarts] = useState([]);
  const [filteredCarts, setFilteredCarts] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [loading, setLoading] = useState(false);
  const [dataSelected, setDataSelected] = useState();
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [updateDate, setUpdateDate] = useState({ order_date: null });
  const navigate = useNavigate();

  const handleSearch = (event) => {
    setSearch(event.target.value);
    const filteredItem = carts.filter((item) =>
      item.order_date.toLowerCase().includes(event.target.value.toLowerCase()),
    );
    setFilteredCarts(filteredItem);
  };

  const handleOrderSelected = (event) => {
    const orderDataSelected = filteredCarts.filter(
      (item) => item.order_date === event.target.value,
    );
    let total = 0;
    orderDataSelected[0].data.forEach((element) => {
      total += element.total_price;
    });
    orderDataSelected[0].total = total;
    setDataSelected(orderDataSelected);
    setUpdateDate({ ...updateDate, late_order_date: event.target.value });
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
          if (updatedCart.data[index].products) {
            updatedCart.data[index] = {
              ...updatedCart.data[index],
              quantity: updatedCart.data[index].quantity + 1,
              total_price:
                updatedCart.data[index].products.product_price *
                (updatedCart.data[index].quantity + 1),
            };
          } else {
            updatedCart.data[index] = {
              ...updatedCart.data[index],
              quantity: updatedCart.data[index].quantity + 1,
              total_price:
                updatedCart.data[index].hampers.hampers_price *
                (updatedCart.data[index].quantity + 1),
            };
          }
        } else if (
          type === "decrement" &&
          updatedCart.data[index].quantity > 1
        ) {
          if (updatedCart.data[index].products) {
            updatedCart.data[index] = {
              ...updatedCart.data[index],
              quantity: updatedCart.data[index].quantity - 1,
              total_price:
                updatedCart.data[index].products.product_price *
                (updatedCart.data[index].quantity - 1),
            };
          } else {
            updatedCart.data[index] = {
              ...updatedCart.data[index],
              quantity: updatedCart.data[index].quantity - 1,
              total_price:
                updatedCart.data[index].hampers.hampers_price *
                (updatedCart.data[index].quantity - 1),
            };
          }
        }

        updatedDataSelected[0] = updatedCart;
        let total = 0;
        updatedCart.data.forEach((element) => {
          total += element.total_price;
        });
        setTotal(total);
        updatedCart.total = total;

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

  const handleStoreOrder = (data) => {
    if (!dataSelected) {
      toast.error("Please Check The Order Before", {
        style: {
          backgroundColor: "#000000",
          color: "#ffffff",
        },
        position: "bottom-right",
      });
    } else {
      setLoading(true);

      toast.promise(
        StoreTransaction(data[0])
          .then((res) => {
            console.log(res);
            queryClient.invalidateQueries(["carts"]);
            navigate(`/checkout/${res.transaction.id}`);
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
            throw err.message;
          }),
        {
          loading: "Loading",
          success: "Let's complete your transaction ",
          error: (err) => err,
        },
        {
          style: {
            backgroundColor: "#000000",
            color: "#ffffff",
          },
          position: "bottom-right",
        },
      );
    }
  };

  const swallDelete = (data) => {
    withReactContent(Swal)
      .fire({
        title: `Are you sure to Delete ${data.products ? data.products.product_name : data.hampers.hampers_name} ?  `,
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
                    queryClient.invalidateQueries(["carts"]);
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
              position: "bottom-right",
            },
          );
        }
      });
  };
  const swallDeleteList = (data) => {
    withReactContent(Swal)
      .fire({
        title: `Are you sure to Delete Order Date ${data[0].order_date.slice(0, 16)} ?  `,
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
            DeleteListItem(data[0])
              .then(() => {
                setIsFetching(true);
                setDataSelected(null);
                FetchCartsPerDate()
                  .then((res) => {
                    setCarts(res);
                    setFilteredCarts(res);
                    setTotal(0);
                    setIsFetching(false);
                    queryClient.invalidateQueries(["carts"]);
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
              position: "bottom-right",
            },
          );
        }
      });
  };

  const handleOpenModalChangeDate = () => {
    if (!dataSelected) {
      toast.error("Please Check The Order Before", {
        style: {
          backgroundColor: "#000000",
          color: "#ffffff",
        },
        position: "bottom-right",
      });
    } else {
      setOpenModal(true);
    }
  };

  const handleDeleteListCart = (event, data) => {
    event.preventDefault();
    if (!dataSelected) {
      toast.error("Please Check The Order Before", {
        style: {
          backgroundColor: "#000000",
          color: "#ffffff",
        },
        position: "bottom-right",
      });
    } else {
      swallDeleteList(data);
    }
  };

  const swallUpdateDate = (data) => {
    console.log(updateDate);
    setOpenModal(false);
    withReactContent(Swal)
      .fire({
        title: `Are you sure to Update Order Date ?  `,
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
            UpdateListCartItem(data)
              .then(() => {
                setIsFetching(true);
                setDataSelected(null);
                FetchCartsPerDate()
                  .then((res) => {
                    queryClient.invalidateQueries(["carts"]);
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
                throw err.message;
              }),
            {
              loading: "Loading",
              success: "Your file has been Updated",
              error: (err) => err,
            },
            {
              style: {
                backgroundColor: "#000000",
                color: "#ffffff",
              },
              position: "bottom-right",
            },
          );
        }
      });
  };

  const handleChangeDate = (event) => {
    setUpdateDate({ ...updateDate, order_date: event.target.value });
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
    <>
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
              <Button
                className="bg-orange-500 text-white hover:text-white"
                onClick={handleOpenModalChangeDate}
              >
                <FontAwesomeIcon icon={faCalendar} className="pe-2" />
                Change Date
              </Button>
              <Button
                className="me-2 ms-2 border-orange-500 text-orange-500 hover:text-white"
                onClick={(event) => handleDeleteListCart(event, dataSelected)}
              >
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
            <div className="col-span-8 rounded-2xl border-2 border-gray-200 p-5">
              {isFetching ? (
                <RotateLoader
                  color="orange"
                  loading={isFetching}
                  cssOverride={{ marginTop: "10%" }}
                  size={50}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                <>
                  {filteredCarts.map((item) => {
                    return (
                      <div
                        className="py-2 "
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
                              Order on date : {item.order_date.slice(0, 16)}
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
                                  <th className="text-end font-medium ">
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
                                        <div className="flex w-3/4 justify-between rounded-2xl border-2 border-gray-200">
                                          <div className="">
                                            <Button
                                              withoutAnimate
                                              className={`border-0 border-transparent bg-transparent text-orange-500`}
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
                                          <div className="flex items-center text-center">
                                            <p>{order.quantity}</p>
                                          </div>
                                          <div className="">
                                            <Button
                                              withoutAnimate
                                              className={`border-0 bg-transparent text-orange-500`}
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
                                      <td className="text-end font-semibold">
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
            <div className="col-span-4 mt-7">
              <div className=" rounded-2xl border-2 border-gray-200 px-5 py-3 text-start text-black">
                <table className="my-2 w-full">
                  <tr>
                    <td>Qty</td>
                    <td>Item</td>
                    <td>Sub Total</td>
                  </tr>
                  {dataSelected &&
                    dataSelected[0].data.map((data) => {
                      return (
                        <tr>
                          <td className="py-2">{data.quantity}</td>
                          <td>
                            {data.products
                              ? data.products.product_name
                              : data.hampers.hampers_name}
                          </td>
                          <td>{formatCurrency(data.total_price)}</td>
                        </tr>
                      );
                    })}
                </table>
                <hr />
                <p className="pt-6 text-start text-lg font-semibold">
                  Total Price :{" "}
                </p>
                <p className="text-start text-lg font-semibold">
                  {formatCurrency(total)}{" "}
                </p>
                <Button
                  className="my-6 w-full bg-orange-500 text-white"
                  onClick={() => handleStoreOrder(dataSelected)}
                >
                  <FontAwesomeIcon icon={faCartShopping} />{" "}
                  {loading ? "Loading..." : "Order Now"}
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-auto from-cyan-100 via-transparent md:pt-12">
          <Footer />
        </div>
      </div>
      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="flex size-full items-center justify-center">
          <div className="flex w-1/3 flex-col rounded-xl bg-white">
            <div className="w-full rounded-t-xl bg-orange-500 p-5">
              <label
                htmlFor="delivery_method"
                className="ps-2 text-xl font-semibold text-white"
              >
                Change Order Date
              </label>
            </div>
            <div className="p-5 text-black">
              <label htmlFor="order_date">Change Order Date</label>
              <InputDateTime
                id="date"
                name="date"
                placeholder="Select Date"
                onChange={handleChangeDate}
              />
            </div>
            <div className="flex w-full justify-end gap-x-2 rounded-b-xl bg-gray-100 p-4">
              <Button
                className="bg-orange-500 text-white"
                onClick={() => swallUpdateDate(updateDate)}
              >
                Save
              </Button>
              <Button
                className="border-orange-500 bg-transparent text-orange-500 hover:text-white"
                onClick={() => setOpenModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
