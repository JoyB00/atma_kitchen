import useAxios from ".";

const FetchAllCustomers = async () => {
  try {
    const response = await useAxios.get("/customer", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    console.log(response.data.search);
    return response.data.data;
  } catch (err) {
    console.log(err.response.data);
    return err.response.data;
  }
};

const AddCustomer = async (data) => {
  try {
    const response = await useAxios.post("/customer", data, {
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

const FetchOrderHistory = async (id) => {
  try {
    const response = await useAxios.get(
      `/orderHistory/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
    return response.data.data;
  } catch (error) {
    return error.response.data;
  }
};

const GetCustomerById = async (id) => {
  try {
    const response = await useAxios.get(`/customer/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
};

const UpdateCustomer = async (data) => {
  try {
    const response = await useAxios.put(`/customer/${data.id}`, data, {
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

export {
  FetchAllCustomers,
  AddCustomer,
  FetchOrderHistory,
  GetCustomerById,
  UpdateCustomer,
};
