import Navigation from "./Navigation";
import {
  faBreadSlice,
  faChevronDown,
  faChevronRight,
  faEgg,
  faFileArchive,
  faFilePen,
  faGifts,
  faHistory,
  faLock,
  faUser,
  faMoneyBill,
  faTruck,
  faCheckToSlot,
  faCheckDouble,
  faClock,
  faMoneyCheckDollar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";

export default function AdminNavigation({
  expandedMaster,
  setExpandedMaster,
  expandedOperational,
  setExpandedOperational,
  expandedTransaction,
  setExpandedTransaction,
}) {
  return (
    <>
      <motion.button
        whileHover={{
          scale: 1.05,
        }}
        transition={{ type: "just" }}
        className={`${
          expandedMaster
            ? "rounded-full bg-gradient-to-b from-orange-400  to-orange-500 text-start text-white hover:text-white "
            : " text-start text-gray-400 hover:text-orange-400"
        }mt-2 grid w-full grid-cols-4 py-4`}
        onClick={() => setExpandedMaster(!expandedMaster)}
      >
        <div className="col-span-1 ms-3 text-start">
          <FontAwesomeIcon icon={faFilePen} />
        </div>
        <p className="col-span-2 text-start font-normal ">Master Data</p>
        <div className="col-span-1 my-auto flex justify-end text-start">
          <FontAwesomeIcon
            icon={expandedMaster ? faChevronDown : faChevronRight}
          />
        </div>
      </motion.button>
      {expandedMaster ? (
        <div className="ms-8">
          <Navigation
            label="Ingredient"
            icon={faEgg}
            url={"/AdminDashboard/ingredient"}
          />
          <Navigation
            label="Product"
            icon={faBreadSlice}
            url={"/AdminDashboard/product"}
          />
          <Navigation
            label="Hampers"
            icon={faGifts}
            url={"/AdminDashboard/hampers"}
          />
        </div>
      ) : undefined}

      <motion.button
        whileHover={{
          scale: 1.05,
        }}
        transition={{ type: "just" }}
        className={`${
          expandedOperational
            ? "rounded-2xl bg-gradient-to-b from-orange-400  to-orange-500 text-start text-white hover:text-orange-400"
            : " text-start text-gray-400 hover:text-orange-400"
        }mt-2 grid w-full grid-cols-4 py-2`}
        onClick={() => setExpandedOperational(!expandedOperational)}
      >
        <div className="col-span-1  ms-3 text-start">
          <FontAwesomeIcon icon={faFileArchive} />
        </div>
        <p className="col-span-2 text-start font-normal ">Operational Data</p>
        <div className="col-span-1 my-auto flex justify-end text-start">
          <FontAwesomeIcon
            icon={expandedOperational ? faChevronDown : faChevronRight}
          />
        </div>
      </motion.button>
      {expandedOperational ? (
        <div className="ms-8">
          <Navigation
            label="Customer"
            icon={faUser}
            url={"/AdminDashboard/customer"}
          />
          <Navigation
            label="Order History"
            icon={faHistory}
            url={"/AdminDashboard/orderHistory"}
          />
        </div>
      ) : undefined}

      <motion.button
        whileHover={{
          scale: 1.05,
        }}
        transition={{ type: "just" }}
        className={`${
          expandedTransaction
            ? "rounded-2xl bg-gradient-to-b from-orange-400  to-orange-500 text-start text-white hover:text-orange-400"
            : " text-start text-gray-400 hover:text-orange-400"
        }mt-2 grid w-full grid-cols-4 py-2`}
        onClick={() => setExpandedTransaction(!expandedTransaction)}
      >
        <div className="col-span-1  ms-3 text-start">
          <FontAwesomeIcon icon={faMoneyBill} />
        </div>
        <p className="col-span-2 text-start font-normal ">Transactions</p>
        <div className="col-span-1 my-auto flex justify-end text-start">
          <FontAwesomeIcon
            icon={expandedTransaction ? faChevronDown : faChevronRight}
          />
        </div>
      </motion.button>
      {expandedTransaction ? (
        <div className="ms-8">
          <Navigation
            label="Delivery"
            icon={faTruck}
            url={"/AdminDashboard/transaction/delivery"}
          />
          <Navigation
            label="Payment Confirmation"
            icon={faCheckToSlot}
            url={"/AdminDashboard/transaction/paymentConfirmation"}
          />
          <Navigation
            label="Update Status"
            icon={faCheckDouble}
            url={"/AdminDashboard/transaction/updateStatus"}
          />
          <Navigation
            label="Late Payments"
            icon={faClock}
            url={"/AdminDashboard/transaction/latePayments"}
          />
        </div>
      ) : undefined}

      <Navigation
        label="Balance Withdrawal"
        icon={faMoneyCheckDollar}
        url={"/AdminDashboard/balance"}
      />
      <Navigation
        label="Forgot password?"
        icon={faLock}
        url={"/ForgotPasswordEmployee/2"}
      />
    </>
  );
}
