import useAxios from ".";

const AddDelivery = async (data) => {
  try {
    const response = await useAxios.post("/delivery", data, {
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

const UpdateDelivery = async (data) => {
  try {
    const response = await useAxios.put(`/delivery/${data.id}`, data, {
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

export { AddDelivery, UpdateDelivery };
