import Navbar from "../../../Component/Navbar";
import Footer from "../../../Component/Footer";
import {
  FetchOrderHistory,
  GetLoggedInCustomer,
  SearchOrderHistory,
} from "../../../api/CustomerApi";
import { useState } from "react";
import { useRouteLoaderData } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { BeatLoader, RotateLoader } from "react-spinners";
import { Modal, Pagination, Tab, Tabs } from "@mui/material";
import { motion } from "framer-motion";
import Button from "../../../Component/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Badge from "../../../Component/Badge";
import { faGifts, faXmark } from "@fortawesome/free-solid-svg-icons";
import ModalDetailTransaction from "../../AdminPage/CustomerOrderHistory/component/ModalDetailTransaction";
import { formatCurrency } from "../../../lib/FormatCurrency";
import { NavLink } from "react-router-dom";
import {
  ChangeTransactionStatus,
  GetTransactionWhereStatusCustomer,
} from "../../../api/TransactionApi.jsx";
import toast from "react-hot-toast";
import sendNotificationToUser from "../../../api/NotificationApi.jsx";
import Input from "../../../Component/Input.jsx";

export default function OrderHistory() {
  const [tab, setTab] = useState(0);
  const customer = useRouteLoaderData("customer");
  const orderHistory = useQuery({
    queryKey: ["orderHistory"],
    queryFn: () => FetchOrderHistory(customer.id),
  });

  return (
    <div className=" w-full bg-transparent">
      <Navbar />
      <div className="min-h-screen px-14 pt-36">
        <Header />
        <div>
          <Tabs
            value={tab}
            onChange={(e, newValue) => setTab(newValue)}
            className="pb-4"
          >
            <Tab label="Order History" />
            <Tab label="In Delivery" />
          </Tabs>
        </div>
        {tab === 0 ? (
          <>
            {orderHistory.isFetching ? (
              <RotateLoader
                color="orange"
                loading={orderHistory.isFetching}
                cssOverride={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  borderColor: "red",
                }}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              <TransactionTable
                data={orderHistory.data}
                length={orderHistory.data.length}
              />
            )}
          </>
        ) : (
          <InDeliveryTable />
        )}
      </div>
      <div className="from-cyan-100 via-transparent md:pt-12 ">
        <Footer />
      </div>
    </div>
  );
}

export function Header() {
  const [isOpened, setIsOpened] = useState(false);
  const openModal = () => {
    setIsOpened(true);
  };
  const closeModal = () => {
    setIsOpened(false);
  };

  return (
    <div className="flex flex-row justify-between">
      <div className="flex flex-col text-start text-black">
        <span className="text-3xl font-bold text-orange-500">
          Order History
        </span>
        <span className="text-xl">Did you miss our cake?</span>
      </div>
      <Button className="bg-orange-500 text-white" onClick={openModal}>
        Search History
      </Button>
      <OrderHistorySearchModal
        className="-z-40"
        isOpened={isOpened}
        closeModal={closeModal}
      />
    </div>
  );
}

