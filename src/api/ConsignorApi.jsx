import useAxios from ".";

const FetchAllConsignors = async () => {
  try {
    const response = await useAxios.get("/consignor", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    return error.data.message;
  }
};

const GetConsignor = async (id) => {
  try {
    const response = await useAxios.get(`/consignor/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    return error.data.message;
  }
};

const AddConsignor = async (data) => {
  try {
    const response = await useAxios.post("/consignor", data, {
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
const UpdateConsignor = async (data) => {
  try {
    const response = await useAxios.put(`/consignor/${data.id}`, data, {
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
const DeleteConsignor = async (id) => {
  try {
    const response = await useAxios.delete(`/consignor/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    return error.data.message;
  }
};

export {
  FetchAllConsignors,
  GetConsignor,
  AddConsignor,
  UpdateConsignor,
  DeleteConsignor,
};
