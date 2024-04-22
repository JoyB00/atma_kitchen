import { atom } from "jotai";
import { GetAllIngredients } from "../api/IngredientApi";

const fetchAllIngredients = async () => {
  try {
    const response = await GetAllIngredients();
    console.log("data ingredient ", response);
    return response;
  } catch (error) {
    return error.message;
  }
};

const allIngredients = atom(fetchAllIngredients);
export default allIngredients;
