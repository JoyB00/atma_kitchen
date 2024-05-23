import useAxios from ".";

const GetTokenMidtrans = async (data) => {
  try {
    const response = await useAxios.post("/payment", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
};

export { GetTokenMidtrans };
