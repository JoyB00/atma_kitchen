import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckToSlot } from "@fortawesome/free-solid-svg-icons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { RotateLoader } from "react-spinners";
import { useState } from "react";
import { Modal } from "@mui/material";
import Button from "../../../Component/Button.jsx";
import { BeatLoader } from "react-spinners";
import { Form } from "react-router-dom";
import { toast } from "react-hot-toast";
import Input from "../../../Component/Input.jsx";
import { fetchAllPaymentConfirmation } from "../../../api/PaymentConfirmationApi.jsx";
import { getPicture } from "../../../api/index.jsx";

export default function PaymentConfirmationBody() {
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
          <FontAwesomeIcon icon={faCheckToSlot} /> Payment Confirmation
        </h1>
        <div className="col-span-1 ms-12 rounded-tl-full bg-orange-600" />
      </motion.div>
    </div>
  );
}

export function Content() {
  const paymentConfirmation = useQuery({
    queryKey: ["paymentConfirmationList"],
    queryFn: fetchAllPaymentConfirmation,
  });

  return (
    <>
      {paymentConfirmation.isFetching ? (
        <div className="flex justify-center py-20">
          <RotateLoader
            color="orange"
            loading={paymentConfirmation.isFetching}
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
        <div>
          {paymentConfirmation.data.length === 0 ? (
            <span className="w-full px-2 py-4 text-xl font-semibold text-slate-800">
              Nothing to see here...
            </span>
          ) : (
            <table className="w-full rounded-2xl bg-white text-gray-500 drop-shadow-md">
              <tr>
                <th className="py-8 ps-8 text-start font-medium">
                  Transaction Number
                </th>
                <th className="pe-6 text-start font-medium ">Customer Name</th>
                <th className="pe-6 text-start font-medium ">Status</th>
                <th className="pe-6 text-start font-medium">Payment Method</th>
                <th className="pe-6"></th>
              </tr>
              {paymentConfirmation.data?.map((transaction) => (
                <>
                  <tr key={transaction.id}>
                    <InputPaymentConfirmTableRowPlusModal
                      key={transaction.id}
                      transaction={transaction}
                    />
                  </tr>
                </>
              ))}
            </table>
          )}
        </div>
      )}
    </>
  );
}

export function InputPaymentConfirmTableRowPlusModal({ transaction }) {
  const [isOpened, setIsOpened] = useState(false);
  const [isChildOpened, setIsChildOpened] = useState(false);
  const [data, setData] = useState({
    id: transaction.id,
    payment_amount: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
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
    toast.success("Delivery range has been inputted successfully");
    setIsChildOpened(false);
    setIsOpened(false);
    setIsLoading(false);
    queryClient.invalidateQueries("paymentConfirmationList");
  };

  return (
    <>
      <td className="ps-8">
        <span>{transaction.transaction_number ?? "Unknown"}</span>
      </td>
      <td>
        <span>{transaction.customer.users.fullName}</span>
      </td>
      <td className="pe-8">
        <span>{transaction.status}</span>
      </td>
      <td>
        <span>{transaction.payment_method}</span>
      </td>
      <td className="pe-6">
        <Button
          className="me-2 mt-4 bg-transparent text-orange-500 hover:text-white "
          type="button"
          onClick={openModal}
        >
          Confirm Payment
        </Button>
      </td>
      <Modal open={isOpened} onClose={closeModal}>
        <div className="flex size-full items-center justify-center">
          <div className="flex min-h-20 w-1/2 flex-col rounded-md bg-slate-100 p-8">
            <span className="text-2xl font-bold text-orange-600">
              Confirm Payment
            </span>
            <div className="py-2" />
            <Form className="text-slate-800">
              {
                // If payment method is Cash
                transaction.payment_method === '"Cash"' ? (
                  <div className="flex flex-col justify-start">
                    <span className="font-semibold">Payment method: Cash</span>
                    <Input
                      onChange={handleChange}
                      withAnimate
                      label="Payment amount (Rp.)"
                      id="paymentAmount"
                      type="number"
                      placeholder="Rp. XX.XXX"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col justify-start">
                    <span className="font-semibold">
                      Payment method: E-Money
                    </span>
                    <img
                      src={getPicture(
                        transaction.payment_evidence,
                        "payment_evidence",
                      )}
                    />
                  </div>
                )
              }
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
                        Confirm accepting this transaction?
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
    </>
  );
}
