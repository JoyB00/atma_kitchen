import Navbar from "../../../Component/Navbar";
import Footer from "../../../Component/Footer";
import {
  FetchOrderHistory,
  GetLoggedInCustomer,
} from "../../../api/CustomerApi";
import { useState } from "react";
import { useRouteLoaderData } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { RotateLoader } from "react-spinners";
import { Pagination } from "@mui/material";
import { motion } from "framer-motion";
import Button from "../../../Component/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Badge from "../../../Component/Badge";
import { faGifts } from "@fortawesome/free-solid-svg-icons";
import ModalDetailTransaction from "../../AdminPage/CustomerOrderHistory/component/ModalDetailTransaction";
import { formatCurrency } from "../../../lib/FormatCurrency";
import { NavLink } from "react-router-dom";

export default function OrderHistory() {
  const customer = useRouteLoaderData("customer");
  const orderHistory = useQuery({
    queryKey: ["orderHistory"],
    queryFn: () => FetchOrderHistory(customer.id),
  });
  return (
    <div className=" w-full bg-transparent">
      {console.log(customer.id)}
      <Navbar />
      <div className="min-h-screen px-14 pt-36">
        <Header />
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
          <>
            <TransactionTable
              data={orderHistory.data}
              length={orderHistory.data.length}
            />
          </>
        )}
      </div>
      <div className="from-cyan-100 via-transparent md:pt-12 ">
        <Footer />
      </div>
    </div>
  );
}

export function Header() {
  return (
    <div className="flex flex-col text-start text-black">
      <span className="text-3xl font-bold text-orange-500">Order History</span>
      <span className="text-xl">Did you miss our cake?</span>
    </div>
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
    } else if (
      transaction.transaction.payment_method === '"E-Money"' &&
      transaction.transaction.payment_evidence === null
    ) {
      return (
        <Button className="bg-blue-500 text-white">
          <p>Send Payment Evidence</p>
        </Button>
      );
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
          <Badge bgColor="bg-cyan-100" ringColor="ring-cyan-500">
            <p className="p-2 ">{statusText}</p>
          </Badge>
        );

      case "rejected":
        
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
                <td className="px-6 py-6 text-start font-medium ">
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

export function TransactionTile({ detailedTransaction }) {
  // hirarki detail transaction
  // - transaction
  // - cart
  //   - product/hampers

  const ProductTile = (transactionDetail) => {
    const detail = transactionDetail.transactionDetail;
    return (
      <div className="flex flex-row items-center text-nowrap px-4 py-2 text-black">
        <span className="text-md text-start font-bold">
          {detail.product
            ? detail.product.product_name
            : detail.hampers.hampers_name}{" "}
          (x{detail.quantity})
        </span>
        <div className="w-full" />
        <span className=" text-end text-sm">
          Rp.{" "}
          {detail.product
            ? detail.product.product_price
            : detail.hampers.hampers_price}
        </span>
      </div>
    );
  };

  return (
    <div className="flex h-80 flex-col items-stretch overflow-clip rounded-lg border border-orange-300 bg-gray-100 shadow-lg">
      <div className="flex flex-col items-start bg-orange-500 p-4">
        <span>Ordered on</span>
        <span className="text-xl font-bold">
          {detailedTransaction.transaction.order_date}
        </span>
        <span className="text-xs">
          Order ID: {detailedTransaction.transaction.id}
        </span>
      </div>
      <div className="py-2" />
      <div className="flex flex-col">
        <div className="flex flex-col">
          {detailedTransaction.details.map((transactionDetails) => (
            <ProductTile transactionDetail={transactionDetails} />
          ))}
        </div>
      </div>
    </div>
  );
}

export async function loader() {
  const response = await GetLoggedInCustomer();
  return response;
}
