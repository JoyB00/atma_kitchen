import React, { useState } from "react";
import Button from "../../../../Component/Button";
import Swal from "sweetalert2";
import { Modal } from "@mui/material";
import { BeatLoader } from "react-spinners";
import { Form } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { TransactionConfirmation, getShortageIngredients } from "../../../../api/MOTransactionConfirmation";

export default function OrderTable({ transaction }) {
  const [isOpened, setIsOpened] = useState(false);
  const [isConfirmationOpened, setIsConfirmationOpened] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState();
  const [shortageIngredients, setShortageIngredients] = useState([]);
  const queryClient = useQueryClient();

  const fetchShortageIngredients = async () => {
    try {
      const data = await getShortageIngredients(transaction.id);
      setShortageIngredients(data);
    } catch (err) {
      console.error("Error fetching shortage ingredients:", err);
    }
  };

  const openModal = () => {
    fetchShortageIngredients();
    setIsOpened(true);
  };

  const closeModal = () => {
    setIsOpened(false);
  };

  const openConfirmationModal = (status) => {
    setMode(status);
    setIsConfirmationOpened(true);
  };

  const closeConfirmationModal = () => {
    setIsConfirmationOpened(false);
  };

  const submit = async () => {
    setIsLoading(true);

    try {
      await TransactionConfirmation({ id: transaction.id, status: mode });
      queryClient.invalidateQueries("orderConfirmation");
      setIsOpened(false);
      setIsConfirmationOpened(false);
      Swal.fire("Success", `Transaction ${mode} successfully`, "success");
    } catch (err) {
      console.error("Error confirming transaction:", err);
      Swal.fire("Error", "There was an error processing the transaction", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <td className="ps-8">
        <span>{transaction.transaction_number}</span>
      </td>
      <td className="ps-8">
        <span>{transaction.customer.users.fullName}</span>
      </td>
      <td className="ps-8">
        <span>{transaction.total_price}</span>
      </td>
      <td className="pe-8">
        <span>{transaction.status}</span>
      </td>
      <td>
        <span>{transaction.payment_method}</span>
      </td>
      <td className="pe-6">
        <Button className="me-2 mt-4 bg-transparent text-orange-500 hover:text-white" type="button" onClick={openModal}>
          Confirm Order
        </Button>
      </td>
      <Modal open={isOpened} onClose={closeModal}>
        <div className="flex size-full items-center justify-center">
          <div className="flex max-h-[90%] min-h-20 w-1/2 flex-col overflow-y-scroll rounded-md bg-slate-100 p-8">
            <span className="text-5xl font-bold text-orange-600">Confirmation Order</span>
            <div className="my-2 h-1 w-full rounded-md bg-gray-200"></div>
            <p className="ml-5 text-lg font-light text-black">
              Are you sure want to confirm this order?
            </p>
            {shortageIngredients.length > 0 && (
              <div>
                <h2 className="text-red-600">Shortage Ingredients:</h2>
                <ul>
                  {shortageIngredients.map((ingredient) => (
                    <li key={ingredient.ingredient_name}>
                      {ingredient.ingredient_name}: {ingredient.quantity} units needed
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="py-2" />
            <Form className="text-slate-800">
              <div className="flex flex-row justify-center pt-2">
                <Button className="bg-orange-500 text-sm text-white" onClick={() => openConfirmationModal("accepted")}>
                  Confirm
                </Button>
                <Button className="mx-3 bg-orange-500 text-sm text-white" onClick={() => openConfirmationModal("rejected")}>
                  Reject
                </Button>
                <Modal open={isConfirmationOpened} onClose={closeConfirmationModal}>
                  <div className="flex size-full items-center justify-center text-black">
                    <div className="flex min-h-20 flex-col items-center rounded-md bg-slate-100 p-16">
                      <span className="text-lg">
                        {mode === "accepted" ? (
                          <span>Do you want to confirm this order?</span>
                        ) : (
                          <span>Do you want to reject this order?</span>
                        )}
                      </span>
                      <div className="py-2" />
                      <div className="flex flex-row">
                        <Button className="bg-orange-500 text-sm text-white" onClick={submit}>
                          {isLoading ? (
                            <BeatLoader color="white" loading={true} size={10} />
                          ) : (
                            <span>Yes, I am sure</span>
                          )}
                        </Button>
                        <div className="px-1" />
                        <Button className="border-orange-500 text-sm text-orange-500 hover:text-white" onClick={closeConfirmationModal}>
                          Nope, go back
                        </Button>
                      </div>
                    </div>
                  </div>
                </Modal>
                <div className="px-1" />
                <Button className="border-orange-500 text-sm text-orange-500 hover:text-white" onClick={closeModal}>
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
