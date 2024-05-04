import useAxios from ".";
const GetDetailTransaction = async (id) => {
  try {
    const response = await useAxios.get(`/detailOrder/${id}`);
    return response.data.data;
  } catch (error) {
    return error.response.data;
  }
};

export { GetDetailTransaction };
