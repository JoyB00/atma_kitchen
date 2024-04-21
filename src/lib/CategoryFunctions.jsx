import { atom } from "jotai";
import { FetchAllCategories } from "../api/CategoryApi";

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
export { allCategories };
