import useAxios from ".";
const FetchAllEmployees = async () => {
  try {
    const response = await useAxios.get("/employee");
    console.log(response.data.search);
    return response.data.data;
  } catch (err) {
    console.log(err.response.data);
    return err.response.data;
  }
};
const FetchAllEmployeesForSalary = async () => {
  try {
    const response = await useAxios.get("/employeeForSalary");
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
        "Content-Type": "multipart/form-data",
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
    const response = await useAxios.get(`/employee/${id}`);
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
        "Content-Type": "multipart/form-data",
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
    const response = await useAxios.delete(`/employee/${id}`);
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
