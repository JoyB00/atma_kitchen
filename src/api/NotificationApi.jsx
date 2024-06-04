import { useAxios } from "./index";

export async function sendNotificationToUser({ user_id, title, message }) {
  const data = {
    user_id,
    title,
    message,
  };

  try {
    const response = await useAxios.post("/sendNotification", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });

    return response.data.data;
  } catch (error) {
    return error.data.message;
  }
}

export default sendNotificationToUser;
