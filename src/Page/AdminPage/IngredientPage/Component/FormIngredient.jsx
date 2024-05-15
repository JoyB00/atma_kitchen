import Input from "../../../../Component/Input";
import Button from "../../../../Component/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { Form } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AddIngredient, UpdateIngredient } from "../../../../api/IngredientApi";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import toast from "react-hot-toast";
import { useState } from "react";

export default function FormIngredient({ ingredientData }) {
  const initialState = ingredientData
    ? {
        id: ingredientData.id,
        ingredient_name: ingredientData.ingredient_name,
        quantity: ingredientData.quantity,
        unit: ingredientData.unit,
      }
    : {
        ingredient_name: "",
        quantity: 0,
        unit: "gr",
      };

  const unit = ["gr", "pcs", "kg", "ml", "buah", "butir"];
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [data, setData] = useState(initialState);

  let animate = {
    initial: { opacity: 0, y: -100 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const addIngredient = useMutation({
    mutationFn: (data) => {
      return AddIngredient(data);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["ingredients"]);
    },
    onSuccess: () => {
      queryClient.setQueryData(["ingredients"], data);
      navigate("/AdminDashboard/ingredient");
    },
    onError: (error) => {
      throw error.message;
    },
  });

  const updateIngredient = useMutation({
    mutationFn: (data) => {
      return UpdateIngredient(data);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["ingredients"]);
    },
    onSuccess: () => {
      queryClient.setQueryData(
        ["ingredients", { id: ingredientData.id }],
        data,
      );
      navigate("/AdminDashboard/ingredient");
    },
    onError: (error) => {
      throw error.message;
    },
  });

  const swallUpdate = (data) => {
    withReactContent(Swal)
      .fire({
        title: `Are you sure to Update ${data.ingredient_name} ?  `,
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
            updateIngredient.mutateAsync(data),
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
        title: `Are you sure to Add ${data.ingredient_name} ?  `,
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
            addIngredient.mutateAsync(data),
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
    <Form method={ingredientData ? "patch" : "post"}>
      <div className="my-8 grid grid-cols-5">
        <div className="col-span-6 pe-12">
          <h1 className="text-xl font-medium">Basic Information</h1>
          <p className="mb-6 font-light text-gray-400">
            Please enter the basic information of your ingredient.
          </p>
          <Input
            onChange={handleChange}
            withAnimate
            id="ingredient_name"
            label="Ingredient Name"
            withLabel
            placeholder="Ingredient Name"
            type="text"
            defaultValue={ingredientData ? ingredientData.ingredient_name : ""}
          />
          <div className="grid grid-cols-6 gap-x-4">
            <div className="col-span-3 pt-3">
              {/* unit */}
              <div className="mb-1">
                <label htmlFor="unit">Unit</label>
              </div>

              <motion.select
                {...animate}
                className="block w-full rounded-xl border-0 px-3 py-3.5 text-sm text-black shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                onChange={handleChange}
                name="unit"
                id="unit"
              >
                {unit.map((unit) => (
                  <option
                    value={unit}
                    key={unit}
                    selected={ingredientData && ingredientData.unit === unit}
                  >
                    {unit}
                  </option>
                ))}
              </motion.select>
            </div>
            <div className="col-span-3">
              <Input
                onChange={handleChange}
                withAnimate
                id="quantity"
                label="Quantity"
                withLabel
                placeholder="Quantity"
                type="number"
                defaultValue={ingredientData ? ingredientData.quantity : 0}
                disabled
              />
            </div>
          </div>
        </div>
      </div>

      {/* save or discard button */}

      <div className="sticky bottom-0 -mx-px bg-white ">
        <div className="flex justify-start pb-6">
          <NavLink to="/AdminDashboard/ingredient">
            <Button className="me-2 mt-8 border-2 border-orange-500 bg-white text-orange-500 hover:text-white">
              Discard
            </Button>
          </NavLink>
          <Button
            className="me-2 mt-8 bg-orange-500 text-white "
            type="button"
            onClick={
              ingredientData ? () => swallUpdate(data) : () => swallAdd(data)
            }
          >
            <FontAwesomeIcon icon={faSave} className="me-1" /> Save
          </Button>
        </div>
      </div>
    </Form>
  );
}
