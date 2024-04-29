import Logo from "../../../../assets/atmak-removebg.png";
import Navigation from "./component/Navigation";
import {
  faBreadSlice,
  faEgg,
  faGifts,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import { expandOperational, expandMaster } from "../../../../lib/AtomVar";
import AdminNavigation from "./component/AdminNavigation";
import OperationalNavigation from "./component/OperationalNavigation";
import { NavLink } from "react-router-dom";

export default function Sidebar({ role }) {
  const [expandedMaster, setExpandedMaster] = useAtom(expandMaster);
  const [expandedOperational, setExpandedOperational] =
    useAtom(expandOperational);

  const toggleExpanded = () => {
    setExpandedMaster(false);
    setExpandedOperational(false);
  };
  return (
    <div className="w-[20rem] h-full bg-white text-black py-12 px-6 fixed drop-shadow-lg rounded-r-3xl z-10 overflow-y-auto ">
      <img src={Logo} alt="" className="w-1/6 mx-auto pb-3" />
      <h1 className="text-2xl font-bold px-5">
        <span className="text-orange-500 ">ATMA</span> KITCHEN
      </h1>
      <hr className="mt-6" />
      <ul className="py-6 text-left ">
        <motion.div
          whileHover={{
            scale: 1.05,
          }}
          transition={{ type: "just" }}
        >
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "py-4 mt-2 grid-cols-3 grid rounded-full text-orange-400 bg-orange-100 "
                : "py-2 mt-2 grid-cols-3 grid text-gray-400 bg-white "
            }
            to={role == 2 ? "/AdminDashboard" : role == 3 ? "/MoDashboard" : ""}
            onClick={toggleExpanded}
            end
          >
            <div className="text-center col-span-1 -ms-2 ">
              <FontAwesomeIcon icon={faHouse} />
            </div>
            <p className="font-normal col-span-2 -ms-2">Main Dashbord</p>
          </NavLink>
        </motion.div>

        {role == 2 ? (
          <AdminNavigation
            expandedMaster={expandedMaster}
            setExpandedMaster={setExpandedMaster}
            expandedOperational={expandedOperational}
            setExpandedOperational={setExpandedOperational}
          />
        ) : role == 3 ? (
          <OperationalNavigation
            expandedMaster={expandedMaster}
            setExpandedMaster={setExpandedMaster}
            expandedOperational={expandedOperational}
            setExpandedOperational={setExpandedOperational}
          />
        ) : role == "dmin" ? (
          <></>
        ) : undefined}
      </ul>
    </div>
  );
}
