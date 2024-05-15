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
  AddIngredientProcurement,
  UpdateIngredientProcurement,
} from "../../../../api/IngredientProcurementApi";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import toast from "react-hot-toast";
export default function FormIngredientProcurement({
  dataEdit,
  details,
  ingredients,
}) {
  const intialState = dataEdit
    ? {
        id: dataEdit.id,
        procurement_date: dataEdit.procurement_date,
        total_price: dataEdit.total_price,
        detail: details,
      }
    : {
        procurement_date: "",
        total_price: "",
        detail: [],
      };
  let animate = {
    initial: { opacity: 0, y: -100 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [data, setData] = useState(intialState);
  const [detail, setDetail] = useState(details ? details : []);
  const [counterDetail, setCounterDetail] = useState(0);

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const handleAddDetail = (event) => {
    event.preventDefault();
    setDetail((dataPrev) => {
      const addDetail = {
        id: counterDetail,
        ingredient_id: ingredients[0].id,
        quantity: 0,
        price: 0,
        total_price: 0,
      };
      setCounterDetail(counterDetail + 1);
      setData({ ...data, detail: [...dataPrev, addDetail] });
      return [...dataPrev, addDetail];
    });
  };
  const handleChangeDetail = (event, index) => {
    event.preventDefault();
    const currentData = [...detail];
    currentData[index][event.target.name] = event.target.value;
    currentData[index]["total_price"] =
      currentData[index]["price"] * currentData[index]["quantity"];
    setDetail(currentData);
    setData({ ...data, detail: currentData });
  };
  const handleDeleteDetail = (event, id) => {
    event.preventDefault();
    const updatedDetail = detail.filter((detail) => {
      return detail.id !== id;
    });
    setDetail(updatedDetail);
    setData({ ...data, detail: updatedDetail });
  };

  const addProcurement = useMutation({
    mutationFn: (data) => {
      return AddIngredientProcurement(data);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["ingredientProcurements"]);
    },
    onSuccess: () => {
      queryClient.setQueryData(["ingredientProcurements"], data);
      navigate("/MoDashboard/ingredientProcurement");
    },
    onError: (error) => {
      throw error.message;
    },
  });

  const updateProcurement = useMutation({
    mutationFn: (data) => {
      return UpdateIngredientProcurement(data);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["ingredientProcurements"]);
    },
    onSuccess: () => {
      queryClient.setQueryData(
        ["ingredientProcurements", { id: dataEdit.id }],
        data,
      );
      navigate("/MoDashboard/ingredientProcurement");
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
    const totalPriceAllDetails = () => {
      let temp = 0;
      if (counterDetail != 0 || dataEdit) {
        detail.forEach((detail) => {
          temp += detail.total_price;
        });
        setData({ ...data, total_price: temp });
      }
    };
    totalPriceAllDetails();
    console.log("data", data);
  }, [detail]);

  return (
    <Form method="post">
      <div className="mt-8 grid grid-cols-5">
        <div className="col-span-5 pe-12">
          <h1 className="text-xl font-medium">Basic Information</h1>
          <p className="mb-6 font-light text-gray-400">
            Please enter the basic information of your Ingredient Procurement.
          </p>
        </div>
      </div>
      <div className="mb-4 grid grid-cols-12">
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
      <hr />
      {console.log(detail)}
      {detail.map((data, index) => {
        {
          console.log("data ingredients", data.ingredient_id);
        }
        return (
          <div key={index}>
            <h1 className="mt-3 text-xl font-semibold">
              Ingredient Procurement {index + 1}
            </h1>
            <div className="grid grid-cols-12 gap-6" key={index}>
              <div className="col-span-6 ">
                {/* category */}
                <div className="my-2 ">
                  <label htmlFor="ingredient_id">Ingredient</label>
                </div>

                <motion.select
                  {...animate}
                  className="block w-full rounded-xl border-0 px-3 py-3.5 text-sm text-black shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                  onChange={(event) => handleChangeDetail(event, index)}
                  name="ingredient_id"
                  id="ingredient_id"
                  defaultValue={details ? details.ingredient_id : ""}
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
              </div>
              <div className="col-span-6">
                <Input
                  onChange={(event) => handleChangeDetail(event, index)}
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
                  onChange={(event) => handleChangeDetail(event, index)}
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
            <div className="flex justify-end">
              <Button
                withoutAnimate
                className=" mb-2 bg-transparent text-blue-400 hover:text-blue-600"
                type="button"
                onClick={(event) => handleDeleteDetail(event, data.id)}
              >
                <FontAwesomeIcon icon={faTrash} className="me-1" />
                Delete Recipe
              </Button>
            </div>
            <hr />
          </div>
        );
      })}

      <div className="">
        <button
          className="text-orange-400 hover:text-orange-500"
          onClick={handleAddDetail}
        >
          <FontAwesomeIcon icon={faPlus} className="me-1" />
          Add Procurement
        </button>
      </div>

      {/* save or discard button */}

      <div className="sticky bottom-0 -mx-px flex justify-between bg-white ">
        <div className="mb-4">
          <NavLink to="/MoDashboard/ingredientProcurement">
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
        <div className=" my-auto flex items-center pt-8 ">
          <h1 className="text-2xl font-semibold text-orange-500">
            {" "}
            <FontAwesomeIcon icon={faDollar} className="me-1" /> Total Price :{" "}
            {data.total_price}
          </h1>
        </div>
      </div>
    </Form>
  );
}
