import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Navigation({ label, icon, url, active }) {
  return (
    <NavLink
      className={
        active
          ? "py-4 mt-2 grid-cols-3 grid text-white rounded-full bg-gradient-to-b from-orange-400 to-orange-500 hover:text-white"
          : "py-2 mt-2 grid-cols-3 grid text-gray-400"
      }
      to={url}
    >
      <div className="text-center col-span-1">
        <FontAwesomeIcon icon={icon} />
      </div>
      <p className="font-normal col-span-2">{label}</p>
    </NavLink>
  );
}
