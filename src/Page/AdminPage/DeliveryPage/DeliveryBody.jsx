import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTruck } from "@fortawesome/free-solid-svg-icons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { RotateLoader } from "react-spinners";
import {
  fetchAllInputDistance,
  setInputDistance,
} from "../../../api/DeliveryApi.jsx";
import { useState } from "react";
import { Modal } from "@mui/material";
import Button from "../../../Component/Button";
import { BeatLoader } from "react-spinners";
import { Form } from "react-router-dom";
import { toast } from "react-hot-toast";
import Input from "../../../Component/Input.jsx";

export default function BodyDeliveryRange({}) {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="py-2" />
      <Content />
    </div>
  );
}

export function Header() {
  return (
    <div className="w-full">
      <motion.div className="grid min-h-24 grid-cols-3 overflow-clip rounded-2xl bg-gradient-to-t from-orange-400 to-orange-500 ps-4 drop-shadow-md">
        <h1 className="col-span-2 px-3 pt-6 font-semibold text-white ">
          <FontAwesomeIcon icon={faTruck} /> Input Delivery Range
        </h1>
        <div className="col-span-1 ms-12 rounded-tl-full bg-orange-600" />
      </motion.div>
    </div>
  );
}

export function Content() {
  const inputDeliveriesList = useQuery({
    queryKey: ["inputDeliveriesList"],
    queryFn: fetchAllInputDistance,
  });

  return (
    <>
      {inputDeliveriesList.isFetching ? (
        <div className="flex justify-center py-20">
          <RotateLoader
            color="orange"
            loading={inputDeliveriesList.isFetching}
            cssOverride={{
              justifyContent: "center",
              borderColor: "red",
            }}
            size={50}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      ) : (
        <div className={"grid grid-cols-2 gap-2"}>
          {inputDeliveriesList.data.length === 0 ? (
            <span className="w-full px-2 py-4 text-xl font-semibold text-slate-800">
              Nothing to see here...
            </span>
          ) : (
            inputDeliveriesList.data?.map((delivery) => (
              <InputDeliveryRangeCardModal
                key={delivery.id}
                delivery={delivery}
              />
            ))
          )}
        </div>
      )}
    </>
  );
}

export function InputDeliveryRangeCardModal({ delivery }) {
  const [isOpened, setIsOpened] = useState(false);
  const [isChildOpened, setIsChildOpened] = useState(false);
  const [data, setData] = useState({
    id: delivery.delivery.id,
    distance: 0,
  });
  const [shippingCost, setShippingCost] = useState("Flii the distance first");
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
    if (event.target.value < 0) {
      setShippingCost("Invalid Distance");
    } else if (event.target.value < 5) {
      setShippingCost("Rp. 10.000");
    } else if (event.target.value < 10) {
      setShippingCost("Rp. 15.000");
    } else if (event.target.value <= 15) {
      setShippingCost("Rp. 20.000");
    } else {
      setShippingCost("Rp. 25.000");
    }
  };

  const openModal = () => {
    setIsOpened(true);
  };
  const closeModal = () => {
    setIsOpened(false);
  };
  const openChildModal = () => {
    setIsChildOpened(true);
  };
  const closeChildModal = () => {
    setIsChildOpened(false);
  };

  const queryClient = useQueryClient();
  const submit = async () => {
    setIsLoading(true);
    await setInputDistance(data);
    toast.success("Delivery range has been inputted successfully");
    setIsChildOpened(false);
    setIsOpened(false);
    setIsLoading(false);
    queryClient.invalidateQueries("inputDeliveriesList");
  };

  return (
    <div
      className={
        "flex flex-col rounded-xl border border-orange-400 bg-white p-4 shadow-md "
      }
    >
      <span className="text-xs">Transaction ID: {delivery.id}</span>
      <span className="font-semibold">
        {delivery.delivery.recipient_address}
      </span>
      <span className="text-sm">Order date: {delivery.order_date}</span>
      <span className="text-sm">
        Customer Name: {delivery.customer.users.fullName}
      </span>
      <Button
        className="me-2 mt-4 bg-transparent text-orange-500 hover:text-white "
        type="button"
        onClick={openModal}
      >
        Input Distance
      </Button>
      <Modal open={isOpened} onClose={closeModal}>
        <div className="flex size-full items-center justify-center">
          <div className="flex min-h-20 w-1/2 flex-col rounded-md bg-slate-100 p-8">
            <span className="text-2xl font-bold text-orange-600">
              Input Delivery Range
            </span>
            <div className="py-2" />
            <span className="font-semibold text-slate-800">
              {delivery.delivery.recipient_address}
            </span>
            <Form>
              <Input
                onChange={handleChange}
                withAnimate
                label="Distance (km)"
                id="distance"
                type="number"
                placeholder="Distance (km)"
              />
              <div className="flex flex-col justify-start text-slate-800">
                <span className="text-sm">Shipping Cost:</span>
                <span className="text-lg font-bold">{shippingCost}</span>
              </div>
              <div className="flex flex-row justify-center pt-2">
                <Button
                  className="bg-orange-500 text-sm text-white"
                  onClick={openChildModal}
                >
                  Save
                </Button>
                <Modal open={isChildOpened} onClose={closeChildModal}>
                  <div className="flex size-full items-center justify-center text-black">
                    <div className="flex min-h-20 flex-col items-center rounded-md bg-slate-100 p-16">
                      <span className="text-lg">
                        Confirm inputting this delivery range?
                      </span>
                      <div className="py-2" />
                      <div className="flex flex-row">
                        <Button
                          className="bg-orange-500 text-sm text-white"
                          onClick={submit}
                        >
                          {isLoading ? (
                            <BeatLoader
                              color="white"
                              loading={true}
                              size={10}
                            />
                          ) : (
                            <span>Yes, it is correct</span>
                          )}
                        </Button>
                        <div className="px-1" />
                        <Button
                          className="border-orange-500 text-sm text-orange-500 hover:text-white"
                          onClick={closeChildModal}
                        >
                          Nope, go back
                        </Button>
                      </div>
                    </div>
                  </div>
                </Modal>
                <div className="px-1" />
                <Button
                  className="border-orange-500 text-sm text-orange-500 hover:text-white"
                  onClick={closeModal}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          </div>
        </div>
      </Modal>
    </div>
  );
}
