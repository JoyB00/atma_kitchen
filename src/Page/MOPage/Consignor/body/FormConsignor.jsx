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
import { AddConsignor, UpdateConsignor } from "../../../../api/ConsignorApi";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import toast from "react-hot-toast";
export default function FormConsignor({ dataEdit }) {
  const intialState = dataEdit
    ? {
        id: dataEdit.id,
        consignor_name: dataEdit.consignor_name,
        phone_number: dataEdit.phone_number,
      }
    : {
        consignor_name: "",
        phone_number: "",
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

  const addConsignor = useMutation({
    mutationFn: (data) => {
      return AddConsignor(data);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["consignors"]);
    },
    onSuccess: () => {
      queryClient.setQueryData(["consignors"], data);
      navigate("/MoDashboard/consignor");
    },
    onError: (error) => {
      throw error.message;
    },
  });

  const updateConsignor = useMutation({
    mutationFn: (data) => {
      return UpdateConsignor(data);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["consignors"]);
    },
    onSuccess: () => {
      queryClient.setQueryData(["consignors", { id: dataEdit.id }], data);
      navigate("/MoDashboard/consignor");
    },
    onError: (error) => {
      throw error.message;
    },
  });
  const swallAdd = (data) => {
    withReactContent(Swal)
      .fire({
        title: `Are you sure to Add ${data.consignor_name} ?  `,
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
            addConsignor.mutateAsync(data),
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
        title: `Are you sure to Update ${data.consignor_name} ?  `,
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
            updateConsignor.mutateAsync(data),
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

  return (
    <Form method="post">
      {console.log(data)}
      <div className="mt-8 grid grid-cols-5">
        <div className="col-span-5 pe-12">
          <h1 className="text-xl font-medium">Basic Information</h1>
          <p className="mb-6 font-light text-gray-400">
            Please enter the basic information of your Consignor.
          </p>
        </div>
      </div>
      <div className="mb-4 grid grid-cols-12 gap-5">
        <div className="col-span-6 ">
          <Input
            onChange={handleChange}
            withAnimate
            value={data.consignor_name}
            id="consignor_name"
            label="Consignor Name"
            withLabel
            placeholder="Consignor Name"
            type="text"
          />
        </div>
        <div className="col-span-6 ">
          <Input
            onChange={handleChange}
            withAnimate
            value={data.phone_number}
            id="phone_number"
            label="Phone Number"
            withLabel
            placeholder="Phone Number"
            type="number"
          />
        </div>
      </div>

      {/* save or discard button */}

      <div className="flex justify-between bg-white ">
        <div className="mb-4">
          <NavLink to="/MoDashboard/consignor">
            <Button className="me-2 mt-8 border-2 border-orange-500 bg-white text-orange-500 hover:text-white">
              Discard
            </Button>
          </NavLink>
          <Button
            className="me-2 mt-8 bg-orange-500 text-white "
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
