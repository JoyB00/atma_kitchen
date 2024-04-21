import useAxios from ".";

const FetchAllCategories = async () => {
  try {
    const response = await useAxios.get("/category");
    // console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    return error.response.data;
  }
};

export { FetchAllCategories };
