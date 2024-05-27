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
const GetAuthCustomerTransactions = async (transactionId) => {
  // Transactions is order history
  try {
    const response = await useAxios.get(`/orderDetail/${transactionId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error.response.data;
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

const StoreBuyNow = async (data) => {
  try {
    const response = await useAxios.post("/orderBuyNow", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};
const StoreTransaction = async (data) => {
  try {
    const response = await useAxios.post("/order", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};

const PaymentCustomer = async (data) => {
  try {
    const response = await useAxios.put(`/payment/${data.id}`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};
const StorePaymentEvidence = async (data) => {
  try {
    const response = await useAxios.post(`/payment/evidence/${data.id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};
const UpdateDateTransaction = async (data) => {
  try {
    const response = await useAxios.put(`/order/${data.id}`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};
const DeleteTransaction = async (data) => {
  try {
    const response = await useAxios.delete(`/order/${data.id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};

export {
  GetCustomerTransactions,
  GetAuthCustomerTransactions,
  GetDetailTransaction,
  StoreBuyNow,
  StoreTransaction,
  PaymentCustomer,
  StorePaymentEvidence,
  UpdateDateTransaction,
  DeleteTransaction,
};
