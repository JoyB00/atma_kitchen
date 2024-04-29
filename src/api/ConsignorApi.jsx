import useAxios from ".";

const FetchAllConsignors = async () => {
  try {
    const response = await useAxios.get("/consignor");
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    return error.data.message;
  }
};

export { FetchAllConsignors };
