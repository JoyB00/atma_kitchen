import Input from "../../../../Component/Input";
import FileUploader from "../../../../Component/FileUploader";
import Button from "../../../../Component/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import {
  faPencil,
  faPlus,
  faSave,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { Form } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddHampers, UpdateHampers } from "../../../../api/HampersApi";
import { getPicture } from "../../../../api";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useState } from "react";
import toast from "react-hot-toast";
export default function FormHampers({ hampersData }) {
  let animate = {
    initial: { opacity: 0, y: -100 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const intialState = hampersData
    ? {
        id: hampersData.id,
        hampers_name: hampersData.hampers_name,
        hampers_price: hampersData.hampers_price,
        quantity: hampersData.quantity,
        hampers_picture: hampersData.hampers_picture,
      }
    : {
        hampers_name: "",
        hampers_price: "",
        quantity: "",
        hampers_picture: null,
      };
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [data, setData] = useState(intialState);
  const [picture, setPicture] = useState(null);

  const handleChange = (event) => {
    event.preventDefault();
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handlePicture = (event) => {
    event.preventDefault();
    setPicture(event.target.files[0]);
    setData({ ...data, [event.target.name]: event.target.files[0] });
  };

  const removePicture = () => {
    setPicture(null);
    setData({ ...data, hampers_picture: null });
    hampersData.hampers_picture = null;
  };

  const addHampers = useMutation({
    mutationFn: (data) => {
      return AddHampers(data);
    },
    onSettled: () => {
      queryClient.invalidateQueries("hamper");
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["hampers"], data);
      navigate("/dashboard/hampers");
    },
    onError: (error) => {
      throw error.message;
    },
  });

  const swallAdd = (data) => {
    withReactContent(Swal)
      .fire({
        title: `Are you sure to Add ${data.hampers_name} ?  `,
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
            addHampers.mutateAsync(data),
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
            }
          );
        }
      });
  };
  return (
    <Form method={hampersData ? "patch" : "post"}>
      <div className="grid grid-cols-5 my-8">
        <div className="col-span-3 pe-12">
          <h1 className="text-xl font-medium">Basic Information</h1>
          <p className="text-gray-400 font-light mb-6">
            Please enter the basic information of your hampers.
          </p>
          <Input
            onChange={handleChange}
            withAnimate
            id="hampers_name"
            label="Hampers Name"
            withLabel
            placeholder="Hampers Name"
            type="text"
            defaultValue={hampersData ? hampersData.hampers_name : ""}
          />
          <Input
            onChange={handleChange}
            withAnimate
            id="hampers_price"
            label="Price"
            withLabel
            placeholder="Price"
            type="number"
            defaultValue={hampersData ? hampersData.product_price : ""}
          />
          <Input
            onChange={handleChange}
            withAnimate
            id="quantity"
            label="Quantity"
            withLabel
            placeholder="Quantity"
            type="number"
            defaultValue={hampersData ? hampersData.quantity : ""}
          />
        </div>
        <div className="col-span-2">
          <h1 className="text-xl font-medium">Hampers Picture</h1>
          <p className="text-gray-400 font-light mb-12">
            Please add or change your image hampers.
          </p>
          <motion.div {...animate}>
            {picture || hampersData?.hampers_picture ? (
              <div className="mt-2 rounded-lg border border-dashed border-gray-900/25 px-6 py-8">
                <div className="flex justify-center">
                  <img
                    src={
                      picture || !hampersData
                        ? URL.createObjectURL(picture)
                        : getPicture(hampersData.hampers_picture, "hampers")
                    }
                    alt="hampers picture"
                    className=" object-fit-cover "
                  />
                </div>
                <div className="flex justify-center">
                  <Button
                    className="mt-4 text-orange-500 me-2 bg-transparent hover:text-white "
                    type="button"
                    onClick={() =>
                      document.getElementById("hampers_picture").click()
                    }
                  >
                    <FontAwesomeIcon icon={faPencil} className="me-1" /> Change
                  </Button>
                  <Button
                    className="mt-4 text-orange-500 me-2 bg-transparent hover:text-white "
                    type="button"
                    onClick={removePicture}
                  >
                    <FontAwesomeIcon icon={faTrash} className="me-1" /> Delete
                  </Button>
                </div>
              </div>
            ) : (
              <></>
            )}
            <div
              className={`${
                picture || hampersData?.hampers_picture ? "hidden" : ""
              } `}
            >
              <FileUploader id="hampers_picture" onChange={handlePicture} />
            </div>
          </motion.div>
        </div>
      </div>
      <h1 className="text-xl font-medium">Add Details</h1>
      <p className="text-gray-400 font-light mb-6">
        Please enter the detail of your hampers.
      </p>
      <hr />
      <div className="">
        <button
          className="text-orange-400 hover:text-orange-500"
          //   onClick={handleAddRecipe}
        >
          <FontAwesomeIcon icon={faPlus} className="me-1" />
          Add Detail
        </button>
      </div>
      <div className="bg-white sticky bottom-0 -mx-px ">
        <div className="flex justify-start pb-6">
          <NavLink to="/dashboard/hampers">
            <Button className="mt-8 text-orange-500 me-2 border-2 border-orange-500 bg-white hover:text-white">
              Discard
            </Button>
          </NavLink>
          <Button
            className="mt-8 text-white me-2 bg-orange-500 "
            type="button"
            onClick={() => swallAdd(data)}
          >
            <FontAwesomeIcon icon={faSave} className="me-1" />
            Save
          </Button>
        </div>
      </div>
    </Form>
  );
}
