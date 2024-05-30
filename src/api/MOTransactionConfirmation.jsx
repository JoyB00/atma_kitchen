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

export { TransactionConfirmation };
