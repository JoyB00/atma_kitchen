import {
  faCalendar,
  faListCheck,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../../../../Component/Button";
import Badge from "../../../../Component/Badge";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import defaultImage from "../../../../assets/ProductAsset/lapis leggite.jpg";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { getPicture } from "../../../../api";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useAtom } from "jotai";
import { Form } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { Modal } from "@mui/material";

export default function OrderTable( transaction) {
  const [isOpened, setIsOpened] = useState(false);
  const [isConfirmationOpened, setIsConfirmationOpened] = useState(false);
  const [load, setDataLoad] = useState({
    id: transaction.id,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [mode, setMode] = useState();

  const handleChange = (event) => {
    setDataLoad({ ...data, [event.target.name]: event.target.value });
  };

  const queryClient = useQueryClient();

  const openModal = () => {
    setIsOpened(true);
  };
  const closeModal = () => {
    setIsOpened(false);
  };
  const openConfirmationModal = () => {
    setIsConfirmationOpened(true);
  };
  const closeConfirmationModal = () => {
    setIsConfirmationOpened(false);
  };

  const showDialogReject = () => {
    setMode("reject");
    setIsConfirmationOpened(true);
  };
  const showDialogAccept = () => {
    setMode("accept");
    setIsConfirmationOpened(true);
  };

  const submit = async () => {
    setIsLoading(true);

    if (mode === "accept") {
      await confirmPayment(data);
    } else {
      await rejectTransaction(transaction.id);
    }

    setIsConfirmationOpened(false);
    setIsOpened(false);
    setIsLoading(false);
    queryClient.invalidateQueries("orderConfirmation");
  };

  return (
    <>
      <td className="ps-8">
        {console.log('aa',transaction.transaction)}
            <span>{transaction.transaction.transaction_number}</span>
          </td>
          <td className="ps-8">
            <span>{transaction.transaction.customer.users.fullName}</span>
          </td>
          <td className="ps-8">
          <span>{transaction.transaction.total_price}</span>
          </td>
          <td className="pe-8">
            <span>{transaction.transaction.status}</span>
          </td>
          <td>
            <span>{transaction.transaction.payment_method}</span>
          </td>
          <td className="pe-6">
          
        <Button
          className="me-2 mt-4 bg-transparent text-orange-500 hover:text-white "
          type="button"
          onClick={openModal}
        >
          Confirm Order
        </Button>
       
      </td>
      <Modal open={isOpened} onClose={closeModal}>
        <div className="flex size-full items-center justify-center">
          <div className="flex max-h-[90%] min-h-20 w-1/2 flex-col overflow-y-scroll rounded-md bg-slate-100 p-8">
            <span className="text-5xl font-bold text-orange-600">
              Confirmation Order
            </span>

            <div className="h-1 w-full bg-gray-200 my-2 rounded-md"></div>
            <p className="text-lg font-light text-black ml-5">Are you sure want to confirm this order?</p>
           
            <div className="py-2" />
            <Form className="text-slate-800">
              <div className="flex flex-row justify-center pt-2">
                <Button
                  className="bg-orange-500 text-sm text-white"
                  onClick={showDialogAccept}
                >
                  Confirm
                </Button>
                <Button
                  className="bg-orange-500 text-sm text-white mx-3"
                  onClick={showDialogReject}
                >
                  Reject
                </Button>
                <Modal
                  open={isConfirmationOpened}
                  onClose={closeConfirmationModal}
                >
                  <div className="flex size-full items-center justify-center text-black">
                    <div className="flex min-h-20 flex-col items-center rounded-md bg-slate-100 p-16">
                      <span className="text-lg">
                        {mode === "accept" ? (
                          <span>Do you want to confirm this order?</span>
                        ) : (
                          <span>Do you want to reject this order?</span>
                        )}
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
                            <span>Yes, I am sure</span>
                          )}
                        </Button>
                        <div className="px-1" />
                        <Button
                          className="border-orange-500 text-sm text-orange-500 hover:text-white"
                          onClick={closeConfirmationModal}
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
