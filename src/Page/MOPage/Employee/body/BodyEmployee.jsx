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
import ModifyEmployeeForm from "./ModifyEmployeeForm";
import { useState } from "react";

export default function BodyEmployeeManagement({
  employeeList,
  roleList,
  search,
}) {
  const [invalidator, setInvalidator] = useState(false); // hacky way to invalidate query
  return (
    <div className="flex flex-col">
      <Header roleList={roleList} setInvalidator={setInvalidator} />
      <div className="py-2" />
      <EmployeeList
        roleList={roleList}
        search={search}
        invalidator={invalidator}
        setInvalidator={setInvalidator}
      />
    </div>
  );
}

export function Header({ roleList, setInvalidator }) {
  return (
    <div className="grid w-full grid-cols-6">
      <motion.div className="-z-2 col-span-4 me-2 grid grid-cols-3 rounded-2xl bg-gradient-to-t from-orange-400 to-orange-500 drop-shadow-md">
        <h1 className="col-span-2 px-3 pt-6 font-semibold text-white ">
          <FontAwesomeIcon icon={faUserTag} /> Employee Management
        </h1>
        <div className="col-span-1 ms-12 rounded-tl-full bg-orange-600" />
      </motion.div>
      <div className="col-span-2 ms-auto pt-6">
        <Button
          className="my-4 me-2 border-2 border-orange-500 bg-transparent text-orange-500 hover:text-white"
          onClick={() => setIsOpen(true)}
        >
          <FontAwesomeIcon icon={faFilter} className="me-1" /> Filter
        </Button>
        <ModifyEmployeeForm
          mode="add"
          roleList={roleList}
          setInvalidator={setInvalidator}
        />
      </div>
    </div>
  );
}
