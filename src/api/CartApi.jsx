import useAxios from ".";

const FetchCarts = async () => {
  try {
    const response = await useAxios.get("/cart", {
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
const FetchCartsPerDate = async () => {
  try {
    const response = await useAxios.get("/cartPerDate", {
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

const AddCartItem = async (data) => {
  try {
    const response = await useAxios.post("/cart", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
};

const UpdateCartItem = async (data) => {
  try {
    const response = await useAxios.put(`/cart/${data.id}`, data, {
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

const DeleteCartItem = async (id) => {
  try {
    const response = await useAxios.delete(`/cart/${id}`, {
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
  FetchCarts,
  FetchCartsPerDate,
  AddCartItem,
  UpdateCartItem,
  DeleteCartItem,
};
