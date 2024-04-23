import useAxios from ".";

const FetchAllHampers = async () => {
  try {
    const response = await useAxios.get("/hampers");
    return response.data.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
};

export { FetchAllHampers };
