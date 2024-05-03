import useAxios from ".";

const FetchAllCustomers = async () => {
  try {
    const response = await useAxios.get("/customer");
    return response.data.data;
  } catch (error) {
    return error.response.data;
  }
};

const FetchOrderHistory = async (id) => {
  try {
    const response = await useAxios.get(`/orderHistory/${id}`);
    return response.data.data;
  } catch (error) {
    return error.response.data;
  }
};

export { FetchAllCustomers, FetchOrderHistory };
