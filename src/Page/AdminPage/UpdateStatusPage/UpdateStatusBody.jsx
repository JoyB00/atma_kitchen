import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckDouble } from "@fortawesome/free-solid-svg-icons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { RotateLoader } from "react-spinners";
import { useState } from "react";
import { Modal, Tab, Tabs } from "@mui/material";
import Button from "../../../Component/Button.jsx";
import { BeatLoader } from "react-spinners";
import { toast } from "react-hot-toast";
import sendNotificationToUser from "../../../api/NotificationApi.jsx";
import {
  ChangeTransactionStatus,
  GetTransactionWhereStatus,
} from "../../../api/TransactionApi.jsx";

export default function UpdateStatusBody() {
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
          <FontAwesomeIcon icon={faCheckDouble} /> Update Transaction Status
        </h1>
        <div className="col-span-1 ms-12 rounded-tl-full bg-orange-600" />
      </motion.div>
    </div>
  );
}

export function Content() {
  const [tab, setTab] = useState(0);
  const transactionsOnProcessList = useQuery({
    queryKey: ["transactionOnProcessList"],
    queryFn: () => GetTransactionWhereStatus({ status: "onProcess" }),
  });
  const transactionInDeliveryList = useQuery({
    queryKey: ["transactionInDeliveryList"],
    queryFn: () => GetTransactionWhereStatus({ status: "readyForPickup" }),
  });

  return (
    <div className="flex flex-col justify-center">
      {transactionsOnProcessList.isFetching ||
      transactionInDeliveryList.isFetching ? (
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
          <Tabs
            value={tab}
            onChange={(e, newValue) => setTab(newValue)}
            className="pb-4"
          >
            <Tab label="Transaction on Process" />
            <Tab label="Ready for Delivery" />
          </Tabs>
          {tab === 0 ? (
            <table className="rounded-lg bg-white shadow-md">
              <tr>
                <th className="py-4 ps-4 font-semibold text-orange-600">
                  Transaction Number
                </th>
                <th className="py-4 font-semibold text-orange-600">
                  Customer Name
                </th>
                <th className="py-4 font-semibold text-orange-600">
                  Delivery Method
                </th>
                <th className=""></th>
              </tr>
              {transactionsOnProcessList.data?.map((transaction) => (
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
          ) : (
            <table className="rounded-lg bg-white shadow-md">
              <tr>
                <th className="py-4 ps-4 font-semibold text-orange-600">
                  Transaction Number
                </th>
                <th className="py-4 font-semibold text-orange-600">
                  Customer Name
                </th>
                <th className="py-4 font-semibold text-orange-600">
                  Delivery Method
                </th>
                <th className=""></th>
              </tr>
              {transactionInDeliveryList.data?.map((transaction) => (
                <>
                  <tr key={transaction.id}>
                    <TransactionRow
                      transaction={transaction}
                      mode={"readyForPickup"}
                    />
                  </tr>
                </>
              ))}
            </table>
          )}
        </>
      )}
    </div>
  );
}

export function TransactionRow({ transaction, mode }) {
  const [isLoading, setIsLoading] = useState(false);
  const [confirmationDialog, setConfirmationDialog] = useState(false);
  const openDialog = () => {
    setConfirmationDialog(true);
  };
  const closeDialog = () => {
    setConfirmationDialog(false);
  };

  const queryClient = useQueryClient();
  const markAsReady = async () => {
    setIsLoading(true);
    try {
      if (mode === "onProcess") {
        await ChangeTransactionStatus({
          id: transaction.id,
          status: "readyForPickup",
        });
        await sendNotifReady();
        toast.success(
          "Transaction have been marked as ready for delivery/pickup",
        );
      } else {
        // if mode === "readyForPickup"
        await ChangeTransactionStatus({
          id: transaction.id,
          status: "finished",
        });
        await sendNotifFinish();
        toast.success("Transaction have been marked as finished");
      }
      await queryClient.invalidateQueries(["transactionOnProcessList"]);
      await queryClient.invalidateQueries(["transactionInDeliveryList"]);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setIsLoading(false);
      closeDialog();
    }
  };
  const sendNotifReady = async () => {
    console.log("sending notif ready");
    if (transaction.delivery.delivery_method === "Pick-Up") {
      await sendNotificationToUser({
        title: "🎉 Order is ready for pickup!!!",
        message: "Your order is ready to be picked up 🛻",
        user_id: transaction.customer.users.id,
      });
      toast.success("Notification to pick up has been sent");
    } else if (transaction.delivery.delivery_method === "Delivery Courier") {
      await sendNotificationToUser({
        title: "🎉 Order is on delivery!!!",
        message: "Your order will be delivered soon by our courier 😄",
        user_id: transaction.customer.users.id,
      });
      toast.success("Notification to delivery has been sent");
    }
  };
  const sendNotifFinish = async () => {
    if (transaction.delivery.delivery_method === "Pick-Up") {
      await sendNotificationToUser({
        title: "🎉 Order has been picked up",
        message: "Thanks for ordering at Atma Kitchen, bon appetit! 🍰",
        user_id: transaction.customer.users.id,
      });
    } else if (transaction.delivery.delivery_method === "Delivery Courier") {
      await sendNotificationToUser({
        title: "🎉 Order has been delivered!!!",
        message: "Thanks for ordering at Atma Kitchen, bon appetit! 🍰",
        user_id: transaction.customer.users.id,
      });
    }
  };

  return (
    <>
      <td className="py-4 ps-4">
        {transaction.transaction_number ?? transaction.id}
      </td>
      <td className="py-4">{transaction.customer.users.fullName}</td>
      <td className="py-4">{transaction.delivery.delivery_method}</td>
      <td className="py-4">
        {mode === "onProcess" ? (
          <Button className="bg-orange-500 text-white" onClick={openDialog}>
            Ready for Delivery
          </Button>
        ) : (
          <div className="flex flex-row">
            {transaction.delivery.delivery_method === "Pick-Up" ? (
              <>
                <Button
                  className="bg-orange-500 text-white"
                  onClick={openDialog}
                >
                  Finish Order
                </Button>
                <div className="px-1" />
              </>
            ) : (
              <></>
            )}
            <Button
              className="bg-orange-500 text-white"
              onClick={sendNotifReady}
            >
              Notify user
            </Button>
          </div>
        )}
      </td>

      <Modal open={confirmationDialog}>
        <div className="flex size-full items-center justify-center">
          <div className="flex max-h-[90%] min-h-20 w-1/2 flex-col overflow-y-scroll rounded-md bg-slate-100 p-8">
            <span className="pb-2 text-center font-semibold text-slate-800">
              {mode === "onProcess" ? (
                <span>
                  This transaction will be marked as ready for delivery/pickup.
                  Are you sure?
                </span>
              ) : (
                <span>
                  This transaction will be marked as finished. Are you sure?
                </span>
              )}
            </span>
            <div className="flex flex-col rounded-lg bg-slate-200 p-4 text-slate-800 shadow-md">
              <span>
                Transaction number:{" "}
                {transaction.transaction_number ?? transaction.id}
              </span>
              <span>Customer name: {transaction.customer.users.fullName}</span>
              <span>
                Delivery method: {transaction.delivery.delivery_method}
              </span>
            </div>
            <div className="py-2" />
            <Button className="bg-orange-500 text-white" onClick={markAsReady}>
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
