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
import InputDateTime from "../../../Component/InputDateTime";
import Checkbox from "../../../Component/Checkbox";
import {
  DeleteTransaction,
  UpdateDateTransaction,
} from "../../../api/TransactionApi.jsx";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { redirect } from "react-router-dom";

export default function ModalDelivery({ open, setOpen, transaction }) {
  const [disabledCheck, setDisabledCheck] = useState(true);
  const [data, setData] = useState({
    id: transaction.transaction.id,
    pickup_date: null,
  });
  const [load, setLoad] = useState(false);
  const queryClient = useQueryClient();

  const handleCheck = (e) => {
    let isChecked = e.target.checked;
    if (isChecked) {
      setDisabledCheck(false);
    } else {
      setDisabledCheck(true);
    }
  };

  const handleChangeDate = (event) => {
    setData({ ...data, pickup_date: event.target.value });
  };

  const handleUpdate = (data) => {
    if (disabledCheck) {
      toast.error("Please Check the checkbox before", {
        style: {
          backgroundColor: "#000000",
          color: "#ffffff",
        },
        position: "bottom-right",
      });
    } else {
      const productionDate = new Date(data.pickup_date);
      const twoDaysAfterNow = new Date();
      twoDaysAfterNow.setDate(twoDaysAfterNow.getDate() + 2);

      if (productionDate < twoDaysAfterNow) {
        toast.error("Minimum order H+2 from today", {
          style: {
            backgroundColor: "#000000",
            color: "#ffffff",
          },
          position: "bottom-right",
        });
      } else {
        swallUpdate(data);
      }
    }
  };

  const swallUpdate = (data) => {
    setOpen(false);
    withReactContent(Swal)
      .fire({
        title: `Are you sure to Update ?  `,
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
            UpdateDateTransaction(data)
              .then((res) => {
                console.log(res);
                queryClient.invalidateQueries(["orders"]);
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
  const swallDelete = (data) => {
    setOpen(false);
    withReactContent(Swal)
      .fire({
        title: `Are you sure to Delete ?  `,
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
            DeleteTransaction(data)
              .then((res) => {
                console.log(res);
                return redirect("/CustomerDashboard/OrderHistory");
              })
              .catch((err) => {
                throw err.message;
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
                Delivery Method
              </label>
            </div>
            <div className=" p-5">
              <div className="mt-2 text-center text-black">
                <p>
                  Your order was expired, please change the order date or delete
                  your orders
                </p>
              </div>
              <div className="p-5 text-black">
                <label htmlFor="order_date">Change Order Date</label>
                <InputDateTime
                  id="date"
                  name="date"
                  placeholder="Select Date"
                  onChange={handleChangeDate}
                  disabled={disabledCheck}
                />
                <Checkbox
                  id="pickup_date"
                  label="check to update the date"
                  onChange={handleCheck}
                />
              </div>
            </div>
            <div className="flex w-full justify-between gap-x-2 rounded-b-xl bg-gray-100 p-5">
              <Button
                className="bg-red-500 text-white"
                onClick={() => swallDelete(data)}
              >
                Delete
              </Button>
              <div className="flex gap-x-3">
                <Button
                  className="bg-orange-500 text-white"
                  onClick={() => handleUpdate(data)}
                >
                  Change Date
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
        </div>
      </Modal>
    </>
  );
}
