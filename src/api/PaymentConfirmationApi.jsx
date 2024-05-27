import useAxios from ".";

const fetchAllPaymentConfirmation = async () => {
  try {
    const response = await useAxios.get("/paymentConfirmation", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    console.log(response);
    return response.data.data;
  } catch (err) {
    console.log(err.response.data);
    return err.response.data;
  }
};

const confirmPayment = async (data) => {
  try {
    const response = await useAxios.post("/paymentConfirmation", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err.response.data);
    return err.response.data;
  }
};

const rejectTransaction = async (id) => {
  try {
    const response = await useAxios.post(`/paymentConfirmation/reject/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err.response.data);
    return err.response.data;
  }
};

export { fetchAllPaymentConfirmation, confirmPayment, rejectTransaction };
