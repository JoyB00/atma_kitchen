import Navigation from "./Navigation";
import {
  faChevronDown,
  faChevronRight,
  faDollar,
  faUserTie,
  faFileArchive,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../../../../Component/Button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function OwnerNavigation({
  expandedMaster,
  setExpandedMaster,
  expandedOperational,
  setExpandedOperational,
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
        }py-4 mt-2 grid w-full grid-cols-4`}
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
          {/* <Navigation
            label="Ingredient Procurement"
            icon={faCartArrowDown}
            url={"/MoDashboard/ingredientProcurement"}
          />
          <Navigation
            label="Others Procurement"
            icon={faTruck}
            url={"/MoDashboard/otherProcurements"}
          /> */}
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
