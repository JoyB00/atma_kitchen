import { useAxios } from "./index";

const GetAllIngredientUse = async () => {
  try {
    const res = await useAxios.get("ingredientUseHistory", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return res.data.data;
  } catch (error) {
    return error.response.data;
  }
};

const StoreIngredientUse = async (data) => {
  try {
    const res = await useAxios.post("/ingredientUseHistory", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return res.data.data;
  } catch (error) {
    throw error.response.data;
  }
};

export { GetAllIngredientUse, StoreIngredientUse };
