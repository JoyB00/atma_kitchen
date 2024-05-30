import Navigation from "./Navigation";
import {
  faBreadSlice,
  faCartArrowDown,
  faChevronDown,
  faChevronRight,
  faClipboardUser,
  faEgg,
  faFileArchive,
  faFilePen,
  faGifts,
  faHouse,
  faPeopleCarryBox,
  faTruck,
  faUserTie,
  faLock,
  faMoneyBill,
  faKitchenSet,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import Button from "../../../../../Component/Button";
import { useNavigate } from "react-router-dom";

export default function OperationalNavigation({
  expandedMaster,
  setExpandedMaster,
  expandedOperational,
  setExpandedOperational,
  expandedOrder,
  setExpandedOrder,
}) {
  const navigate = useNavigate();
  const forgotPassword = () => {
    navigate("/ForgotPasswordEmployee/3");
  };

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
        }py-4 mt-2 grid w-full grid-cols-4`}
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
            label="Role"
            icon={faClipboardUser}
            url={"/dashboard/ingredient"}
          />
          <Navigation
            label="Employee"
            icon={faUserTie}
            url={"/MoDashboard/employeeManagement"}
          />
          <Navigation
            label="Consignor"
            icon={faPeopleCarryBox}
            url={"/MoDashboard/consignor"}
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
        }py-2 mt-2 grid w-full grid-cols-4`}
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
            label="Ingredient Procurement"
            icon={faCartArrowDown}
            url={"/MoDashboard/ingredientProcurement"}
          />
          <Navigation
            label="Others Procurement"
            icon={faTruck}
            url={"/MoDashboard/otherProcurements"}
          />
        </div>
      ) : undefined}
      <motion.button
        whileHover={{
          scale: 1.05,
        }}
        transition={{ type: "just" }}
        className={`${
          expandedOrder
            ? "rounded-2xl bg-gradient-to-b from-orange-400  to-orange-500 text-start text-white hover:text-orange-400"
            : " text-start text-gray-400 hover:text-orange-400"
        }py-2 mt-2 grid w-full grid-cols-4`}
        onClick={() => setExpandedOrder(!expandedOrder)}
      >
        <div className="col-span-1  ms-3 text-start">
          <FontAwesomeIcon icon={faMoneyBill} />
        </div>
        <p className="col-span-2 text-start font-normal ">Confirm Order</p>
        <div className="col-span-1 my-auto flex justify-end text-start">
          <FontAwesomeIcon
            icon={expandedOrder ? faChevronDown : faChevronRight}
          />
        </div>
      </motion.button>
      {expandedOrder ? (
        <div className="ms-8">
          <Navigation
            label="Transaction"
            icon={faMoneyBill}
            url={"/MoDashboard/transactionManagement"}
          />
          <Navigation
            label="Show Ingredient"
            icon={faEgg}
            url={"/MoDashboard/showIngredient"}
          />
          <Navigation
            label="Confirmation To Process"
            icon={faKitchenSet}
            url={"/MoDashboard/confirmationToProcess"}
          />
        </div>
      ) : undefined}

      <Navigation
        label="Forgot password?"
        icon={faLock}
        url={"/ForgotPasswordEmployee/3"}
      />
    </>
  );
}
