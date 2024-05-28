import axios from "axios";
import OneSignal from "react-onesignal";

export const BASE_URL = "http://20.63.141.242:8000";

export const getPicture = (picture, folder) => {
  return `${BASE_URL}/storage/${folder}/${picture}`;
};

export const useAxios = axios.create({
  baseURL: `${BASE_URL}/api`,
});

export const initOneSignal = async () => {
  OneSignal.init({
    appId: "2fe3a6db-c004-424c-9b92-099391f7f88b",
  });
};

export default [useAxios, initOneSignal];
