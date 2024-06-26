import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
export default function Navigation({ label, icon, url, ...props }) {
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
      }}
      transition={{ type: "just" }}
    >
      <NavLink
        className={({ isActive }) =>
          isActive
            ? "mt-2 grid grid-cols-3 rounded-xl bg-orange-100 py-4 text-orange-400"
            : "mt-2 grid grid-cols-3 py-2 text-gray-400 "
        }
        to={url}
        {...props}
      >
        <div className="col-span-1 text-center">
          <FontAwesomeIcon icon={icon} />
        </div>
        <p className="col-span-2 font-normal">{label}</p>
      </NavLink>
    </motion.div>
  );
}
