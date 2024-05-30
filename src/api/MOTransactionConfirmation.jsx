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
  ConfirmationToProcess,
  RecapTransactionToProcess,
};
