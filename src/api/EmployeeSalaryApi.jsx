import useAxios from ".";
const FetchAllSalary = async () => {
  try {
    const response = await useAxios.get(`/employeeSalary`);
    return response.data.data;
  } catch (error) {
    console.log(error.response.data.message);
    return error.response.data;
  }
};
const GetSalary = async (id) => {
  try {
    const response = await useAxios.get(`/salary/${id}`);
    return response.data.data;
  } catch (error) {
    console.log(error.response.data.message);
    return error.response.data;
  }
};
const GetDetailSalary = async (id) => {
  try {
    const response = await useAxios.get(`/employeeSalary/${id}`);
    return response.data.data;
  } catch (error) {
    console.log(error.response.data.message);
    return error.response.data;
  }
};

const AddEmployeeSalary = async (data) => {
  try {
    const response = await useAxios.post("/employeeSalary", data);
    return response.data.data;
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
};

const UpdateEmployeeSalary = async (data) => {
  try {
    const response = await useAxios.put(`/employeeSalary/${data.id}`, data);
    return response.data.data;
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
};

const DeleteEmployeeSalary = async (id) => {
  try {
    const response = await useAxios.delete(`/employeeSalary/${id}`);
    return response.data.data;
  } catch (err) {
    console.log(err.response.data);
    return err.response.data;
  }
};

export {
  FetchAllSalary,
  GetSalary,
  GetDetailSalary,
  AddEmployeeSalary,
  UpdateEmployeeSalary,
  DeleteEmployeeSalary,
};
