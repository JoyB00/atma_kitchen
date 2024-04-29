import useAxios from ".";
const FetchAllIngredientProcurement = async () => {
  try {
    const response = await useAxios.get("/ingredientProcurement");

    return response.data.data;
  } catch (error) {
    return error.data.message;
  }
};

export { FetchAllIngredientProcurement };
