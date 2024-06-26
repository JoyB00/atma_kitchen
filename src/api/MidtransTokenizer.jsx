import { useAxios } from "./index";

const GetTokenMidtrans = async (data) => {
  console.log(data);
  try {
    const response = await useAxios.post("/payment", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export { GetTokenMidtrans };
