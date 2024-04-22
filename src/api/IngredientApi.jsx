import useAxios from ".";

const GetAllIngredients = async () => {
  try {
    const response = await useAxios.get("/ingredient");
    return response.data.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
};

export { GetAllIngredients };
