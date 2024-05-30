import { useAxios } from "./index";

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
    return error.response.data;
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

const GetTransactionWhereStatusOnProcess = async () => {
  var data = {
    status: "onProcess",
  };

  try {
    const response = await useAxios.post(`/transactionWhereStatus`, data, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};

const GetTransactionWhereStatusReadyForPickup = async () => {
  var data = {
    status: "readyForPickup",
  };

  try {
    const response = await useAxios.post(`/transactionWhereStatus`, data, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};

const ChangeTransactionStatus = async ({ id, status }) => {
  var data = {
    id: id,
    status: status,
  };

  try {
    const response = await useAxios.post(`/changeTransactionStatus`, data, {
      headers: {
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
  StoreTransaction,
  PaymentCustomer,
  StorePaymentEvidence,
  ChangeTransactionStatus,
  GetTransactionWhereStatusOnProcess,
  GetTransactionWhereStatusReadyForPickup,
};
