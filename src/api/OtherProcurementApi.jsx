import useAxios from ".";

const FetchAllOtherProcurements = async () => {
  try {
    const response = await useAxios.get("/otherProcurement", {
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
const GetOtherProcurement = async (id) => {
  try {
    const response = await useAxios.get(`/otherProcurement/${id}`, {
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

const AddOtherProcurement = async (data) => {
  try {
    const response = await useAxios.post("/otherProcurement", data, {
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
const UpdateOtherProcurement = async (data) => {
  try {
    const response = await useAxios.put(`/otherProcurement/${data.id}`, data, {
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

const DeleteOtherProcurement = async (id) => {
  try {
    const response = await useAxios.delete(`/otherProcurement/${id}`, {
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

export {
  FetchAllOtherProcurements,
  GetOtherProcurement,
  AddOtherProcurement,
  UpdateOtherProcurement,
  DeleteOtherProcurement,
};
