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
  faBook,
  faReceipt,
  faChartLine,
  faChartPie,
  faPlateWheat,
  faWeightScale,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import Button from "../../../../../Component/Button";
import { useNavigate } from "react-router-dom";

export default function OperationalNavigation({
  expandedMaster,
  setExpandedMaster,
  expandedOperational,
  setExpandedOperational,import Navigation from "./Navigation";
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
    faBook,
    faReceipt,
    faChartLine,
    faChartPie,
    faPlateWheat,
    faWeightScale,
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
    expandedReport,
    setExpandedReport,
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
          }mt-2 grid w-full grid-cols-4 py-4`}
          onClick={() => setExpandedMaster(!expandedMaster)}
        >
          <div className="col-span-1 ms-3 text-start">
            <FontAwesomeIcon icon={faFilePen} />
          </div>
          <p className="col-span-2 text-start font-normal ">Master Data</p>
          <div className="col-span-1 my-auto flex  justify-end text-start">
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
              label="Ingredient Use"
              icon={faPlateWheat}
              url={"/MoDashboard/ingredientUse"}
            />
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
          }mt-2 grid w-full grid-cols-4 py-2`}
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
  
        <motion.button
          whileHover={{
            scale: 1.05,
          }}
          transition={{ type: "just" }}
          className={`${
            expandedReport
              ? "rounded-2xl bg-gradient-to-b from-orange-400  to-orange-500 text-start text-white "
              : " text-start text-gray-400 hover:text-orange-400"
          } mt-2 grid w-full grid-cols-4 py-5`}
          onClick={() => setExpandedReport(!expandedReport)}
        >
          <div className="col-span-1  ms-3 text-start">
            <FontAwesomeIcon icon={faBook} />
          </div>
          <p className="col-span-2 text-start font-normal ">Reports</p>
          <div className="col-span-1 my-auto flex justify-end text-start">
            <FontAwesomeIcon
              icon={expandedReport ? faChevronDown : faChevronRight}
            />
          </div>
        </motion.button>
        {expandedReport ? (
          <div className="ms-8">
            <Navigation
              label="Monthly Sales Report"
              icon={faChartLine}
              url={"/MoDashboard/monthlySalesReport"}
            />
            <Navigation
              label="Product Sales Report"
              icon={faReceipt}
              url={"/MoDashboard/productSalesReport"}
            />
            <Navigation
              label="Ingredient Stock Report"
              icon={faChartPie}
              url={"/MoDashboard/ingredientStockReport"}
            />
            <Navigation
              label="Ingredient Usage Report"
              icon={faWeightScale}
              url={"/MoDashboard/ingredientUsage"}
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
  
  expandedOrder,
  setExpandedOrder,
  expandedReport,
  setExpandedReport,
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
        }mt-2 grid w-full grid-cols-4 py-4`}
        onClick={() => setExpandedMaster(!expandedMaster)}
      >
        <div className="col-span-1 ms-3 text-start">
          <FontAwesomeIcon icon={faFilePen} />
        </div>
        <p className="col-span-2 text-start font-normal ">Master Data</p>
        <div className="col-span-1 my-auto flex  justify-end text-start">
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
            label="Ingredient Use"
            icon={faPlateWheat}
            url={"/MoDashboard/ingredientUse"}
          />
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
        }mt-2 grid w-full grid-cols-4 py-2`}
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

      <motion.button
        whileHover={{
          scale: 1.05,
        }}
        transition={{ type: "just" }}
        className={`${
          expandedReport
            ? "rounded-2xl bg-gradient-to-b from-orange-400  to-orange-500 text-start text-white "
            : " text-start text-gray-400 hover:text-orange-400"
        } mt-2 grid w-full grid-cols-4 py-5`}
        onClick={() => setExpandedReport(!expandedReport)}
      >
        <div className="col-span-1  ms-3 text-start">
          <FontAwesomeIcon icon={faBook} />
        </div>
        <p className="col-span-2 text-start font-normal ">Reports</p>
        <div className="col-span-1 my-auto flex justify-end text-start">
          <FontAwesomeIcon
            icon={expandedReport ? faChevronDown : faChevronRight}
          />
        </div>
      </motion.button>
      {expandedReport ? (
        <div className="ms-8">
          <Navigation
            label="Monthly Sales Report"
            icon={faChartLine}
            url={"/MoDashboard/monthlySalesReport"}
          />
          <Navigation
            label="Product Sales Report"
            icon={faReceipt}
            url={"/MoDashboard/productSalesReport"}
          />
          <Navigation
            label="Ingredient Stock Report"
            icon={faChartPie}
            url={"/MoDashboard/ingredientStockReport"}
          />
          <Navigation
            label="Ingredient Usage Report"
            icon={faWeightScale}
            url={"/MoDashboard/ingredientUsage"}
          />
          <Navigation
            label="Consignor Sales Report"
            icon={faWeightScale}
            url={"/MoDashboard/consignorSalesReport"}
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
