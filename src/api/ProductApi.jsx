import useAxios from "./useAxios";
const FetchAllProducts = async () => {
  try {
    const response = await useAxios.get("/products");
    return response.data.data;
  } catch (err) {
    console.log(err.response.data);
    return err.response.data;
  }
};

const GetProductById = async (id) => {
  try {
    const response = await useAxios.get(`/products/${id}`);
    return response.data.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response;
  }
};

const UpdateProduct = async (id) => {
  try {
    const response = await useAxios.patch(`/products/${id}`);
    return response.data.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
};

const DeleteProduct = async (id) => {
  try {
    const response = await useAxios.delete(`/products/${id}`);
    return response.data.data;
  } catch (err) {
    console.log(err.response.data);
    return err.response.data;
  }
};

export { FetchAllProducts, DeleteProduct, GetProductById, UpdateProduct };