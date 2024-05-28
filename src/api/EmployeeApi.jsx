import useAxios from ".";
const FetchAllEmployees = async () => {
  try {
    const response = await useAxios.get("/employee", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    console.log(response.data.data);
    return response.data.data;
  } catch (err) {
    console.log(err.response.data);
    return err.response.data;
  }
};
const FetchAllEmployeesForSalary = async () => {
  try {
    const response = await useAxios.get("/employeeForSalary", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    console.log(response.data.search);
    return response.data.data;
  } catch (err) {
    console.log(err.response.data);
    return err.response.data;
  }
};

const AddEmployee = async (data) => {
  try {
    const response = await useAxios.post("/employee", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
};

const GetEmployeeById = async (id) => {
  try {
    const response = await useAxios.get(`/employee/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
};

const UpdateEmployee = async (data) => {
  try {
    const response = await useAxios.put(`/employee/${data.id}`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
};

const DeleteEmployee = async (id) => {
  try {
    const response = await useAxios.delete(`/employee/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
};

export {
  FetchAllEmployees,
  FetchAllEmployeesForSalary,
  AddEmployee,
  GetEmployeeById,
  UpdateEmployee,
  DeleteEmployee,
};
