import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faPencil } from "@fortawesome/free-solid-svg-icons";
import Button from "../../../../Component/Button";
import { Form } from "react-router-dom";
import { useState } from "react";
import { Modal, Box } from "@mui/material";
import Input from "../../../../Component/Input.jsx";
import InputDate from "../../../../Component/InputDate.jsx";
import { AddEmployee, UpdateEmployee } from "../../../../api/EmployeeApi.jsx";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function ModifyEmployeeForm({
  mode,
  id_employee,
  employee,
  roleList,
  setInvalidator,
}) {
  const [data, setData] = useState({
    id: mode === "edit" ? employee.id : 0,
    role_id: mode === "edit" ? employee.users.role_id : 0,
    gender: mode === "edit" ? employee.users.gender : "Male",
    fullName: mode === "edit" ? employee.users.fullName : "",
    email: mode === "edit" ? employee.users.email : "",
    phoneNumber: mode === "edit" ? employee.users.phoneNumber : "",
    dateOfBirth: mode === "edit" ? employee.users.dateOfBirth : "",
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
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const swallUpdate = () => {
    setIsOpen(false);
    withReactContent(Swal)
      .fire({
        title: `Are you sure to save this employee ?  `,
        text: `You won't be able to revert this!`,
        icon: `warning`,
        showCancelButton: true,
        confirmButtonColor: `#3085d6`,
        cancelButtonColor: `#d33`,
        confirmButtonText: `Yes, update it!`,
      })
      .then((result) => {
        if (result.isConfirmed) {
          modifyEmployee();
        }
      });
  };

  const modifyEmployee = () => {
    if (mode === "add") {
      console.log("Creating employee");
      console.log(data);

      //show confirmation dialog

      // for add mode
      AddEmployee(data).then((res) => {
        console.log(res);
      });

      toast.success("Employee has been added", {
        style: {
          backgroundColor: "#000000",
          color: "#ffffff",
        },
        position: "bottom-right",
      });
    } else {
      // for edit mode
      console.log("Updating employee");
      console.log(data);
      UpdateEmployee(data).then((res) => {
        console.log(res);
      });

      toast.success("Employee has been updated", {
        style: {
          backgroundColor: "#000000",
          color: "#ffffff",
        },
        position: "bottom-right",
      });
    }
    setInvalidator((prev) => !prev);
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
              <Form className="max-h-[50vh] overflow-y-auto">
                <Input
                  onChange={handleChange}
                  withAnimate
                  label="Full Name"
                  id="fullName"
                  type="text"
                  placeholder="Full Name"
                  defaultValue={data.fullName}
                />
                {mode === "add" ? (
                  <>
                    <Input
                      onChange={handleChange}
                      withAnimate
                      label="E-mail"
                      id="email"
                      type="text"
                      placeholder="E-mail"
                      defaultValue={data.email}
                    />
                    <Input
                      onChange={handleChange}
                      withAnimate
                      label="Password"
                      id="password"
                      type="password"
                      placeholder="Password"
                      defaultValue={data.password}
                    />
                  </>
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
                  defaultValue={data.phoneNumber}
                />
                <div className="py-1" />
                <InputDate
                  onChange={handleChange}
                  withAnimate
                  label="Date of Birth"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  placeholder="Date of Birth"
                  defaultValue={data.dateOfBirth}
                />
                <div className="py-2" />
                <motion.select
                  {...animate}
                  className="block w-full text-black border-0 py-3.5 px-3 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm rounded-2xl"
                  onChange={handleChange}
                  name="role_id"
                  id="role_id"
                  defaultValue={data.role_id}
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
                  defaultValue={data.gender}
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
                <Button
                  className="bg-orange-500"
                  withoutAnimate
                  onClick={swallUpdate}
                >
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
