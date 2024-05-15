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
  AddOtherProcurement,
  UpdateOtherProcurement,
} from "../../../../api/OtherProcurementApi";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import toast from "react-hot-toast";
export default function FormOtherProcurement({ dataEdit }) {
  const intialState = dataEdit
    ? {
        id: dataEdit.id,
        item_name: dataEdit.item_name,
        price: dataEdit.price,
        quantity: dataEdit.quantity,
        procurement_date: dataEdit.procurement_date,
        total_price: dataEdit.total_price,
      }
    : {
        item_name: "",
        price: "",
        quantity: "",
        procurement_date: "",
        total_price: "",
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
      return AddOtherProcurement(data);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["otherProcurements"]);
    },
    onSuccess: () => {
      queryClient.setQueryData(["otherProcurements"], data);
      navigate("/MoDashboard/otherProcurements");
    },
    onError: (error) => {
      throw error.message;
    },
  });

  const updateProcurement = useMutation({
    mutationFn: (data) => {
      return UpdateOtherProcurement(data);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["otherProcurements"]);
    },
    onSuccess: () => {
      queryClient.setQueryData(
        ["otherProcurements", { id: dataEdit.id }],
        data,
      );
      navigate("/MoDashboard/otherProcurements");
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
    setData({ ...data, total_price: data.price * data.quantity });
  }, [data.price, data.quantity]);

  return (
    <Form method="post">
      {console.log(data)}
      <div className="grid grid-cols-5 mt-8">
        <div className="col-span-5 pe-12">
          <h1 className="text-xl font-medium">Basic Information</h1>
          <p className="text-gray-400 font-light mb-6">
            Please enter the basic information of your Procurement.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-12 mb-4">
        <div className="col-span-6 mb-2">
          <div className="mb-2">
            <label htmlFor="procurement_date">Procurement Date</label>
          </div>
          <InputDate
            onChange={handleChange}
            withAnimate
            id="procurement_date"
            name="procurement_date"
            label="Procurement Date"
            withLabel
            placeholder="Procurement Date"
            type="text"
            defaultValue={dataEdit ? dataEdit.procurement_date : ""}
          />
        </div>
      </div>

      <div>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-6 ">
            <Input
              onChange={handleChange}
              withAnimate
              value={data.item_name}
              id="item_name"
              label="Item Name"
              withLabel
              placeholder="Item Name"
              type="text"
            />
          </div>
          <div className="col-span-6">
            <Input
              onChange={handleChange}
              withAnimate
              value={data.quantity}
              id="quantity"
              label="Quantity"
              withLabel
              placeholder="Quantity"
              type="number"
            />
          </div>
        </div>
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-6">
            <Input
              onChange={handleChange}
              withAnimate
              value={data.price}
              id="price"
              label="Price"
              withLabel
              placeholder="Price"
              type="number"
            />
          </div>
          <div className="col-span-6">
            <Input
              withAnimate
              id="total_price"
              label="Total"
              withLabel
              placeholder="Total"
              type="number"
              value={data.total_price}
              disabled
            />
          </div>
        </div>
      </div>

      {/* save or discard button */}

      <div className="bg-white sticky bottom-0 -mx-px flex justify-between ">
        <div className="mb-4">
          <NavLink to="/MoDashboard/otherProcurements">
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
