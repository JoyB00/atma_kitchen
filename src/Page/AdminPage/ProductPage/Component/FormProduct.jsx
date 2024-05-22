import Input from "../../../../Component/Input";
import InputDate from "../../../../Component/InputDate";
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
import {
  AddProduct,
  UpdateProduct,
  GetLimitProductByDate,
} from "../../../../api/ProductApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import toast from "react-hot-toast";
import { useState } from "react";
import defaultImage from "../../../../assets/ProductAsset/bun susus.jpg";
import { getPicture } from "../../../../api";
import { BeatLoader } from "react-spinners";

export default function FormProduct({
  productData,
  recipes,
  ingredient,
  categories,
  consignor,
  limits,
}) {
  const initialState = productData
    ? {
        id: productData.id,
        product_name: productData.product_name,
        ready_stock: productData.ready_stock,
        daily_stock: productData.daily_stock,
        product_price: productData.product_price,
        description: productData.description,
        category_id: productData.category_id,
        consignor_id: productData.consignor_id,
        product_picture: productData.product_picture,
        product_status: productData.product_status
          ? productData.product_status
          : "Pre-Order",
        recipe: recipes,
        limit_amount: limits ? limits.limit_amount : "",
        production_date: limits ? limits.production_date : "",
      }
    : {
        product_name: "",
        ready_stock: "",
        daily_stock: "",
        product_price: "",
        description: "",
        category_id: 1,
        product_status: "Pre-Order",
        limit_amount: "",
        production_date: "",
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
  const [checkLimit, setCheckLimit] = useState(limits ? limits : null);
  const [loadingCheckLimit, setLoadingCheckLimit] = useState(false);

  console.log("ingredient", ingredient);

  let animate = {
    initial: { opacity: 0, y: -100 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const handleChange = (event) => {
    if (event.target.name == "production_date") {
      setCheckLimit(null);
      setData({
        ...data,
        [event.target.name]: event.target.value,
        limit_amount: "",
      });
    } else if (
      event.target.name == "product_status" &&
      event.target.value == "Ready"
    ) {
      setData({ ...data, product_status: "Ready", limit_amount: 0 });
    } else {
      setData({ ...data, [event.target.name]: event.target.value });
    }
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
        ingredient_id: ingredient[0].id,
        quantity: "",
      };
      setCounterRecipe(counterRecipe + 1);
      setData({ ...data, recipe: [...dataPrev, addRecipe] });
      return [...dataPrev, addRecipe];
    });
  };

  const handleProductionDateInput = async (event, data) => {
    event.preventDefault();
    setLoadingCheckLimit(true);
    try {
      console.log("data didalam handle", data);
      const limit = await GetLimitProductByDate(data);
      setCheckLimit(limit);
      setData({ ...data, limit_amount: limit.data.limit_amount });
      toast.success(limit.message, {
        style: {
          backgroundColor: "#000000",
          color: "#ffffff",
        },
        position: "bottom-right",
      });
      setLoadingCheckLimit(false);
    } catch (error) {
      console.log(error);
      setCheckLimit([]);
      setData({
        ...data,
        limit_amount: data.daily_stock,
      });
      toast.error(error.message, {
        style: {
          backgroundColor: "#000000",
          color: "#ffffff",
        },
        position: "bottom-right",
        icon: "⚠️",
      });
      setLoadingCheckLimit(false);
    }
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
      navigate("/AdminDashboard/product");
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
      navigate("/AdminDashboard/product");
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
            },
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
            },
          );
        }
      });
  };

  return (
    <Form method={productData ? "patch" : "post"}>
      {console.log("data: ", data)}
      <div className="my-8 grid grid-cols-5">
        <div className="col-span-3 pe-12">
          <h1 className="text-xl font-medium">Basic Information</h1>
          <p className="mb-6 font-light text-gray-400">
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
            id="daily_stock"
            label="Default Daily Stock"
            withLabel
            placeholder="Daily Stock"
            type="number"
            defaultValue={productData ? productData.daily_stock : ""}
          />
          <Input
            onChange={handleChange}
            withAnimate
            id="ready_stock"
            label="Ready Stock "
            withLabel
            placeholder="Ready Stock (Required for product outside Atma Kitchen)"
            type="number"
            defaultValue={productData ? productData.ready_stock : ""}
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
          <div className="mb-2 mt-3">
            <label htmlFor="category">Category</label>
          </div>

          <motion.select
            {...animate}
            className="block w-full rounded-xl border-0 px-3 py-3.5 text-sm text-black shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
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
              <div className="mb-2 mt-6">
                <label htmlFor="consignor">Consignor</label>
              </div>
              <motion.select
                {...animate}
                className="block w-full rounded-xl border-0 px-3 py-3.5 text-sm text-black shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
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
        </div>

        <div className="col-span-2">
          <h1 className="text-xl font-medium">Product Picture</h1>
          <p className="mb-12 font-light text-gray-400">
            Please add or change your image product.
          </p>
          <motion.div {...animate}>
            {picture || productData?.product_picture ? (
              <div className="mt-2 rounded-lg border border-dashed border-gray-900/25 px-6 py-8">
                <div className="h-44 w-full">
                  <img
                    src={
                      picture || !productData
                        ? URL.createObjectURL(picture)
                        : getPicture(productData.product_picture, "product")
                    }
                    alt="product picture"
                    className="mx-auto h-44 object-cover"
                  />
                </div>
                <div className="flex justify-center">
                  <Button
                    className="me-2 mt-4 bg-transparent text-orange-500 hover:text-white "
                    type="button"
                    onClick={() =>
                      document.getElementById("product_picture").click()
                    }
                  >
                    <FontAwesomeIcon icon={faPencil} className="me-1" /> Change
                  </Button>
                  <Button
                    className="me-2 mt-4 bg-transparent text-orange-500 hover:text-white "
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
              className="block w-full rounded-md border-0 px-3 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Description"
              defaultValue={productData ? productData.description : ""}
            ></textarea>
          </motion.div>
        </div>
      </div>
      <div className="mb-2 w-full rounded-xl bg-blue-50 py-5 ps-2">
        <h1 className="text-xl font-medium">Product Status</h1>
        <p className="font-light text-gray-400 ">
          Please enter the status of your product.
        </p>
      </div>
      <hr />
      <div className="grid grid-cols-2 gap-x-8">
        <div className="col-span-1">
          {/* Product Status */}
          <div className="mb-2 mt-5">
            <label htmlFor="product_status">Product Status</label>
          </div>

          <motion.select
            {...animate}
            className="block w-full rounded-xl border-0 px-3 py-3 text-sm text-black shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
            onChange={handleChange}
            name="product_status"
            id="product_status"
            defaultValue={productData ? productData.product_status : ""}
          >
            <option
              value="Pre-Order"
              selected={
                productData && productData.product_status == "Pre-Order"
              }
            >
              Pre-Order
            </option>
            <option
              value="Ready"
              selected={productData && productData.product_status == "Ready"}
            >
              Ready
            </option>
          </motion.select>
        </div>
      </div>
      {data.product_status == "Pre-Order" ? (
        <div className="grid grid-cols-2 gap-x-8">
          <div className="col-span-1 mt-5">
            <div className="mb-2">
              <label htmlFor="production_date">Production Date</label>
            </div>
            <InputDate
              onChange={handleChange}
              withAnimate
              id="production_date"
              name="production_date"
              label="Production Date"
              withLabel
              placeholder="Production Date"
              type="text"
              defaultValue={limits ? data.production_date : ""}
            />
          </div>

          <div className="col-span-1 mt-2">
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className={`pt-10 ${checkLimit ? "hidden" : ""}`}>
                <Button
                  className="bg-orange-500 text-white "
                  onClick={(event) => handleProductionDateInput(event, data)}
                >
                  {loadingCheckLimit ? (
                    <BeatLoader
                      color="white"
                      loading={loadingCheckLimit}
                      size={10}
                    />
                  ) : (
                    "Check Limit Product"
                  )}
                </Button>
              </div>
              {checkLimit ? (
                <Input
                  onChange={handleChange}
                  withAnimate
                  id="limit_amount"
                  label="Daily Stock Limit"
                  withLabel
                  placeholder="Daily Stock"
                  type="number"
                  defaultValue={data.limit_amount}
                />
              ) : undefined}
            </motion.div>
          </div>
        </div>
      ) : undefined}
      <div className="mb-2 mt-6 w-full rounded-xl bg-blue-50 py-5 ps-2">
        <h1 className="text-xl font-medium ">Add Recipe</h1>
        <p className="font-light text-gray-400 ">
          Please enter the recipe of your product.
        </p>
      </div>
      <hr />

      {/* add recipe */}
      {recipe.map((data, index) => {
        // {
        //   console.log(data);
        // }
        return (
          <div className="grid grid-cols-5 gap-8" key={index}>
            <div className="col-span-2 my-auto">
              <label htmlFor="ingredient">Ingredient</label>
              <motion.select
                {...animate}
                className="mt-2 w-full rounded-xl border-0 px-3 py-3 text-sm text-black shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
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
                // defaultValue={data ? data.quantity : ""}
                value={data.quantity}
              />
            </div>
            <div className="col-span-1 flex items-center justify-center">
              <Button
                className=" mt-8 bg-transparent text-orange-500 hover:text-white"
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

      <div className="-mx-px bg-white ">
        <div className="flex justify-start pb-6">
          <NavLink to="/AdminDashboard/product">
            <Button className="me-2 mt-8 border-2 border-orange-500 bg-white text-orange-500 hover:text-white">
              Discard
            </Button>
          </NavLink>
          <Button
            className="me-2 mt-8 bg-orange-500 text-white "
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
