import useAxios from ".";

const FetchAllRoles = async () => {
  try {
    const response = await useAxios.get("/role");
    return response.data.data;
  } catch (err) {
    return err.response.data;
  }
};

const AddRole = async (data) => {
  try {
    const response = await useAxios.post("/role", data);
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};

const GetRoleById = async (id) => {
  try {
    const response = await useAxios.get(`/role/${id}`);
    return response.data.data;
  } catch (error) {
    return error.response.data;
  }
};

const UpdateRole = async (data) => {
  try {
    const response = await useAxios.post(`/role/${data.id}`, data);
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};

const DeleteRole = async (id) => {
  try {
    const response = await useAxios.delete(`/role/${id}`);
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};

export { FetchAllRoles, AddRole, GetRoleById, UpdateRole, DeleteRole };
