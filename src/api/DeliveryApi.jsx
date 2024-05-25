import useAxios from ".";

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

export { fetchAllInputDistance, setInputDistance };
