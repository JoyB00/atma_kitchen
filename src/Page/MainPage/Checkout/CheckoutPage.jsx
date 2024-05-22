import Navbar from "../../../Component/Navbar";
import Footer from "../../../Component/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../../../Component/Button";
import { GetAuthCustomerTransactions } from "../../../api/TransactionApi";
import { redirect, useRouteLoaderData } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { getPicture } from "../../../api";
import { formatCurrency } from "../../../lib/FormatCurrency";
import toast from "react-hot-toast";
import Badge from "../../../Component/Badge";
import ModalDelivery from "./DeliveryModal";
import { useState } from "react";

export default function CheckoutPage() {
  const orderDetail = useRouteLoaderData("order-detail");
  const user = JSON.parse(sessionStorage.getItem("user"));
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className="flex h-screen w-full flex-col bg-transparent">
        <Navbar />
        <div className="px-12 pt-32">
          <div className=" grid grid-cols-3 rounded-3xl border-transparent bg-gradient-to-t from-orange-400 to-orange-500 ps-6 drop-shadow-md">
            <h1 className="col-span-2 py-6 text-left font-semibold text-white">
              <FontAwesomeIcon icon={faCartShopping} /> CHECKOUT
            </h1>
            <div className="col-span-1 ms-12 rounded-tl-full bg-orange-600" />
          </div>
          <div className="grid grid-cols-12 gap-x-16 text-orange-500">
            <div className="col-span-8 text-start">
              <div
                className={`mb-6 mt-4 w-full rounded-2xl border-2 border-gray-200 bg-white p-5 text-black ${!orderDetail.transaction.delivery_id && "hidden"}`}
              >
                <p className="font-semibold text-gray-500">ALAMAT PENGIRIMAN</p>
                <p className="pt-4 font-semibold">
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className="text-orange-500"
                  />{" "}
                  Rumah &#183;{"  "}
                  {user.fullName}
                </p>
                <p className="py-3">
                  Rumah tembok orange depannya ada batu sikat, Lodtunduh,
                  Kecamatan Ubud, Kabupaten Gianyar, Bali 80582, Ubud, Kab.
                  Gianyar, Bali, 6289643938007
                </p>{" "}
              </div>
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
                  {orderDetail.details.map((item) => {
                    return (
                      <tr>
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
                        <td className="pe-6 text-end font-bold text-orange-600">
                          <Badge
                            bgColor="bg-white p-2"
                            ringColor="ring-orange-500"
                          >
                            {formatCurrency(item.total_price)}
                          </Badge>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="col-span-4">
              <div className=" mt-4 rounded-2xl border-2 border-gray-200 p-5 text-start text-black">
                <p className="pb-4 font-semibold">Order Details</p>
                <div className="flex justify-between pb-2">
                  <p>Sub Total</p>
                  <p>{formatCurrency(orderDetail.transaction.total_price)}</p>
                </div>
                <Button
                  className={`mt-4 w-full border-orange-500 text-orange-500 hover:text-white ${orderDetail.transaction.delivery_id && "hidden"}`}
                  onClick={() => setOpenModal(true)}
                >
                  Choose Delivery Method
                </Button>
                <div
                  className={`flex justify-between pb-2 ${!orderDetail.transaction.delivery_id && "hidden"}`}
                >
                  <p>Ongkos Kirim</p>
                  <p>Total</p>
                </div>
                <div
                  className={`flex justify-between pb-2 ${!orderDetail.transaction.delivery_id && "hidden"}`}
                >
                  <p>Potongan n Poin</p>
                  <p>Total</p>
                </div>
                <div
                  className={`flex justify-between pb-2 ${!orderDetail.transaction.delivery_id && "hidden"}`}
                >
                  <p>Total</p>
                  <p>Total</p>
                </div>
                <Button
                  className={`mt-4 w-full bg-orange-500 text-white ${!orderDetail.transaction.delivery_id && "opacity-20"}`}
                  withoutAnimate={!orderDetail.transaction.delivery_id}
                  disabled={!orderDetail.transaction.delivery_id}
                >
                  Choose Delivery Method
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-auto from-cyan-100 via-transparent md:pt-12">
          <Footer />
        </div>
      </div>
      <ModalDelivery
        open={openModal}
        setOpen={setOpenModal}
        id={orderDetail.transaction.delivery_id}
      />
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
