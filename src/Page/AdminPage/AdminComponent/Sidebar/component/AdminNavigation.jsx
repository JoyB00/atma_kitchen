import Navigation from "./Navigation";
import {
  faBreadSlice,
  faChevronDown,
  faChevronRight,
  faEgg,
  faFileArchive,
  faFilePen,
  faGifts,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";

export default function AdminNavigation({
  expandedMaster,
  setExpandedMaster,
  expandedOperational,
  setExpandedOperational,
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
          <Navigation
            label="Main Dashbord"
            icon={faHouse}
            url={"/AdminDashboard/temp"}
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
            label="Ingredient"
            icon={faEgg}
            url={"/AdminDashboard/temp"}
          />
          <Navigation
            label="Product"
            icon={faBreadSlice}
            url={"/AdminDashboard/temp"}
          />
        </div>
      ) : undefined}
    </>
  );
}