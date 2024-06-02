import { useAxios } from "./index";

const GetProductSalesReport = async (month) => {
  try {
    if (JSON.parse(sessionStorage.getItem("user")).role_id === 1) {
      const response = await useAxios.get(
        `/productSales/Owner?month=${month}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        },
      );
      return response.data.data;
    } else if (JSON.parse(sessionStorage.getItem("user")).role_id === 3) {
      const response = await useAxios.get(`/productSales/MO?month=${month}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      });
      return response.data.data;
    }
  } catch (error) {
    return error.response.data;
  }
};

export { GetProductSalesReport };
