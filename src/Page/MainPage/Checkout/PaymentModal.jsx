import Modal from "@mui/material/Modal";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "../../../Component/Button";
import pickupIcon from "../../../assets/food-delivery.png";
import deliveryIcon from "../../../assets/fast-delivery.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AddDelivery, UpdateDelivery } from "../../../api/DeliveryApi";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { formatCurrency } from "../../../lib/FormatCurrency";

const DELIVERY_METHOD = [
  {
    id: 1,
    delivery_method: "Pick-Up",
    icon: pickupIcon,
  },
  {
    id: 2,
    delivery_method: "Delivery Courier",
    icon: deliveryIcon,
  },
];
export default function ModalPayment({ open, setOpen, id, transaction }) {
  const initialState = id
    ? {
        id: id,
        transaction_id: transaction.transaction.id,
        delivery_method: transaction.transaction.delivery.delivery_method,
        recipient_address: transaction.transaction.delivery.recipient_address,
      }
    : {
        transaction_id: transaction.transaction.id,
        delivery_method: "Pick-Up",
        recipient_address: "",
      };
  const [data, setData] = useState(initialState);
  const [total, setTotal] = useState(0);
  const [load, setLoad] = useState(false);
  const queryClient = useQueryClient();

  let animate = {
    initial: { opacity: 0, y: -100 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  useEffect(() => {
    transaction.details.forEach((item) => {
      setTotal(total + item.price * item.quantity);
    });
  }, []);

  return (
    <>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
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
                Shopping Bill
              </label>
            </div>
            <div className="p-5 text-black">
              <div>
                <p className="font-semibold">Atma Kitchen </p>
                <p className="font-semibold">
                  Jl. Centralpark No. 10 Yogyakarta{" "}
                </p>
              </div>
              <div className=" pt-4">
                <div className=" grid grid-cols-2 text-start">
                  <p className="col-span-1">No Nota</p>
                  <p className="col-span-1">
                    : {transaction.transaction.transaction_number}{" "}
                  </p>
                </div>
                <div className="grid grid-cols-2 text-start">
                  <p className="col-span-1">Order Date</p>
                  <p className="col-span-1 ">
                    : {transaction.transaction.order_date?.slice(0, 16)}{" "}
                  </p>
                </div>
                <div className="grid grid-cols-2 text-start">
                  <p className="col-span-1">Paid Off</p>
                  <p className="col-span-1 ">
                    : {transaction.transaction.paidoff_date?.slice(0, 16)}{" "}
                  </p>
                </div>
                <div className="grid grid-cols-2 text-start">
                  <p className="col-span-1">Pick Up Date</p>
                  <p className="col-span-1 ">
                    : {transaction.transaction.pickup_date?.slice(0, 16)}{" "}
                  </p>
                </div>
              </div>
              <div className=" pt-4">
                <p>
                  <span className="font-semibold">Customer </span> :{" "}
                  {transaction.transaction.customer.users.email} /{" "}
                  {transaction.transaction.customer.users.fullName}
                </p>
                <p>{transaction.transaction.delivery?.recipient_address}</p>
                <p>
                  <span className="font-semibold">Delivery Method </span> :{" "}
                  {transaction.transaction.delivery?.delivery_method}
                </p>
              </div>
              <div className=" pe-8 pt-4">
                {transaction.details.map((item) => {
                  return (
                    <div className="grid grid-cols-2" key={item.id}>
                      <p className="col-span-1">
                        {item.quantity}{" "}
                        {item.hampers_id
                          ? item.hampers.hampers_name
                          : item.product.product_name}
                      </p>
                      <p className="col-span-1 text-end">
                        {formatCurrency(item.price)}
                      </p>
                    </div>
                  );
                })}
              </div>
              <div className=" pe-8 pt-4">
                <div className="grid grid-cols-2">
                  <p className="col-span-1">Total</p>
                  <p className="col-span-1 text-end">{formatCurrency(total)}</p>
                </div>
                {transaction.transaction.delivery?.delivery_method ===
                  "Delivery Courier" && (
                  <>
                    <div className="grid grid-cols-2">
                      <p className="col-span-1">
                        Shipping Cost (rad.{" "}
                        {transaction.transaction.delivery.distance} km){" "}
                      </p>
                      <p className="col-span-1 text-end">
                        {formatCurrency(
                          transaction.transaction.delivery.shipping_cost,
                        )}
                      </p>
                    </div>
                    <div className="grid grid-cols-2">
                      <p className="col-span-1">Total</p>
                      <p className="col-span-1 text-end">
                        {formatCurrency(
                          total +
                            transaction.transaction.delivery.shipping_cost,
                        )}
                      </p>
                    </div>
                  </>
                )}
                {transaction.transaction.used_point !== 0 && (
                  <>
                    <div className="grid grid-cols-2">
                      <p className="col-span-1">
                        Discount {transaction.transaction.used_point} points
                      </p>
                      <p className="col-span-1 text-end">
                        -
                        {formatCurrency(
                          transaction.transaction.used_point * 100,
                        )}
                      </p>
                    </div>
                    <div className="grid grid-cols-2">
                      <p className="col-span-1">Total</p>
                      <p className="col-span-1 text-end">
                        {formatCurrency(transaction.transaction.total_price)}
                      </p>
                    </div>
                  </>
                )}
                <div className=" pe-8 pt-4">
                  <p className="col-span-1">
                    Point from this transaction :{" "}
                    {transaction.transaction.earned_point}
                  </p>
                  <p className="col-span-1">
                    Customer Current Point :{" "}
                    {transaction.transaction.current_point}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex w-full justify-end gap-x-2 rounded-b-xl bg-gray-100 p-4">
              <Button
                className="bg-orange-500 text-white"
                // onClick={
                //   id ? () => updateDelivery(data) : () => addDelivery(data)
                // }
              >
                {load ? "loading" : "Print"}
              </Button>
              <Button
                className="border-orange-500 bg-transparent text-orange-500 hover:text-white"
                onClick={() => setOpen(false)}
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
