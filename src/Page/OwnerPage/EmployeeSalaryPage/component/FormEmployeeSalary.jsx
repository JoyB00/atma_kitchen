import { Form } from "react-router-dom";
import Input from "../../../../Component/Input";
import InputDate from "../../../../Component/InputDate";
import Button from "../../../../Component/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollar,
  faPencil,
  faPlus,
  faSave,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  AddEmployeeSalary,
  UpdateEmployeeSalary,
} from "../../../../api/EmployeeSalaryApi";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import toast from "react-hot-toast";
export default function FormEmployeeSalary({ dataEdit, id }) {
  const intialState = dataEdit
    ? {
        id: dataEdit.id,
        employee_id: id,
        pay_date: dataEdit.pay_date,
        daily_salary: dataEdit.daily_salary,
        bonus: dataEdit.bonus,
        total_salary: dataEdit.total_salary,
      }
    : {
        employee_id: id,
        pay_date: "",
        daily_salary: 0,
        bonus: 0,
        total_salary: 0,
      };
  let animate = {
    initial: { opacity: 0, y: -100 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [data, setData] = useState(intialState);

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const addProcurement = useMutation({
    mutationFn: (data) => {
      return AddEmployeeSalary(data);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["salaries"]);
    },
    onSuccess: () => {
      queryClient.setQueryData(["salaries"], data);
      navigate("/OwnerDashboard/employeeSalary");
    },
    onError: (error) => {
      throw error.message;
    },
  });

  const updateProcurement = useMutation({
    mutationFn: (data) => {
      return UpdateEmployeeSalary(data);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["salaries"]);
    },
    onSuccess: () => {
      queryClient.setQueryData(["salaries", { id: dataEdit.id }], data);
      navigate("/OwnerDashboard/employeeSalary");
    },
    onError: (error) => {
      throw error.message;
    },
  });
  const swallAdd = (data) => {
    withReactContent(Swal)
      .fire({
        title: `Are you sure to Add this ?  `,
        text: `You won't be able to revert this!`,
        icon: `warning`,
        showCancelButton: true,
        confirmButtonColor: `#3085d6`,
        cancelButtonColor: `#d33`,
        confirmButtonText: `Yes, add it!`,
      })
      .then((result) => {
        if (result.isConfirmed) {
          toast.promise(
            addProcurement.mutateAsync(data),
            {
              loading: "Loading",
              success: "Your file has successful Added",
              error: (err) => err,
            },
            {
              style: {
                backgroundColor: "#000000",
                color: "#ffffff",
              },
              position: "top-center",
            },
          );
        }
      });
  };
  const swallUpdate = (data) => {
    console.log("data swal", data);
    withReactContent(Swal)
      .fire({
        title: `Are you sure to Update this ?  `,
        text: `You won't be able to revert this!`,
        icon: `warning`,
        showCancelButton: true,
        confirmButtonColor: `#3085d6`,
        cancelButtonColor: `#d33`,
        confirmButtonText: `Yes, update it!`,
      })
      .then((result) => {
        if (result.isConfirmed) {
          toast.promise(
            updateProcurement.mutateAsync(data),
            {
              loading: "Loading",
              success: "Your file has been Updated",
              error: (err) => err,
            },
            {
              style: {
                backgroundColor: "#000000",
                color: "#ffffff",
              },
              position: "top-center",
            },
          );
        }
      });
  };

  useEffect(() => {
    setData({
      ...data,
      total_salary: parseInt(data.daily_salary) + parseInt(data.bonus),
    });
  }, [data.daily_salary, data.bonus]);

  return (
    <Form method="post">
      {console.log(data)}
      <div className="grid grid-cols-5 mt-8">
        <div className="col-span-5 pe-12">
          <h1 className="text-xl font-medium">Basic Information</h1>
          <p className="text-gray-400 font-light mb-6">
            Please enter the basic information of the salary.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-12 mb-4 gap-6">
        <div className="col-span-6 mb-2">
          <div className="mb-2">
            <label htmlFor="procurement_date">Date</label>
          </div>
          <InputDate
            onChange={handleChange}
            withAnimate
            id="pay_date"
            name="pay_date"
            label="Date"
            withLabel
            placeholder="Date"
            type="text"
            defaultValue={dataEdit ? dataEdit.pay_date : ""}
          />
        </div>
      </div>
      <div>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-6">
            <Input
              onChange={handleChange}
              withAnimate
              value={data.daily_salary}
              id="daily_salary"
              label="Daily Salary"
              withLabel
              placeholder="Daily Salary"
              type="number"
            />
          </div>
          <div className="col-span-6">
            <Input
              onChange={handleChange}
              withAnimate
              value={data.bonus}
              id="bonus"
              label="Bonus"
              withLabel
              placeholder="Bonus"
              type="number"
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12">
            <Input
              withAnimate
              id="total_salary"
              label="Total"
              withLabel
              placeholder="Total"
              type="number"
              value={data.total_salary}
              disabled
            />
          </div>
        </div>
      </div>

      {/* save or discard button */}

      <div className="bg-white sticky bottom-0 -mx-px flex justify-between ">
        <div className="mb-4">
          <NavLink to="/OwnerDashboard/employeeSalary">
            <Button className="mt-8 text-orange-500 me-2 border-2 border-orange-500 bg-white hover:text-white">
              Discard
            </Button>
          </NavLink>
          <Button
            className="mt-8 text-white me-2 bg-orange-500 "
            type="button"
            onClick={dataEdit ? () => swallUpdate(data) : () => swallAdd(data)}
          >
            <FontAwesomeIcon icon={faSave} className="me-1" /> Save
          </Button>
        </div>
      </div>
    </Form>
  );
}
