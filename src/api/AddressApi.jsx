import useAxios from ".";

const FetchAllAddresses = async () => {
  try {
    const response = await useAxios.get("/address", {
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

const GetAddressById = async (id) => {
  try {
    const response = await useAxios.get(`/address/${id}`, {
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

const AddAddress = async (data) => {
  try {
    const response = await useAxios.post("/address", data, {
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

const EditAddress = async (data) => {
  try {
    const response = await useAxios.put(`/address/${data.id}`, data, {
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

const DeleteAddress = async (id) => {
  try {
    const response = await useAxios.delete(`/address/${id}`, {
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
  FetchAllAddresses,
  GetAddressById,
  AddAddress,
  EditAddress,
  DeleteAddress,
};
