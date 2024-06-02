import Logo from "../../../../assets/atmak-removebg.png";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { useAtom } from "jotai";
import {
  expandOperational,
  expandMaster,
  expandTransaction,
  expandOrder,
  expandReport,
} from "../../../../lib/AtomVar";
import AdminNavigation from "./component/AdminNavigation";
import OperationalNavigation from "./component/OperationalNavigation";
import OwnerNavigation from "./component/OwnerNavigation";
import { NavLink } from "react-router-dom";

export default function Sidebar({ role }) {
  const [expandedMaster, setExpandedMaster] = useAtom(expandMaster);
  const [expandedOperational, setExpandedOperational] =
    useAtom(expandOperational);
  const [expandedTransaction, setExpandedTransaction] =
    useAtom(expandTransaction);
  const [expandedOrder, setExpandedOrder] = useAtom(expandOrder);
  const [expandedReport, setExpandedReport] = useAtom(expandReport);

  const collapseMenu = () => {
    setExpandedMaster(false);
    setExpandedOperational(false);
    setExpandedTransaction(false);
    setExpandedOrder(false);
    setExpandedReport(false);
  };

  return (
    <div className="fixed z-10 h-full w-80 overflow-y-auto rounded-r-3xl bg-white px-6 py-12 text-black drop-shadow-lg ">
      <img src={Logo} alt="" className="mx-auto w-1/6 pb-3" />
      <h1 className="px-5 text-2xl font-bold">
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
                ? "mt-2 grid grid-cols-3 rounded-full bg-orange-100 py-4 text-orange-400 "
                : "mt-2 grid grid-cols-3 bg-white py-2 text-gray-400 "
            }
            to={
              role == 2
                ? "/AdminDashboard"
                : role == 3
                  ? "/MoDashboard"
                  : role == 1
                    ? "/OwnerDashboard"
                    : ""
            }
            onClick={collapseMenu}
            end
          >
            <div className="col-span-1 -ms-2 text-center ">
              <FontAwesomeIcon icon={faHouse} />
            </div>
            <p className="col-span-2 -ms-2 font-normal">Main Dashbord</p>
          </NavLink>
        </motion.div>

        {role == 2 ? (
          <AdminNavigation
            expandedMaster={expandedMaster}
            setExpandedMaster={setExpandedMaster}
            expandedOperational={expandedOperational}
            setExpandedOperational={setExpandedOperational}
            expandedTransaction={expandedTransaction}
            setExpandedTransaction={setExpandedTransaction}
          />
        ) : role == 3 ? (
          <OperationalNavigation
            expandedMaster={expandedMaster}
            setExpandedMaster={setExpandedMaster}
            expandedOperational={expandedOperational}
            setExpandedOperational={setExpandedOperational}
            expandedOrder={expandedOrder}
            setExpandedOrder={setExpandedOrder}
            expandedReport={expandedReport}
            setExpandedReport={setExpandedReport}
          />
        ) : role == 1 ? (
          <OwnerNavigation
            expandedMaster={expandedMaster}
            setExpandedMaster={setExpandedMaster}
            expandedOperational={expandedOperational}
            setExpandedOperational={setExpandedOperational}
            expandedReport={expandedReport}
            setExpandedReport={setExpandedReport}
          />
        ) : undefined}
      </ul>
    </div>
  );
}
