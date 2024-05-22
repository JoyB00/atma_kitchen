import useAxios from ".";

const FetchAllHampers = async () => {
  try {
    const response = await useAxios.get("/hampers", {
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

const AddHampers = async (data) => {
  try {
    const response = await useAxios.post("/hampers", data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};

const GetHampersById = async (id) => {
  try {
    const response = await useAxios.get(`/hampers/${id}`, {
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

const UpdateHampers = async (data) => {
  try {
    const response = await useAxios.post(`/hampers/${data.id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
};

const DeleteHampers = async (id) => {
  try {
    const response = await useAxios.delete(`/hampers/${id}`, {
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
const DisableHampers = async (id) => {
  try {
    const response = await useAxios.put(`/hampers/${id}`, id, {
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

export {
  FetchAllHampers,
  AddHampers,
  GetHampersById,
  UpdateHampers,
  DeleteHampers,
  DisableHampers,
};
