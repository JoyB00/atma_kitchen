import { useAxios } from "./index";

const fetchAllInputDistance = async () => {
  try {
    const response = await useAxios.get("/deliveryDistance", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data.data;
  } catch (err) {
    console.log(err.response.data);
    return err.response.data;
  }
};

const setInputDistance = async (data) => {
  try {
    const response = await useAxios.post("/deliveryDistance", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data.data;
  } catch (err) {
    console.log(err.response.data);
    return err.response.data;
  }
};

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

export { fetchAllInputDistance, setInputDistance, AddDelivery, UpdateDelivery };
