import useAxios from ".";

const GetCustomerTransactions = async (customerId) => {
  // Transactions is order history
  try {
    const response = await useAxios.get(`/orderHistory/${customerId}`, {
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

const GetDetailTransaction = async (transactionId) => {
  try {
    const response = await useAxios.get(`/detailOrder/${transactionId}`, {
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

export { GetDetailTransaction };
