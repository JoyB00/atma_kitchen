import axios from "axios";
export const BASE_URL = "http://20.63.141.242:8000";

export const getPicture = (picture, folder) => {
  return `${BASE_URL}/storage/${folder}/${picture}`;
};
const useAxios = axios.create({
  baseURL: `${BASE_URL}/api`,
});

export default useAxios;
