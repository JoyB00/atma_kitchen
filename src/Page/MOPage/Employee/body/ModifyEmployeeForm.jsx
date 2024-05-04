import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faPencil } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../../Component/Button";
import { Form } from "react-router-dom";
import { useState } from "react";
import { Modal, Box } from "@mui/material";
import Input from "../../../../Component/Input.jsx";
import InputDate from "../../../../Component/InputDate.jsx";
import { GetEmployeeById } from "../../../../api/EmployeeApi.jsx";

export default function ModifyEmployeeForm({
  mode,
  id_employee,
  employee,
  roleList,
}) {
  const [data, setData] = useState({
    id: 0,
    role_id: 0,
    gender: "",
    fullName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
  });
  const gender = ["Male", "Female", "Prefer not to say"];
  let animate = {
    initial: { opacity: 0, y: -100 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const [isOpen, setIsOpen] = useState(false);
  const handleClose = () => {
    setIsOpen(false);
  };
  const handleChange = (event) => {
    // console.log(`${event.target.name} : ${event.target.value}`);
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const modifyEmployee = () => {
    if (mode === "add") {
    } else {
      // for edit mode
    }
  };

  return (
    <>
      {mode === "add" ? (
        <AddEmployeeButton setIsOpen={setIsOpen} />
      ) : (
        <EditEmployeeButton setIsOpen={setIsOpen} />
      )}
      <Modal open={isOpen} onClose={handleClose}>
        <div className="flex justify-center items-center min-h-full">
          <Box className="flex flex-col bg-white w-2/3 p-8 rounded-xl">
            <span className="text-[#ef4444] font-semibold text-3xl">
              {mode === "add" ? "Add Employee" : "Edit Employee"}
            </span>
            <div className="flex flex-col">
              <Form
                onSubmit={modifyEmployee}
                method="post"
                className="max-h-[50vh] overflow-y-auto"
              >
                <Input
                  onChange={handleChange}
                  withAnimate
                  label="Full Name"
                  id="fullName"
                  type="text"
                  placeholder="Full Name"
                  defaultValue={mode === "edit" ? employee.fullName : ""}
                />
                <Input
                  onChange={handleChange}
                  withAnimate
                  label="E-mail"
                  id="email"
                  type="text"
                  placeholder="E-mail"
                  defaultValue={mode === "edit" ? employee.email : ""}
                />
                {mode === "add" ? (
                  <Input
                    onChange={handleChange}
                    withAnimate
                    label="Password"
                    id="password"
                    type="password"
                    placeholder="Password"
                    defaultValue={data.password}
                  />
                ) : (
                  <div />
                )}
                <Input
                  onChange={handleChange}
                  withAnimate
                  label="Phone Number"
                  id="phoneNumber"
                  type="number"
                  placeholder="Phone Number"
                  defaultValue={mode === "edit" ? employee.phoneNumber : ""}
                />
                <div className="py-1" />
                <InputDate
                  onChange={handleChange}
                  withAnimate
                  label="Date of Birth"
                  id="dateOfBirth"
                  type="date"
                  placeholder="Date of Birth"
                  defaultValue={mode === "edit" ? employee.dateOfBirth : ""}
                />
                <div className="py-2" />
                <motion.select
                  {...animate}
                  className="block w-full text-black border-0 py-3.5 px-3 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm rounded-2xl"
                  onChange={handleChange}
                  name="role"
                  id="role_id"
                  value={mode === "edit" ? employee.role_id : 0}
                >
                  {roleList.map((role) => (
                    <option value={role.id} key={role.id}>
                      {role.role_name}
                    </option>
                  ))}
                </motion.select>
                <div className="py-2" />
                <motion.select
                  {...animate}
                  className="block w-full text-black border-0 py-3.5 px-3 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm rounded-2xl"
                  onChange={handleChange}
                  name="gender"
                  id="gender"
                  value={data.gender}
                >
                  {gender.map((gender) => (
                    <option value={gender} key={gender}>
                      {gender}
                    </option>
                  ))}
                </motion.select>
              </Form>
              <div className="py-2" />
              <div className="flex justify-start">
                <Button className="bg-orange-500" withoutAnimate type="submit">
                  Save changes
                </Button>
                <div className="px-1" />
                <Button
                  className="bg-slate-100 text-slate-800"
                  withoutAnimate
                  onClick={handleClose}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Box>
        </div>
      </Modal>
    </>
  );
}

export function AddEmployeeButton({ setIsOpen }) {
  const handleClick = () => {
    setIsOpen(true);
  };

  return (
    <Button className="bg-orange-500 my-4 text-white" onClick={handleClick}>
      <FontAwesomeIcon icon={faUserPlus} className="me-1" />
      Add Employee
    </Button>
  );
}

export function EditEmployeeButton({ setIsOpen }) {
  const handleClick = () => {
    setIsOpen(true);
  };

  return (
    <Button
      className="bg-orange-50 border-2 border-orange-300"
      onClick={handleClick}
    >
      <div className="flex flex-row items-center">
        <FontAwesomeIcon icon={faPencil} />
        <div className="px-2">Edit</div>
      </div>
    </Button>
  );
}
