import useAxios from ".";

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

export { StoreIngredientUse };
