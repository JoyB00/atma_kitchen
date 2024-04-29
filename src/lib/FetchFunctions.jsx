import { atom } from "jotai";
import { GetAllIngredients } from "../api/IngredientApi";
import { FetchAllCategories } from "../api/CategoryApi";
import { FetchAllProducts } from "../api/ProductApi";
import { GetHampersById } from "../api/HampersApi";
import { FetchAllConsignors } from "../api/ConsignorApi";

const fetchCategories = async () => {
  try {
    const response = await FetchAllCategories();
    console.log(response);
    return response;
  } catch (error) {
    console.error(error.message);
    return error.message;
  }
};
const allCategories = atom(fetchCategories);

const fetchAllIngredients = async () => {
  try {
    const response = await GetAllIngredients();
    return response;
  } catch (error) {
    return error.message;
  }
};
const allIngredients = atom(fetchAllIngredients);

const fetchAllProduct = async () => {
  try {
    const response = await FetchAllProducts();
    return response;
  } catch (error) {
    return error.message;
  }
};
const allProducts = atom(fetchAllProduct);

const fetchAllConsignors = async () => {
  try {
    const response = await FetchAllConsignors();
    console.log("penitip di lib", response);
    return response;
  } catch (error) {
    return error.message;
  }
};

const allConsignors = atom(fetchAllConsignors);

// const fetchAllIngredientDetails = async ()

export { allIngredients, allCategories, allProducts, allConsignors };
