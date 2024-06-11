import Navigation from "./Navigation";
import {
  faChevronDown,
  faChevronRight,
  faDollar,
  faUserTie,
  faLock,
  faBook,
  faChartLine,
  faReceipt,
  faChartPie,
  faWeightScale,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function OwnerNavigation({
  expandedMaster,
  setExpandedMaster,
  expandedReport,
  setExpandedReport,
}) {
  const navigate = useNavigate();
  const forgotPassword = () => {
    navigate("/ForgotPasswordEmployee/1");
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
            ? "rounded-3xl bg-gradient-to-b from-orange-400  to-orange-500 text-start text-white hover:text-white "
            : " text-start text-gray-400 hover:text-orange-400"
        }mt-2 grid w-full grid-cols-4 py-4`}
        onClick={() => setExpandedMaster(!expandedMaster)}
      >
        <div className="col-span-1 ms-3 text-start">
          <FontAwesomeIcon icon={faUserTie} />
        </div>
        <p className="col-span-2 text-start font-normal">Employee Salary</p>
        <div className="col-span-1 my-auto flex justify-end text-start">
          <FontAwesomeIcon
            icon={expandedMaster ? faChevronDown : faChevronRight}
          />
        </div>
      </motion.button>
      {expandedMaster ? (
        <div className="ms-8">
          <Navigation
            label="Salary & Bonus"
            icon={faDollar}
            url={"/OwnerDashboard/employeeSalary"}
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
            url={"/OwnerDashboard/monthlySalesReport"}
          />
          <Navigation
            label="Product Sales Report"
            icon={faReceipt}
            url={"/OwnerDashboard/productSalesReport"}
          />
          <Navigation
            label="Ingredient Stock Report"
            icon={faChartPie}
            url={"/OwnerDashboard/ingredientStockReport"}
          />
          <Navigation
            label="Ingredient Usage Report"
            icon={faWeightScale}
            url={"/OwnerDashboard/ingredientUsage"}
          />
        </div>
      ) : undefined}

      <Navigation
        label="Forgot password?"
        icon={faLock}
        url={"/ForgotPasswordEmployee/1"}
      />
    </>
  );
}
