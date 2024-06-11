import { useAxios } from ".";

// Ensure user and token retrieval is consistent
const getUser = () => JSON.parse(sessionStorage.getItem("user"));
const getToken = () => sessionStorage.getItem("token");

const GetProductSalesReport = async (month) => {
  try {
    if (getUser().role_id === 1 || getUser().role_id === 3) {
      const response = await useAxios.get(`/productSales?month=${month}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
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
    const data = { year };
    const response = await useAxios.post(`/salesReportMonthly`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (e) {
    return e.response.data;
  }
};

const GetIngredientUsageReport = async ({ from, to }) => {
  try {
    const data = { from, to };
    const response = await useAxios.post(`/ingredientUsageReport`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (e) {
    return e.response.data;
  }
};

const GetConsignorSalesReport = async (year, month) => {
  try {
    const data = { year, month };
    const response = await useAxios.post(`/consignor-report`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
    console.log("API Response:", response.data); // Log the API response for debugging
    return response.data;
  } catch (error) {
    console.error("Error fetching consignor sales report:", error);
    return [];
  }
};

const GetAbsenceReport = async (year, month) => {
  try {
    const data = { year, month };
    const response = await useAxios.post('/absence-report', data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
    console.log("API Response:", response.data); // Log API response for debugging
    return response.data;
  } catch (error) {
    console.error("Error fetching absence report:", error);
    return null;
  }
};
const GetIncomeExpenseReport = async (year, month) => {
  try {
    const data = { year, month };
    const response = await useAxios.post('/income-expense-report', data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching income and expense report:", error);
    return null;
  }
};

export {
  GetProductSalesReport,
  GetMonthlySalesReport,
  GetIngredientUsageReport,
  GetConsignorSalesReport,
  GetAbsenceReport,
  GetIncomeExpenseReport,
};
