import useAxios from ".";

const FetchAllCustomers = async () => {
  try {
    const response = await useAxios.get("/customer", {
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

const GetLoggedInCustomer = async () => {
  try {
    const response = await useAxios.get("/customerLoggedIn", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    console.log("from customer api");
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    return error.response.data;
  }
};

const EditCustomer = async (data) => {
  try {
    const response = await useAxios.put(`/customer/${data.id}`, data, {
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

const FetchOrderHistory = async (id) => {
  try {
    console.log("id", id);
    const response = await useAxios.get(`/orderHistory/${id}`, {
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
  FetchAllCustomers,
  FetchOrderHistory,
  GetLoggedInCustomer,
  EditCustomer,
};
