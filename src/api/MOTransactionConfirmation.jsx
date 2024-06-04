import useAxios from ".";

const TransactionConfirmation = async (data) => {
  try {
    const response = await useAxios.post("/transactionConfirmation", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log(err.response.data);
    throw err.response.data;
  }
};

const getShortageIngredients = async (transactionId) => {
  try {
    const response = await useAxios.get(`/shortageIngredient/${transactionId}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data.data; // Ensure this matches the response structure from your backend
  } catch (err) {
    console.error("Error fetching shortage ingredients:", err);
    throw err;
  }
};

const ConfirmationToProcess = async () => {
  try {
    const response = await useAxios.get("/transactionConfirmation/proccess", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    console.log(response);
    return response.data.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};
const RecapTransactionToProcess = async (data) => {
  try {
    const response = await useAxios.post(
      "/transactionConfirmation/proccess/recap",
      data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      },
    );
    console.log(response);
    return response.data.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
};

export {
  TransactionConfirmation,
  getShortageIngredients,
  ConfirmationToProcess,
  RecapTransactionToProcess,
};
