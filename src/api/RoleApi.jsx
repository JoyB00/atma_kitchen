import useAxios from ".";

const FetchAllRoles = async () => {
  try {
    const response = await useAxios.get("/role", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data.data;
  } catch (err) {
    return err.response.data;
  }
};

const AddRole = async (data) => {
  try {
    const response = await useAxios.post("/role", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};

const GetRoleById = async (id) => {
  try {
    const response = await useAxios.get(`/role/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    return error.response.data;
  }
};

const UpdateRole = async (data) => {
  try {
    const response = await useAxios.post(`/role/${data.id}`, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};

const DeleteRole = async (id) => {
  try {
    const response = await useAxios.delete(`/role/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};

export { FetchAllRoles, AddRole, GetRoleById, UpdateRole, DeleteRole };
