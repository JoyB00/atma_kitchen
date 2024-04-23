import useAxios from ".";

const FetchAllHampers = async () => {
  try {
    const response = await useAxios.get("/hampers");
    return response.data.data;
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
};

const AddHampers = async (data) => {
  try {
    const response = await useAxios.post("/hampers", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.data;
  } catch (error) {
    throw error.response.data;
  }
};

const UpdateHampers = async (data) => {
  try {
    const response = await useAxios.post(`/hampers/${data.id}`, data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data.data;
  } catch (error) {
    return error.response.data;
  }
};

export { FetchAllHampers, AddHampers, UpdateHampers };
