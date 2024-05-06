import useAxios from ".";
const FetchAllIngredientProcurement = async () => {
  try {
    const response = await useAxios.get("/ingredientProcurement", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });

    return response.data.data;
  } catch (error) {
    return error.data.message;
  }
};

const AddIngredientProcurement = async (data) => {
  try {
    const response = await useAxios.post("/ingredientProcurement", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
};

const GetIngredientProcurement = async (id) => {
  try {
    const response = await useAxios.get(`/ingredientProcurement/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    console.log(response.data);
    return response.data.data;
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
};

const UpdateIngredientProcurement = async (data) => {
  try {
    const response = await useAxios.put(
      `/ingredientProcurement/${data.id}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
    console.log(response.data);
    return response.data.data;
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
};

const DeleteIngredientProcurement = async (id) => {
  try {
    const response = await useAxios.delete(`/ingredientProcurement/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    return error.response.data;
  }
};

export {
  FetchAllIngredientProcurement,
  AddIngredientProcurement,
  GetIngredientProcurement,
  UpdateIngredientProcurement,
  DeleteIngredientProcurement,
};
