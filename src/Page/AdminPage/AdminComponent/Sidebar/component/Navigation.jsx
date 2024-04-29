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
            ? "py-4 mt-2 grid-cols-3 grid rounded-xl text-orange-400 bg-orange-100"
            : "py-2 mt-2 grid-cols-3 grid text-gray-400 "
        }
        to={url}
        {...props}
      >
        <div className="text-center col-span-1">
          <FontAwesomeIcon icon={icon} />
        </div>
        <p className="font-normal col-span-2">{label}</p>
      </NavLink>
    </motion.div>
  );
}
