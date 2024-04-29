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
import { AddProduct, UpdateProduct } from "../../../../api/ProductApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import toast from "react-hot-toast";
import { useState } from "react";
import defaultImage from "../../../../assets/ProductAsset/bun susus.jpg";
import { getPicture } from "../../../../api";

export default function FormProduct({
  productData,
  recipes,
  ingredient,
  categories,
  consignor,
}) {
  const initialState = productData
    ? {
        id: productData.id,
        product_name: productData.product_name,
        quantity: productData.quantity,
        product_price: productData.product_price,
        description: productData.description,
        category_id: productData.category_id,
        consignor_id: productData.consignor_id,
        product_picture: productData.product_picture,
        recipe: recipes,
      }
    : {
        product_name: "",
        quantity: "",
        product_price: "",
        description: "",
        category_id: 1,
        consignor_id: null,
        product_picture: null,
        recipe: [],
      };
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [data, setData] = useState(initialState);
  const [picture, setPicture] = useState(null);
  const [recipe, setRecipe] = useState(recipes ? recipes : []);
  const [counterRecipe, setCounterRecipe] = useState(0);

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
    setData({ ...data, product_picture: null });
    productData.product_picture = null;
  };

  const handleAddRecipe = (event) => {
    event.preventDefault();

    setRecipe((dataPrev) => {
      const addRecipe = {
        id: counterRecipe,
        ingredient_id: 1,
        quantity: "",
      };
      setCounterRecipe(counterRecipe + 1);
      setData({ ...data, recipe: [...dataPrev, addRecipe] });
      return [...dataPrev, addRecipe];
    });
  };

  const handleChangeRecipe = (event, index) => {
    event.preventDefault();
    const currentData = [...recipe];
    currentData[index][event.target.name] = event.target.value;
    setRecipe(currentData);
    setData({ ...data, recipe: currentData });
    // console.log(data.recipe);
  };

  const handleDeleteRecipe = (event, id) => {
    event.preventDefault();
    // console.log(id);
    const updatedRecipe = recipe.filter((recipe) => {
      return recipe.id !== id;
    });
    setRecipe(updatedRecipe);
    setData({ ...data, recipe: updatedRecipe });
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
      queryClient.setQueryData(["products", { id: productData.id }], data);
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
          console.log(data.recipe);
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
    <Form method={productData ? "patch" : "post"}>
      <div className="grid grid-cols-5 my-8">
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
            defaultValue={productData ? productData.product_name : ""}
          />
          <Input
            onChange={handleChange}
            withAnimate
            id="quantity"
            label="Quantity"
            withLabel
            placeholder="Quantity"
            type="number"
            defaultValue={productData ? productData.quantity : ""}
          />
          <Input
            onChange={handleChange}
            withAnimate
            id="product_price"
            label="Price"
            withLabel
            placeholder="Price"
            type="number"
            defaultValue={productData ? productData.product_price : ""}
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
            defaultValue={productData ? productData.category_id : ""}
          >
            {categories.map((category) => (
              <option
                value={category.id}
                key={category.category_name}
                selected={
                  productData && category.id === productData.category_id
                }
              >
                {category.category_name}
              </option>
            ))}
          </motion.select>

          {data.category_id == 4 ? (
            <>
              <div className="mb-2 mt-4">
                <label htmlFor="consignor">Consignor</label>
              </div>
              <motion.select
                {...animate}
                className="block w-full text-black border-0 py-3.5 px-3 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm rounded-xl"
                onChange={handleChange}
                name="consignor_id"
                id="consignor"
                defaultValue={productData ? productData.consignor_id : ""}
              >
                {consignor.map((consignor) => (
                  <option
                    value={consignor.id}
                    key={consignor.consignor_name}
                    selected={
                      productData && consignor.id === productData.consignor_id
                    }
                  >
                    {consignor.consignor_name}
                  </option>
                ))}
              </motion.select>
            </>
          ) : undefined}

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
              defaultValue={productData ? productData.description : ""}
            ></textarea>
          </motion.div>
        </div>
        <div className="col-span-2">
          <h1 className="text-xl font-medium">Product Picture</h1>
          <p className="text-gray-400 font-light mb-12">
            Please add or change your image product.
          </p>
          <motion.div {...animate}>
            {picture || productData?.product_picture ? (
              <div className="mt-2 rounded-lg border border-dashed border-gray-900/25 px-6 py-8">
                <div className="flex justify-center">
                  <img
                    src={
                      picture || !productData
                        ? URL.createObjectURL(picture)
                        : getPicture(productData.product_picture, "product")
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
                picture || productData?.product_picture ? "hidden" : ""
              } `}
            >
              <FileUploader id="product_picture" onChange={handlePicture} />
            </div>
          </motion.div>
        </div>
      </div>
      <h1 className="text-xl font-medium">Add Recipe</h1>
      <p className="text-gray-400 font-light mb-6">
        Please enter the recipe of your product.
      </p>
      <hr />

      {/* add recipe */}
      {recipe.map((data, index) => {
        {
          console.log(data);
        }
        return (
          <div className="grid grid-cols-5 gap-8" key={index}>
            <div className="col-span-2 my-auto">
              <label htmlFor="ingredient">Ingredient</label>
              <motion.select
                {...animate}
                className="mt-2 w-full text-black border-0 py-3 px-3 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm rounded-xl"
                onChange={(event) => handleChangeRecipe(event, index)}
                name="ingredient_id"
                id="ingredient_id"
                defaultValue={recipes ? recipes.ingredient_id : ""}
              >
                {ingredient.map((ingredient) => (
                  <option
                    value={ingredient.id}
                    key={ingredient.ingredient_name}
                    selected={ingredient.id == data.ingredient_id}
                  >
                    {ingredient.ingredient_name}
                  </option>
                ))}
              </motion.select>
            </div>
            <div className="col-span-2">
              <Input
                onChange={(event) => handleChangeRecipe(event, index)}
                withAnimate
                id="quantity"
                label="Quantity"
                withLabel
                placeholder="Quantity"
                type="number"
                defaultValue={data ? data.quantity : ""}
                value={data.quantity}
              />
            </div>
            <div className="col-span-1 flex justify-center items-center">
              <Button
                className=" text-orange-500 bg-transparent hover:text-white mt-8"
                type="button"
                onClick={(event) => handleDeleteRecipe(event, data.id)}
              >
                <FontAwesomeIcon icon={faTrash} className="me-1" />
                Delete Recipe
              </Button>
            </div>
          </div>
        );
      })}
      <div className="">
        <button
          className="text-orange-400 hover:text-orange-500"
          onClick={handleAddRecipe}
        >
          <FontAwesomeIcon icon={faPlus} className="me-1" />
          Add Recipe
        </button>
      </div>

      {/* save or discard button */}

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
            onClick={
              productData ? () => swallUpdate(data) : () => swallAdd(data)
            }
          >
            <FontAwesomeIcon icon={faSave} className="me-1" /> Save
          </Button>
        </div>
      </div>
    </Form>
  );
}