export function OrderHistorySearchModal({ isOpened, closeModal }) {
  const [search, setSearch] = useState("");
  const orderHistorySearch = useQuery({
    queryKey: ["orderHistorySearch"],
    queryFn: () => SearchOrderHistory(search),
  });

  const queryClient = useQueryClient();
  const submit = async () => {
    await queryClient.refetchQueries(["orderHistorySearch"]);
  };

  return (
    <>
      <Modal open={isOpened} onClose={closeModal}>
        <div className="flex size-full items-center justify-center">
          <div className="flex max-h-[80%] min-h-20 w-5/6 flex-col rounded-md bg-slate-100 p-8">
            <div className="flex flex-row justify-between">
              <span className="text-2xl font-bold text-orange-500">
                Search order history
              </span>
              <FontAwesomeIcon
                icon={faXmark}
                onClick={closeModal}
                className="cursor-pointer"
              />
            </div>
            <span className="text-base font-semibold text-slate-800">
              Put a product/hampers name and search away...
            </span>
            <div className="flex w-full flex-row items-center">
              <Input
                label="Search"
                id="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                withAnimate
                type="text"
                className="min-w-full"
              />
              <div className="px-2" />
              <Button
                className="my-4 bg-orange-500 text-white"
                onClick={submit}
              >
                Search
              </Button>
            </div>
            <div className="py-2" />
            <div className=" overflow-y-scroll">
              {orderHistorySearch.isFetching ? (
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
                orderHistorySearch.data?.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="my-2 flex flex-col rounded-md bg-slate-50 p-4 shadow-lg"
                  >
                    <span className="text-lg font-bold text-slate-800">
                      Transaction ID:{" "}
                      {transaction.transaction_number ?? transaction.id}
                    </span>
                    <span className="text-md text-slate-800">
                      Ordered at: {transaction.order_date}
                    </span>
                    <div className="py-2" />
                    {transaction.transaction_details.map((detail) => (
                      <div
                        key={detail.id}
                        className="grid grid-cols-3 rounded-md bg-slate-200 p-4 shadow-md"
                      >
                        <span className="text-md text-slate-800">
                          {detail.product != null &&
                            detail.product.product_name}
                          {detail.hampers != null &&
                            detail.hampers.hampers_name}
                        </span>
                        <span className="text-md text-slate-800">
                          Rp. {formatCurrency(detail.price)} x {detail.quantity}
                        </span>
                        <span className="text-md text-slate-800">
                          Subtotal: {formatCurrency(detail.total_price)}
                        </span>
                      </div>
                    ))}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export function InDeliveryTable() {
  const inDeliveryTransactionList = useQuery({
    queryKey: ["inDeliveryTransaction"],
    queryFn: () =>
      GetTransactionWhereStatusCustomer({ status: "readyForPickup" }),
  });

  return (
    <>
      {inDeliveryTransactionList.isFetching ? (
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
        <table className="w-full rounded-lg bg-slate-100 text-start text-slate-800 shadow-md">
          <thead>
            <tr>
              <th className="py-2 ps-8 pt-4 text-start">Transaction Number</th>
              <th className="py-2 pt-4 text-start">Order Date</th>
              <th className="py-2 pt-4 text-start">Delivery/Pickup Date</th>
              <th className="py-2 pt-4 text-start">Method</th>
              <th className="py-2"></th>
            </tr>
          </thead>
          <tbody>
            {inDeliveryTransactionList.data?.map((transaction) => (
              <InDeliveryTableContent
                key={transaction.id}
                transaction={transaction}
              />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}

export function InDeliveryTableContent({ transaction }) {
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
    setIsLoading(true);
    try {
      await ChangeTransactionStatus({ id: transaction.id, status: "finished" });
      setIsLoading(false);
      toast.success("Order successfully finished");
      await sendNotificationToUser({
        title: "🎉 Order has been finished!!!",
        message: "Thanks for ordering at Atma Kitchen, bon appetit! 🍰",
        user_id: transaction.customer.users.id,
      });
      await queryClient.invalidateQueries(["inDeliveryTransaction"]);
      closeDialog();
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <tr key={transaction.id}>
      <td className="py-2 ps-8 ">
        {transaction.transaction_number ?? transaction.id}
      </td>
      <td className="py-2">{transaction.order_date}</td>
      <td className="py-2">{transaction.pickup_date}</td>
      <td className="py-2">{transaction.delivery.delivery_method}</td>
      <td className="py-2">
        {transaction.delivery.delivery_method === "Delivery Courier" ? (
          <Button onClick={openDialog} className="bg-orange-500 text-white">
            Finish order
          </Button>
        ) : (
          <span>automatically finished when you pick up</span>
        )}
        <Modal open={confirmationDialog}>
          <div className="flex size-full items-center justify-center">
            <div className="flex max-h-[90%] min-h-20 w-1/2 flex-col overflow-y-scroll rounded-md bg-slate-100 p-8">
              <span className="text-center text-slate-800">
                You are about to finish this order. Are you sure?
              </span>
              <div className="py-2" />
              <Button onClick={submit} className="bg-orange-500 text-white">
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
      </td>
    </tr>
  );
}

export function TransactionTable({ data, search, length }) {
  const [page, setPage] = useState(1);
  const productPerPage = 8;
  const startIndex = (page - 1) * productPerPage;
  const endIndex = page * productPerPage;
  const [itemId, setItemId] = useState();
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = (id) => {
    setOpenModal(true);
    setItemId(id);
  };

  const handleChange = (e, p) => {
    setPage(p);
  };

  const TextButton = (transaction) => {
    if (
      transaction.transaction.status === "notPaid" &&
      transaction.transaction.payment_method === null
    ) {
      return (
        <Button className="bg-orange-500 text-white">
          <p>Pay Now</p>
        </Button>
      );
    } else if (transaction.transaction.payment_method === '"E-Money"') {
      if (!transaction.transaction.payment_evidence) {
        return (
          <Button className="bg-blue-500 text-white">
            <p>Send Payment Evidence</p>
          </Button>
        );
      } else {
        return (
          <Button className="bg-yellow-500 text-white">
            <p>Waiting Confirmation</p>
          </Button>
        );
      }
    } else if (
      transaction.transaction.payment_method === '"Cash"' &&
      transaction.transaction.status === "notPaid"
    ) {
      return (
        <Button className="bg-yellow-500 text-white">
          <p>Waiting Confirmation</p>
        </Button>
      );
    } else if (transaction.transaction.status === "notPaid") {
      return (
        <Button className="bg-red-500 text-white">
          <p>Pay Now</p>
        </Button>
      );
    } else {
      return (
        <Button className="bg-green-500 text-white">
          <p>Done</p>
        </Button>
      );
    }
  };

  const BadgeStatus = (transaction) => {
    const statusText = transaction.transaction.status;
    switch (statusText) {
      case "notPaid":
        return (
          <Badge bgColor="bg-orange-100" ringColor="ring-orange-500">
            <p className="p-2 ">{statusText}</p>
          </Badge>
        );
      case "alreadyPaid":
        return (
          <Badge bgColor="bg-yellow-200" ringColor="ring-yellow-500">
            <p className="p-2 ">{statusText}</p>
          </Badge>
        );
      case "paymentValid":
        return (
          <Badge bgColor="bg-cyan-100" ringColor="ring-cyan-500">
            <p className="p-2 ">{statusText}</p>
          </Badge>
        );

      case "accepted":
        return (
          <Badge bgColor="bg-lime-100" ringColor="ring-lime-500">
            <p className="p-2 ">{statusText}</p>
          </Badge>
        );

      case "rejected":
        return (
          <Badge bgColor="bg-red-100" ringColor="ring-red-500">
            <p className="p-2 ">{statusText}</p>
          </Badge>
        );
    }
  };

  return (
    <>
      <div className="w-full overflow-x-auto bg-white">
        <table className="mt-2 w-full border-2 bg-white text-gray-500 drop-shadow-md ">
          <thead className="text-black2 bg-gray-50">
            <tr>
              <th className="py-8 ps-8 text-start text-sm font-medium">
                Action
              </th>
              <th className="py-8 ps-8 text-start text-sm font-medium">
                Status
              </th>
              <th className="text-start text-sm font-medium ">Details</th>
              <th className="text-start text-sm font-medium ">Order Date</th>
              <th className="text-start text-sm font-medium ">Paid Off Date</th>
              <th className="text-start text-sm font-medium ">Pick Up Date</th>
              <th className="text-start text-sm font-medium ">
                Payment Method
              </th>
              <th className="text-start text-sm font-medium ">Used Point</th>
              <th className="text-start text-sm font-medium ">Earned Point</th>
              <th className="text-start text-sm font-medium ">Total Price</th>
              <th className="pe-6 text-start text-sm font-medium">Tip</th>
            </tr>
          </thead>
          <motion.tbody
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {data.slice(startIndex, endIndex).map((item) => (
              <motion.tr
                className="border-t-2 border-gray-100  text-black"
                key={item.id}
              >
                <td className="p-6 text-start font-medium ">
                  <NavLink to={`/checkout/${item.id}`}>
                    <TextButton transaction={item} />
                  </NavLink>
                </td>
                <td className="py-6 ps-6 text-start font-medium ">
                  <BadgeStatus transaction={item} />
                </td>
                <td>
                  {" "}
                  <Button
                    className=" me-2 bg-transparent px-4 text-[0.9rem] text-orange-500 hover:text-white"
                    onClick={() => handleOpenModal(item.id)}
                  >
                    <FontAwesomeIcon icon={faGifts} className="me-2" />
                    See Details
                  </Button>
                </td>
                <td className="text-sm font-medium">
                  <div className="flex items-start">
                    <p className="ps-3 ">{item.order_date?.slice(0, 10)}</p>
                  </div>
                </td>
                <td className="text-start text-sm font-medium">
                  {item.paidoff_date?.slice(0, 10)}
                </td>
                <td className="text-start text-sm font-medium">
                  {item.pickup_date?.slice(0, 10)}
                </td>
                <td className="font-mediumtext-sm text-start text-sm">
                  {item.payment_method}
                </td>
                <td className="text-start text-sm font-medium">
                  {item.used_point}
                </td>
                <td className="text-start text-sm font-medium">
                  {item.earned_point}
                </td>
                <td className="text-start text-sm font-medium">
                  {formatCurrency(item.total_price)}
                </td>
                <td className="pe-6 text-start text-sm font-medium">
                  {formatCurrency(item.tip)}
                </td>
              </motion.tr>
            ))}
          </motion.tbody>
          <tfoot>
            <tr>
              <td colSpan={11}>
                <Pagination
                  count={Math.ceil(length / productPerPage)}
                  size="small"
                  className="mb-4 flex justify-center"
                  onChange={handleChange}
                />
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <ModalDetailTransaction
        id={itemId}
        open={openModal}
        setOpen={setOpenModal}
      />
    </>
  );
}

export async function loader() {
  const response = await GetLoggedInCustomer();
  return response;
}
