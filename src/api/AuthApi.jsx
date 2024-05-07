import useAxios from "./index";
const SignUp = async (data) => {
  try {
    const response = await useAxios.post("/register", data);
    return response.data;
  } catch (err) {
    throw err.response.data;
  }
};

const SignIn = async (data) => {
  try {
    const response = await useAxios.post("/login", data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const VerifyEmail = async (data) => {
  try {
    const response = await useAxios.post("/verifyEmail", data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
const VerifyCode = async (data) => {
  try {
    const response = await useAxios.post("/verifyCode", data);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const ChangePassword = async (data) => {
  try {
    const response = await useAxios.post("/changePassword", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const ChangePasswordEmployee = async (data) => {
  try {
    console.log("changing password");
    const response = await useAxios.post("/changePasswordEmployee", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

const LogOut = async () => {
  try {
    const response = await useAxios.post(
      "/logout",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export {
  SignUp,
  SignIn,
  LogOut,
  VerifyEmail,
  VerifyCode,
  ChangePassword,
  ChangePasswordEmployee,
};
