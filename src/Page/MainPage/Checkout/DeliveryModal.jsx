import Modal from "@mui/material/Modal";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "../../../Component/Button";
import pickupIcon from "../../../assets/food-delivery.png";
import deliveryIcon from "../../../assets/fast-delivery.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

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
export default function ModalDelivery({ open, setOpen, id }) {
  const [data, setData] = useState({
    delivery_method: "",
    recipient_address: "",
  });
  const [load, setLoad] = useState(false);

  let animate = {
    initial: { opacity: 0, y: -100 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const handleDeliveryMethod = (event) => {
    setData({ ...data, delivery_method: event.target.value });
  };

  useEffect(() => {
    setLoad(true);
    if (open && id) {
      const hampersDetail = async () => {
        // const data = await GetProductById(id);
        setData(data);
        setTimeout(() => {
          setLoad(false);
        }, 100);
      };
      hampersDetail();
    }
  }, [open]);
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
              <div className="mt-2 grid grid-cols-2 gap-x-4">
                {DELIVERY_METHOD.map((delivery) => {
                  return (
                    <label
                      key={delivery.id}
                      className={` relative col-span-1 w-full cursor-pointer rounded-2xl ${data.delivery_method === delivery.delivery_method ? "border-orange-500 bg-orange-200" : "border-gray-100"} border-2  p-5`}
                      htmlFor={delivery.id}
                    >
                      <input
                        onClick={handleDeliveryMethod}
                        id={delivery.id}
                        name={delivery.id}
                        type="radio"
                        value={delivery.delivery_method}
                        className="hidden h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
                      />
                      {data.delivery_method === delivery.delivery_method && (
                        <div className="absolute right-0 top-0 -translate-y-1/2 translate-x-1/2 transform">
                          <FontAwesomeIcon
                            icon={faCheckCircle}
                            className="text-black"
                            size="xl"
                          />
                        </div>
                      )}
                      <img
                        src={delivery.icon}
                        alt="delivery"
                        className="mx-auto w-2/3"
                      />
                      <p className="text-center text-lg font-semibold text-black">
                        {delivery.delivery_method}
                      </p>
                    </label>
                  );
                })}
              </div>
              {data.delivery_method === "Delivery Courier" && (
                <motion.select
                  {...animate}
                  className="mt-6 w-full rounded-3xl border-0 px-3 py-3 text-sm text-black shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                  // onChange={handleSortByAscDsc}
                  name="category"
                  id="category"
                  defaultValue="default"
                >
                  <option value="default" disabled>
                    Select Your Address
                  </option>
                  <option value="ascending">A-Z</option>
                  <option value="descending">Z-A</option>
                </motion.select>
              )}
            </div>
            <div className="flex w-full justify-end gap-x-2 rounded-b-xl bg-gray-100 p-4">
              <Button
                className="bg-orange-500 text-white"
                onClick={() => setOpen(false)}
              >
                Save
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
