import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faUserPlus,
  faUserTag,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../../../../Component/Button";
import { NavLink } from "react-router-dom";
import EmployeeList from "./EmployeeList";

export default function BodyEmployeeManagement() {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="py-2" />
      <EmployeeList />
    </div>
  );
}

export function Header() {
  return (
    <div className="w-full grid grid-cols-6">
      <motion.div className="col-span-4 bg-gradient-to-t from-orange-400 to-orange-500 grid grid-cols-3 rounded-2xl me-2 drop-shadow-md -z-2">
        <h1 className="px-3 pt-6 col-span-2 font-semibold text-white ">
          <FontAwesomeIcon icon={faUserTag} /> Employee Management
        </h1>
        <div className="ms-12 col-span-1 bg-orange-600 rounded-tl-full" />
      </motion.div>
      <div className="pt-6 col-span-2 ms-auto">
        <Button
          className="bg-transparent border-2 border-orange-500 my-4 text-orange-500 me-2 hover:text-white"
          onClick={() => setIsOpen(true)}
        >
          <FontAwesomeIcon icon={faFilter} className="me-1" /> Filter
        </Button>
        <NavLink to="addProduct">
          <Button className="bg-orange-500 my-4 text-white">
            <FontAwesomeIcon icon={faUserPlus} className="me-1" />
            Add Employee
          </Button>
        </NavLink>
      </div>
    </div>
  );
}
