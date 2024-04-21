import Input from "../../../../Component/Input";
import FileUploader from "../../../../Component/FileUploader";
import Button from "../../../../Component/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { faPencil, faSave, faTrash } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { Form } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddProduct, UpdateProduct } from "../../../../api/ProductApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import toast from "react-hot-toast";
import { useAtom } from "jotai";
import { useState } from "react";
import { allCategories } from "../../../../lib/CategoryFunctions";
import defaultImage from "../../../../assets/ProductAsset/bun susus.jpg";
import { getPicture } from "../../../../api";

export default function FormProduct({ product }) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [categories] = useAtom(allCategories);

  const initialState = product
    ? {
        id: product.id,
        product_name: product.product_name,
        quantity: product.quantity,
        product_price: product.product_price,
        description: product.description,
        category_id: product.category_id,
        product_picture: product.product_picture,
      }
    : {
        product_name: "",
        quantity: "",
        product_price: "",
        description: "",
        category_id: 1,
        product_picture: null,
      };
  const [data, setData] = useState(initialState);
  const [picture, setPicture] = useState(null);

  let animate = {
    initial: { opacity: 0, y: -100 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handlePicture = (event) => {
    setPicture(event.target.files[0]);
    setData({ ...data, [event.target.name]: event.target.files[0] });
  };
  const removePicture = () => {
    setPicture(null);
    setData({ ...data, [product_picture]: null });
    product.product_picture = null;
  };

  const addProduct = useMutation({
    mutationFn: (data) => {
      console.log(data.category_id);
      return AddProduct(data);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["products"]);
    },
    onSuccess: () => {
      queryClient.setQueryData(["products"], data);
      navigate("/dashboard/product");
    },
    onError: (error) => {
      throw error.message;
    },
  });

  const updateProduct = useMutation({
    mutationFn: (data) => {
      console.log(data.category_id);
      return UpdateProduct(data);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["products"]);
    },
    onSuccess: () => {
      queryClient.setQueryData(["products", { id: product.id }], data);
      navigate("/dashboard/product");
    },
    onError: (error) => {
      throw error.message;
    },
  });

  const swallUpdate = (data) => {
    withReactContent(Swal)
      .fire({
        title: `Are you sure to Update ${data.product_name} ?  `,
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
            updateProduct.mutateAsync(data),
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
  const swallAdd = (data) => {
    withReactContent(Swal)
      .fire({
        title: `Are you sure to Add ${data.product_name} ?  `,
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
            addProduct.mutateAsync(data),
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
    <Form method={product ? "patch" : "post"}>
      <div className="grid grid-cols-5 mt-8">
        <div className="col-span-3 pe-12">
          <h1 className="text-xl font-medium">Basic Information</h1>
          <p className="text-gray-400 font-light mb-6">
            Please enter the basic information of your product.
          </p>
          <Input
            onChange={handleChange}
            withAnimate
            id="product_name"
            label="Product Name"
            withLabel
            placeholder="Product Name"
            type="text"
            defaultValue={product ? product.product_name : ""}
          />
          <Input
            onChange={handleChange}
            withAnimate
            id="quantity"
            label="Quantity"
            withLabel
            placeholder="Quantity"
            type="number"
            defaultValue={product ? product.quantity : ""}
          />
          <Input
            onChange={handleChange}
            withAnimate
            id="product_price"
            label="Price"
            withLabel
            placeholder="Price"
            type="number"
            defaultValue={product ? product.product_price : ""}
          />

          {/* category */}
          <div className="mb-2 ">
            <label htmlFor="category">Category</label>
          </div>

          <motion.select
            {...animate}
            className="block w-full text-black border-0 py-3.5 px-3 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm rounded-xl"
            onChange={handleChange}
            name="category_id"
            id="category_id"
            defaultValue={product ? product.category_id : ""}
          >
            {categories.map((category) => (
              <option
                value={category.id}
                key={category.category_name}
                selected={product && category.no === product.category_id}
              >
                {category.category_name}
              </option>
            ))}
          </motion.select>

          {/* description */}
          <div className="mb-2 mt-4">
            <label htmlFor="category">Description</label>
          </div>
          <motion.div {...animate} className="mt-2">
            <textarea
              onChange={handleChange}
              id="description"
              name="description"
              rows="5"
              className="block w-full rounded-md border-0 py-2.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Description"
              defaultValue={product ? product.description : ""}
            ></textarea>
          </motion.div>
        </div>
        <div className="col-span-2">
          <h1 className="text-xl font-medium">Product Picture</h1>
          <p className="text-gray-400 font-light mb-12">
            Please add or change your image product.
          </p>
          <motion.div {...animate}>
            {picture || product?.product_picture ? (
              <div className="mt-2 rounded-lg border border-dashed border-gray-900/25 px-6 py-8">
                <div className="flex justify-center">
                  <img
                    src={
                      picture || !product
                        ? URL.createObjectURL(picture)
                        : getPicture(product.product_picture, "product")
                    }
                    alt="product picture"
                    className=" object-fit-cover "
                  />
                </div>
                <div className="flex justify-center">
                  <Button
                    className="mt-4 text-orange-500 me-2 bg-transparent hover:text-white "
                    type="button"
                    onClick={() =>
                      document.getElementById("product_picture").click()
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
                picture || product?.product_picture ? "hidden" : ""
              } `}
            >
              <FileUploader id="product_picture" onChange={handlePicture} />
            </div>
          </motion.div>
        </div>
      </div>
      <div className="bg-white sticky bottom-0 -mx-px ">
        <div className="flex justify-start pb-6">
          <NavLink to="/dashboard/product">
            <Button className="mt-8 text-orange-500 me-2 border-2 border-orange-500 bg-white hover:text-white">
              Discard
            </Button>
          </NavLink>
          <Button
            className="mt-8 text-white me-2 bg-orange-500 "
            type="button"
            onClick={product ? () => swallUpdate(data) : () => swallAdd(data)}
          >
            <FontAwesomeIcon icon={faSave} className="me-1" /> Save
          </Button>
        </div>
      </div>
    </Form>
  );
}
