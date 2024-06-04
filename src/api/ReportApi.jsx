import { useAxios } from "./index";

const GetProductSalesReport = async (month) => {
  try {
    if (JSON.parse(sessionStorage.getItem("user")).role_id === 1) {
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

const GetMonthlySalesReport = async ({ year }) => {
  try {
    const data = {
      year: year,
    };
    const response = await useAxios.post(`/salesReportMonthly`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (e) {
    return e.response.data;
  }
};

export { GetProductSalesReport, GetMonthlySalesReport };
