import Navbar from "../../../Component/Navbar";
import Footer from "../../../Component/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faChevronRight,
  faCoins,
  faLocationDot,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../../../Component/Button";
import {
  GetAuthCustomerTransactions,
  PaymentCustomer,
  StorePaymentEvidence,
} from "../../../api/TransactionApi";
import { redirect, useRouteLoaderData } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { getPicture } from "../../../api";
import { formatCurrency } from "../../../lib/FormatCurrency";
import toast from "react-hot-toast";
import ModalDelivery from "./DeliveryModal";
import ModalPayment from "./PaymentModal";
import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BeatLoader } from "react-spinners";
import { Slider } from "@mui/material";
import Input from "../../../Component/Input";
import { GetTokenMidtrans } from "../../../api/MidtransTokenizer";
import { motion } from "framer-motion";
import FileUploader from "../../../Component/FileUploader";

export default function CheckoutPage() {
  let animate = {
    initial: { opacity: 0, y: -100 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };
  const orderDetail = useRouteLoaderData("order-detail");
  const [dataPayment, setDataPayment] = useState({
    id: orderDetail.transaction.id,
    amount: 0,
    first_name: orderDetail.transaction.customer.users.fullName,
    last_name: orderDetail.transaction.customer.users.fullName,
    email: orderDetail.transaction.customer.users.email,
    phone: orderDetail.transaction.customer.users.phoneNumber,
    details: orderDetail.details,
  });

  const [data, setData] = useState({
    id: orderDetail.transaction.id,
    point: 0,
    nominal_point: 0,
    point_earned: 0,
    total_price: orderDetail.transaction.delivery_id
      ? orderDetail.transaction.total_price +
        orderDetail.transaction.delivery.shipping_cost
      : orderDetail.transaction.total_price,
    payment_method: null,
  });

  const queryClient = useQueryClient();
  const [openModal, setOpenModal] = useState(false);
  const [openModalPayment, setOpenModalPayment] = useState(false);
  const [point, setPoint] = useState(0);
  const [clickPoint, setClickPoint] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [picture, setPicture] = useState({
    id: orderDetail.transaction.id,
    payment_evidence: null,
  });

  const orders = useQuery({
    queryKey: ["orders"],
    queryFn: () => GetAuthCustomerTransactions(orderDetail.transaction.id),
  });

  const handleSliderPoint = (event) => {
    setPoint(event.target.value);
  };
  const handlePointOnInput = (event) => {
    setPoint((prev) => {
      if (event.target.value > orders.data.transaction.customer.point) {
        return prev;
      } else {
        return event.target.value;
      }
    });
  };

  const handlePaymentCustomer = (data) => {
    toast.promise(
      PaymentCustomer(data)
        .then((res) => {
          console.log(res);
          queryClient.invalidateQueries(["orders"]);
        })
        .catch((err) => {
          throw err.message;
        }),
      {
        loading: "Loading",
        success: "Your Payment already success",
        error: (err) => err.message,
      },
      {
        style: {
          backgroundColor: "#000000",
          color: "#ffffff",
        },
        position: "bottom-right",
      },
    );
  };

  const handlePaymentCash = () => {
    console.log("cash");
    if (!data.payment_method) {
      toast.error("Choose Your Payment Method", {
        style: {
          backgroundColor: "#000000",
          color: "#ffffff",
        },
        position: "bottom-right",
      });
    }
  };

  const handlePaymentEMoney = async (event, data) => {
    event.preventDefault();
    if (
      orders.data.transaction.delivery.delivery_method === "Delivery Courier" &&
      !orders.data.transaction.delivery.shipping_cost
    ) {
      toast.error("Wait for confirmation of shipping costs", {
        style: {
          backgroundColor: "#000000",
          color: "#ffffff",
        },
        position: "bottom-right",
      });
    } else {
      setLoadingButton(true);
      const response = await GetTokenMidtrans(dataPayment);
      setLoadingButton(false);
      const { snapToken } = response;
      window.snap.pay(snapToken, {
        onSuccess: (result) => {
          console.log("Success:", result);
          handlePaymentCustomer(data);
        },
        onPending: (result) => {
          console.log("Pending:", result);
        },
        onError: (result) => {
          console.log("Error:", result);
        },
        onClose: () => {
          console.log(
            "Customer closed the popup without finishing the payment",
          );
        },
      });
    }
  };

  const handlePicture = (event) => {
    event.preventDefault();
    setPicture({ ...picture, payment_evidence: event.target.files[0] });
  };
  const removePicture = () => {
    setPicture({ ...picture, payment_evidence: null });
  };
  const handleStorePaymentEvidence = (data) => {
    if (!data.payment_evidence) {
      toast.error("Please upload payment evidence", {
        style: {
          backgroundColor: "#000000",
          color: "#ffffff",
        },
        position: "bottom-right",
      });
    } else {
      toast.promise(
        StorePaymentEvidence(data)
          .then((res) => {
            console.log(res);
            queryClient.invalidateQueries(["orders"]);
            orders.refetch();
          })
          .catch((err) => {
            throw err.message;
          }),
        {
          loading: "Loading",
          success: "Your payment evidence has been successfully sent",
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

  useEffect(() => {
    if (!orders.isFetching) {
      if (orders.data.transaction.delivery_id) {
        setData({
          ...data,
          total_price: parseFloat(
            orderDetail.transaction.total_price -
              data.nominal_point +
              orders.data.transaction.delivery.shipping_cost,
          ),
          point_earned: orders.data.getPoint,
        });
        setDataPayment({
          ...dataPayment,
          amount: parseFloat(
            orderDetail.transaction.total_price -
              data.nominal_point +
              orders.data.transaction.delivery.shipping_cost,
          ),
        });
      }
    }
  }, [data.point, orders.data]);

  return (
    <>
      {console.log(picture)}
      <div className="flex h-screen w-full flex-col bg-transparent">
        <Navbar />
        <div className="px-12 pt-32">
          <div className=" grid grid-cols-3 rounded-3xl border-transparent bg-gradient-to-t from-orange-400 to-orange-500 ps-6 drop-shadow-md">
            <h1 className="col-span-2 py-6 text-left font-semibold text-white">
              <FontAwesomeIcon icon={faCartShopping} /> CHECKOUT
            </h1>
            <div className="col-span-1 ms-12 rounded-tl-full bg-orange-600" />
          </div>
          {orders.isFetching ? (
            <>
              {" "}
              <BeatLoader
                color="orange"
                loading={orders.isFetching}
                cssOverride={{
                  justifyContent: "center",
                  marginTop: "5%",
                  borderColor: "red",
                }}
                size={20}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            </>
          ) : (
            <div className="grid grid-cols-12 gap-x-16 text-orange-500">
              {console.log("payment", orders.data.transaction.payment_method)}
              <div className="col-span-8 text-start">
                {orders.data.transaction.delivery_id && (
                  <div
                    className={`mb-6 mt-4 w-full rounded-2xl border-2 border-gray-200 bg-white p-5 text-black `}
                  >
                    <p className="font-semibold text-gray-500">
                      DELIVERY METHOD :{" "}
                      {orders.data.transaction.delivery.delivery_method}
                    </p>
                    {orders.data.transaction.delivery.delivery_method ===
                      "Delivery Courier" && (
                      <>
                        <p className="pt-4 font-semibold">
                          <FontAwesomeIcon
                            icon={faLocationDot}
                            className="text-orange-500"
                          />{" "}
                          Rumah &#183;{"  "}
                          {orders.data.transaction.customer.users.fullName}
                        </p>
                        <p className="py-3">
                          {orders.data.transaction.delivery.recipient_address}
                        </p>{" "}
                      </>
                    )}
                    <Button
                      className={`mt-3 border-orange-500 text-orange-500 hover:text-white ${
                        (orders.data.transaction.delivery.delivery_method ===
                          "Delivery Courier" &&
                          orders.data.transaction.delivery.shipping_cost !==
                            null) ||
                        orders.data.transaction.status !== "notPaid"
                          ? "hidden"
                          : undefined
                      }`}
                      onClick={() => setOpenModal(true)}
                    >
                      Change Delivery Method
                    </Button>
                  </div>
                )}
                <table className="mb-6 mt-4 w-full rounded-2xl bg-white text-gray-500 drop-shadow-md">
                  <thead className="border-b-2">
                    <tr>
                      <th className="py-8 ps-8 text-start font-medium">Item</th>
                      <th className="pe-6 text-end font-medium ">Qty</th>
                      <th className="pe-6 text-end font-medium">Price</th>
                      <th className="pe-6 text-end font-medium">Total Price</th>
                    </tr>
                  </thead>
                  <tbody className="text-black">
                    {orders.data.details.map((item) => {
                      return (
                        <tr key={item.id}>
                          <td className="py-6 ps-6 font-medium ">
                            <div className="flex items-center ">
                              <LazyLoadImage
                                effect="blur"
                                src={
                                  item.product
                                    ? getPicture(
                                        item.product.product_picture,
                                        "product",
                                      )
                                    : getPicture(
                                        item.hampers.hampers_picture,
                                        "hampers",
                                      )
                                }
                                alt=""
                                className="h-24 w-24 rounded-3xl object-cover"
                              />
                              <div>
                                <p className="ps-3 text-start text-lg">
                                  {item.product
                                    ? item.product.product_name
                                    : item.hampers.hampers_name}
                                </p>
                                <p className="ps-3 text-start text-sm text-gray-400">
                                  {item.status_item}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="pe-6 text-end">{item.quantity} pcs</td>
                          <td className="pe-6 text-end">
                            {formatCurrency(item.price)}
                          </td>
                          <td className="pe-6 text-end font-semibold text-black">
                            {formatCurrency(item.total_price)}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="col-span-4">
                <div className=" mt-4 rounded-2xl border-2 border-gray-200 p-5 text-start text-black">
                  <div
                    className={`${orders.data.transaction.status !== "notPaid" && "hidden"}`}
                  >
                    <p className="pb-4 font-semibold">Order Details</p>
                    <div className="flex justify-between pb-2">
                      <p>Sub Total</p>
                      <p>
                        {formatCurrency(orders.data.transaction.total_price)}
                      </p>
                    </div>
                    <Button
                      className={`mt-4 w-full border-orange-500 text-orange-500 hover:text-white ${orders.data.transaction.delivery_id && "hidden"}`}
                      onClick={() => setOpenModal(true)}
                    >
                      Choose Delivery Method
                    </Button>
                    {orders.data.transaction.delivery_id && (
                      <>
                        <div className={` flex  justify-between pb-2`}>
                          <p>Shipping Cost</p>
                          <div>
                            {" "}
                            {!orders.data.transaction.delivery.distance &&
                            orders.data.transaction.delivery.delivery_method ===
                              "Delivery Courier" ? (
                              <p className="text-gray-300">
                                Waiting Confirmation...
                              </p>
                            ) : (
                              <p className="text-red-500">
                                +
                                {formatCurrency(
                                  orders.data.transaction.delivery
                                    .shipping_cost,
                                )}
                              </p>
                            )}
                          </div>
                        </div>
                        <div
                          className={`flex justify-between pb-2 ${point === 0 && "hidden"}`}
                        >
                          <p>Potongan {data.point} Poin</p>
                          <p className="text-green-500">
                            -{formatCurrency(data.nominal_point)}
                          </p>
                        </div>
                        <hr />
                        <div
                          className={`flex justify-between pb-2 pt-4 font-semibold`}
                        >
                          <p>Total</p>
                          <p>{formatCurrency(data.total_price)}</p>
                        </div>
                        <div className={`flex justify-between pb-4 `}>
                          <p>Points Earned</p>
                          <p>{data.point_earned} points</p>
                        </div>
                        <hr />
                        <Button
                          className=" mt-4 w-full border-orange-500 bg-orange-200 text-start font-normal hover:border-orange-500"
                          withoutAnimate
                          onClick={() => setClickPoint((prev) => !prev)}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <FontAwesomeIcon
                                icon={faCoins}
                                className="pe-4 text-orange-700"
                                size="xl"
                              />
                              <p>Use Your Point </p>
                            </div>
                            <FontAwesomeIcon
                              icon={faChevronRight}
                              className="text-orange-700"
                            />
                          </div>
                        </Button>

                        {clickPoint && (
                          <div className="pt-4">
                            <label htmlFor="point">
                              Your Points (
                              {orders.data.transaction.customer.point})
                            </label>
                            <div className="flex items-center justify-between gap-x-4 ps-2">
                              <Slider
                                onChange={handleSliderPoint}
                                value={parseInt(point)}
                                aria-label="Small"
                                valueLabelDisplay="auto"
                                max={orders.data.transaction.customer.point}
                                min={0}
                              />
                              <div className="w-1/3">
                                <Input
                                  type="number"
                                  id="point"
                                  onChange={handlePointOnInput}
                                  className=" rounded-2xl border-2 p-2 text-center"
                                  value={point}
                                  textCenter
                                />
                              </div>

                              <Button
                                className="text-orange-500"
                                withoutAnimate
                                onClick={() => {
                                  setClickPoint(false);
                                  setData({
                                    ...data,
                                    point: point,
                                    nominal_point: point * 100,
                                  });
                                }}
                              >
                                Save
                              </Button>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                    <div className="pt-4">
                      <label htmlFor="payment_method">
                        Choose Payment Methods
                      </label>
                      <motion.select
                        {...animate}
                        className="mt-2 w-full rounded-3xl border-0 px-3 py-3 text-sm text-black shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                        onChange={(event) =>
                          setData({
                            ...data,
                            payment_method: event.target.value,
                          })
                        }
                        name="payment_method"
                        id="payment_method"
                        defaultValue={
                          orders.data.transaction.payment_method
                            ? orders.data.transaction.payment_method
                            : "default"
                        }
                      >
                        <option value="default" disabled>
                          Choose your Payment Method
                        </option>
                        <option value='"Cash"'>Cash</option>
                        <option value='"E-Money"'>E-Money</option>
                      </motion.select>
                    </div>
                    <Button
                      className={`mt-4 w-full bg-orange-500 text-white ${
                        !orders.data.transaction.delivery_id ||
                        orders.data.transaction.status !== "notPaid"
                          ? "opacity-20"
                          : undefined
                      }`}
                      withoutAnimate={!orders.data.transaction.delivery_id}
                      disabled={
                        !orders.data.transaction.delivery_id ||
                        orders.data.transaction.status !== "notPaid"
                      }
                      onClick={
                        data.payment_method === '"E-Money"'
                          ? (event) => handlePaymentEMoney(event, data)
                          : handlePaymentCash
                      }
                    >
                      {loadingButton ? "Loading..." : "Pay Now"}
                    </Button>
                  </div>

                  {/* when already paid */}
                  {orders.data.transaction.status !== "notPaid" && (
                    <div>
                      <p
                        className={`text-sm font-semibold text-red-500 ${orders.data.transaction.payment_evidence && "hidden"}`}
                      >
                        <i>
                          *Could you please send over the proof of payment as
                          soon as possible? This will help us process the
                          transaction promptly. Thanks a bunch!{" "}
                        </i>
                      </p>
                      {picture.payment_evidence ||
                      orders.data.transaction.payment_evidence ? (
                        <div className="mt-2  rounded-lg border border-dashed border-gray-900/25 px-6 py-8">
                          <div className="flex h-36 justify-center ">
                            <img
                              src={
                                picture || !orders.data.transaction
                                  ? URL.createObjectURL(
                                      picture.payment_evidence,
                                    )
                                  : getPicture(
                                      hampersData.hampers_picture,
                                      "hampers",
                                    )
                              }
                              alt="hampers picture"
                              className="h-36 object-cover"
                            />
                          </div>
                          <div className="flex justify-center">
                            <Button
                              className={`me-2 mt-4 bg-transparent text-orange-500 hover:text-white ${orders.data.transaction.payment_evidence && "hidden"} `}
                              type="button"
                              onClick={() =>
                                document
                                  .getElementById("payment_evidence")
                                  .click()
                              }
                            >
                              <FontAwesomeIcon
                                icon={faPencil}
                                className="me-1"
                              />{" "}
                              Change
                            </Button>
                            <Button
                              className={`me-2 mt-4 bg-transparent text-orange-500 hover:text-white ${orders.data.transaction.payment_evidence && "hidden"}`}
                              type="button"
                              onClick={removePicture}
                            >
                              <FontAwesomeIcon
                                icon={faTrash}
                                className="me-1"
                              />{" "}
                              Delete
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <></>
                      )}
                      <div
                        className={`${
                          picture.payment_evidence ||
                          orders.data.transaction.payment_evidence
                            ? "hidden"
                            : ""
                        } `}
                      >
                        <FileUploader
                          id="payment_evidence"
                          onChange={handlePicture}
                        />
                      </div>
                      <Button
                        className={`mt-2 w-full bg-green-500 text-white ${orders.data.transaction.payment_evidence && "hidden"}`}
                        onClick={() => handleStorePaymentEvidence(picture)}
                      >
                        Send
                      </Button>
                      <Button className=" mt-2 w-full border-blue-500 text-blue-500 hover:text-white">
                        Show Nota
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="mt-auto from-cyan-100 via-transparent md:pt-12">
          <Footer />
        </div>
      </div>
      {orders.isFetching ? (
        <></>
      ) : (
        <>
          <ModalDelivery
            open={openModal}
            setOpen={setOpenModal}
            transaction={orders.data}
            id={orders.data.transaction.delivery_id}
          />
          <ModalPayment
            open={openModalPayment}
            setOpen={setOpenModalPayment}
            transaction={orders.data}
            id={orders.data.transaction.delivery_id}
          />
        </>
      )}
    </>
  );
}

export async function loader({ params }) {
  try {
    const transactionID = params.id;
    const response = await GetAuthCustomerTransactions(transactionID);
    console.log(response);
    return response;
  } catch (error) {
    console.log("disini");
    toast.error(error.message, {
      style: {
        backgroundColor: "#000000",
        color: "#ffffff",
      },
      position: "bottom-right",
    });
    return redirect("/");
  }
}
