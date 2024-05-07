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
}) {
  const navigate = useNavigate();
  const forgotPassword = () => {
    navigate("/ForgotPasswordEmployee");
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
            ? "text-white bg-gradient-to-b from-orange-400  to-orange-500 text-start rounded-full hover:text-white "
            : " text-gray-400 text-start hover:text-orange-400"
        }py-4 mt-2 grid-cols-4 grid w-full`}
        onClick={() => setExpandedMaster(!expandedMaster)}
      >
        <div className="ms-3 text-start col-span-1">
          <FontAwesomeIcon icon={faFilePen} />
        </div>
        <p className="font-normal text-start col-span-2 ">Master Data</p>
        <div className="flex justify-end my-auto text-start col-span-1">
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
            ? "text-white bg-gradient-to-b from-orange-400  to-orange-500 text-start rounded-2xl hover:text-orange-400"
            : " text-gray-400 text-start hover:text-orange-400"
        }py-2 mt-2 grid-cols-4 grid w-full`}
        onClick={() => setExpandedOperational(!expandedOperational)}
      >
        <div className="ms-3  text-start col-span-1">
          <FontAwesomeIcon icon={faFileArchive} />
        </div>
        <p className="font-normal text-start col-span-2 ">Operational Data</p>
        <div className="flex justify-end my-auto text-start col-span-1">
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
      <Button className="text-md" onClick={forgotPassword}>
        Forgot password?
      </Button>
    </>
  );
}
