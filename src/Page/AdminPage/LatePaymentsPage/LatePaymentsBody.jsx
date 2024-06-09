import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { RotateLoader } from "react-spinners";
import { useState } from "react";
import { Modal } from "@mui/material";
import Button from "../../../Component/Button.jsx";
import { BeatLoader } from "react-spinners";
import { toast } from "react-hot-toast";
import {
  ChangeTransactionStatus,
  GetLatePayments,
} from "../../../api/TransactionApi.jsx";

export default function LatePaymentsBody() {
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
      <motion.div className="grid min-h-24 grid-cols-3 text-clip rounded-2xl bg-gradient-to-t from-orange-400 to-orange-500 ps-4 drop-shadow-md">
        <h1 className="col-span-2 px-3 pt-6 font-semibold text-white ">
          <FontAwesomeIcon icon={faClock} /> Cancel Late Payments
        </h1>
        <div className="col-span-1 ms-12 rounded-tl-full bg-orange-600" />
      </motion.div>
    </div>
  );
}

export function Content() {
  const lateTransactionsList = useQuery({
    queryKey: ["lateTransactions"],
    queryFn: GetLatePayments,
  });

  return (
    <div className="flex flex-col justify-center">
      {lateTransactionsList.isFetching ? (
        <div className="flex justify-center py-20">
          <RotateLoader
            color="orange"
            loading={true}
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
        <>
          <table className="rounded-lg bg-white shadow-md">
            <tr>
              <th className="py-4 ps-4 font-semibold text-orange-600">
                Transaction Number
              </th>
              <th className="py-4 font-semibold text-orange-600">
                Customer Name
              </th>
              <th className="py-4 font-semibold text-orange-600">Order Date</th>
              <th className=""></th>
            </tr>
            {lateTransactionsList.data?.map((transaction) => (
              <>
                <tr key={transaction.id}>
                  <TransactionRow
                    transaction={transaction}
                    mode={"onProcess"}
                  />
                </tr>
              </>
            ))}
          </table>
        </>
      )}
    </div>
  );
}

export function TransactionRow({ transaction }) {
  const [isLoading, setIsLoading] = useState(false);
  const [confirmationDialog, setConfirmationDialog] = useState(false);
  const openDialog = () => {
    setConfirmationDialog(true);
  };
  const closeDialog = () => {
    setConfirmationDialog(false);
  };

  const queryClient = useQueryClient();
  const submit = async () => {
    try {
      setIsLoading(true);
      await ChangeTransactionStatus({
        id: transaction.id,
        status: "rejected",
      });
      queryClient.invalidateQueries(["lateTransactions"]);
      toast.success("Transaction have been marked as late and rejected");
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <>
      <td className="py-4 ps-4">
        {transaction.transaction_number ?? transaction.id}
      </td>
      <td className="py-4">{transaction.customer.users.fullName}</td>
      <td className="py-4">{transaction.order_date}</td>
      <td className="py-4">
        <Button className="bg-orange-500 text-white" onClick={openDialog}>
          Mark as late
        </Button>
      </td>

      <Modal open={confirmationDialog}>
        <div className="flex size-full items-center justify-center">
          <div className="flex max-h-[90%] min-h-20 w-1/2 flex-col overflow-y-scroll rounded-md bg-slate-100 p-8">
            <span className="pb-2 text-center font-semibold text-slate-800">
              This transaction will be rejected because late payment... Are you
              sure?
            </span>
            <div className="flex flex-col rounded-lg bg-slate-200 p-4 text-slate-800 shadow-md">
              <span>
                Transaction number:{" "}
                {transaction.transaction_number ?? transaction.id}
              </span>
              <span>Customer name: {transaction.customer.users.fullName}</span>
              <span>Order date: {transaction.order_date}</span>
            </div>
            <div className="py-2" />
            <Button className="bg-orange-500 text-white" onClick={submit}>
              {isLoading ? (
                <BeatLoader color="white" size={8} />
              ) : (
                "Yes, I am sure"
              )}
            </Button>
            <Button
              className="text-slate-800 hover:text-white"
              onClick={closeDialog}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
