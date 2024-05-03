import useAxios from ".";
const FetchAllProducts = async () => {
  try {
    const response = await useAxios.get("/product");
    console.log(response.data.search);
    return response.data.data;
  } catch (err) {
    console.log(err.response.data);
    return err.response.data;
  }
};

const AddProduct = async (data) => {
  try {
    const response = await useAxios.post("/product", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
};

const GetProductById = async (id) => {
  try {
    const response = await useAxios.get(`/product/${id}`);
    return response.data.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
};

const GetLimitProductByDate = async (data) => {
  try {
    const response = await useAxios.post(`/limitProduct/${data.id}`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
};

const UpdateProduct = async (data) => {
  try {
    const response = await useAxios.post(`/product/${data.id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.data;
  } catch (error) {
    console.log(error.response.data);
    throw error.response.data;
  }
};

const DeleteProduct = async (id) => {
  try {
    const response = await useAxios.delete(`/product/${id}`);
    return response.data.data;
  } catch (err) {
    console.log(err.response.data);
    return err.response.data;
  }
};
const DisableProduct = async (id) => {
  try {
    const response = await useAxios.put(`/product/${id}`);
    return response.data.data;
  } catch (err) {
    console.log(err.response.data);
    return err.response.data;
  }
};

export {
  FetchAllProducts,
  AddProduct,
  DeleteProduct,
  DisableProduct,
  GetProductById,
  GetLimitProductByDate,
  UpdateProduct,
};
