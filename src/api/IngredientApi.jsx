import { ClimbingBoxLoader } from "react-spinners";
import useAxios from ".";
const GetAllIngredients = async () => {
  try {
    const response = await useAxios.get("/ingredient");
    return response.data.data;
  } catch (err) {
    console.log(err.response.data);
    return err.response.data;
  }
};

const AddIngredient = async (data) => {
  try {
    const response = await useAxios.post("/ingredient", data);
    return response.data.data;
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
};

const GetIngredientById = async (id) => {
  try {
    const response = await useAxios.get(`/ingredient/${id}`);
    console.log(response.data.data)
    return response.data.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
};

const UpdateIngredient = async (data) => {
  try {
    const response = await useAxios.post(`/ingredient/${data.id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
};

const DeleteIngredient = async (id) => {
  try {
    const response = await useAxios.delete(`/ingredient/${id}`);
    return response.data.data;
  } catch (err) {
    console.log(err.response.data);
    return err.response.data;
  }
};

export {
  GetAllIngredients,
  AddIngredient,
  DeleteIngredient,
  GetIngredientById,
  UpdateIngredient,
};
