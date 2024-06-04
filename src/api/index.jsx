import axios from "axios";
export const BASE_URL = "http://127.0.0.1:8000";

export const getPicture = (picture, folder) => {
  return `${BASE_URL}/storage/${folder}/${picture}`;
};
const useAxios = axios.create({
  baseURL: `${BASE_URL}/api`,
});

export default useAxios;
