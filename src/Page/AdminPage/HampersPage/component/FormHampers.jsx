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
import { counter } from "@fortawesome/fontawesome-svg-core";
export default function FormHampers({
  hampersData,
  detailHampers,
  ingredients,
  products,
}) {
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
        details: detailHampers,
      }
    : {
        hampers_name: "",
        hampers_price: "",
        quantity: "",
        hampers_picture: null,
        details: [],
      };
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [data, setData] = useState(intialState);
  const [picture, setPicture] = useState(null);
  const [counterDetail, setCounterDetail] = useState(0);
  const [details, setDetails] = useState(detailHampers ? detailHampers : []);
  const [categoryDetail, setCategoryDetail] = useState(ingredients);

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

  const handleAddDetail = (event) => {
    event.preventDefault();
    setDetails((detailPrev) => {
      const addDetail = {
        id: counterDetail,
        category: 1,
        product_id: null,
        ingredient_id: ingredients[0].id,
      };
      setCounterDetail((counter) => counter + 1);
      setData({ ...data, details: [...detailPrev, addDetail] });
      return [...detailPrev, addDetail];
    });
  };

  const handleChangeDetails = (event, index) => {
    event.preventDefault();
    const currentDetail = [...details];
    currentDetail[index][event.target.name] = event.target.value;
    console.log(currentDetail[index]["category"]);
    // if (currentDetail[index]["category"] == 1) {
    //   currentDetail[index]["ingredient_id"] =
    //     currentDetail[index]["product_id"];
    //   currentDetail[index]["product_id"] = null;
    // } else if (currentDetail[index]["category"] == 2) {
    //   currentDetail[index]["product_id"] =
    //     currentDetail[index]["ingredient_id"];
    //   currentDetail[index]["ingredient_id"] = null;
    // }
    setDetails(currentDetail);
    setData({ ...data, details: currentDetail });
  };

  const handleDeleteDetails = (event, id) => {
    event.preventDefault();
    const updateDetail = details.filter((detail) => {
      return detail.id !== id;
    });
    setDetails(updateDetail);
    setData({ ...data, details: updateDetail });
  };

  const addHampers = useMutation({
    mutationFn: (data) => {
      return AddHampers(data);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["hampers"]);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["hampers"], data);
      navigate("/dashboard/hampers");
    },
    onError: (error) => {
      throw error.message;
    },
  });
  const updateHampers = useMutation({
    mutationFn: (data) => {
      return UpdateHampers(data);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["hampers"]);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["hampers", { id: hampersData.id }], data);
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

  const swallUpdate = (data) => {
    withReactContent(Swal)
      .fire({
        title: `Are you sure to Update ${data.hampers_name} ?  `,
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
            updateHampers.mutateAsync(data),
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
            }
          );
        }
      });
  };
  return (
    <Form method={hampersData ? "patch" : "post"}>
      {console.log(categoryDetail)}
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
            defaultValue={hampersData ? hampersData.hampers_price : ""}
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
              <div className="mt-2  rounded-lg border border-dashed border-gray-900/25 px-6 py-8">
                <div className="flex justify-center ">
                  <img
                    src={
                      picture || !hampersData
                        ? URL.createObjectURL(picture)
                        : getPicture(hampersData.hampers_picture, "hampers")
                    }
                    alt="hampers picture"
                    className="object-cover"
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

      {/* add Detail Hampers */}
      {details.map((data, index) => {
        {
          console.log(data);
        }
        return (
          <div className="grid grid-cols-5 gap-8 mt-4" key={index}>
            <div className="col-span-2 my-auto">
              <label htmlFor="ingredient">Category</label>
              <motion.select
                {...animate}
                className="mt-2 w-full text-black border-0 py-3 px-3 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm rounded-xl"
                onChange={(event) => handleChangeDetails(event, index)}
                name="category"
                id="category"
                defaultValue={data.category}
              >
                <option
                  value={1}
                  selected={data.category == 1 || data.ingredient_id != null}
                >
                  Ingredient
                </option>
                <option
                  value={2}
                  selected={data.category == 2 || data.product_id != null}
                >
                  Product
                </option>
              </motion.select>
            </div>
            {console.log("category", data.category)}
            <div className="col-span-2  my-auto">
              <label htmlFor="ingredient">
                {data.category == 1 ? "Ingredient" : "Product"}
              </label>
              {data.category == 1 ? (
                <>
                  <motion.select
                    {...animate}
                    className="mt-2 w-full text-black border-0 py-3 px-3 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm rounded-xl"
                    onChange={(event) => handleChangeDetails(event, index)}
                    name="ingredient_id"
                    id="ingredient_id"
                    defaultValue={ingredients ? ingredients.ingredient_id : ""}
                  >
                    {ingredients.map((ingredient) => (
                      <option
                        value={ingredient.id}
                        key={ingredient.id}
                        selected={ingredient.id == data.ingredient_id}
                      >
                        {ingredient.ingredient_name}
                      </option>
                    ))}
                  </motion.select>
                </>
              ) : (
                <>
                  <motion.select
                    {...animate}
                    className="mt-2 w-full text-black border-0 py-3 px-3 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm rounded-xl"
                    onChange={(event) => handleChangeDetails(event, index)}
                    name="product_id"
                    id="product_id"
                    defaultValue={products ? products.ingredient_id : ""}
                  >
                    {products.map((product) => (
                      <option
                        value={product.id}
                        key={product.id}
                        selected={product.id == data.product_id}
                      >
                        {product.product_name}
                      </option>
                    ))}
                  </motion.select>
                </>
              )}
            </div>
            <div className="col-span-1 flex justify-center items-center">
              <Button
                className=" text-orange-500 bg-transparent hover:text-white mt-8"
                type="button"
                onClick={(event) => handleDeleteDetails(event, data.id)}
              >
                <FontAwesomeIcon icon={faTrash} className="me-1" />
                Delete Detail
              </Button>
            </div>
          </div>
        );
      })}

      <div className="">
        <button
          className="text-orange-400 hover:text-orange-500"
          onClick={handleAddDetail}
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
            onClick={
              hampersData ? () => swallUpdate(data) : () => swallAdd(data)
            }
          >
            <FontAwesomeIcon icon={faSave} className="me-1" />
            Save
          </Button>
        </div>
      </div>
    </Form>
  );
}
