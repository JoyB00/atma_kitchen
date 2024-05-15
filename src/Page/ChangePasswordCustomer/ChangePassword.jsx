import Navbar from "../../Component/Navbar.jsx";
import Button from "../../Component/Button.jsx";
import Footer from "../../Component/Footer.jsx";
import chef from "../../assets/chef.json";
import Lottie from "lottie-react";
import Input from "../../Component/Input.jsx";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { ChangePassword as ChangePasswordApi } from "../../api/AuthApi.jsx";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export default function ChangePassword() {
  const [data, setData] = useState({ password: "", confirmPassword: "" });
  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const navigate = useNavigate();
  const handleClick = (event, data) => {
    event.preventDefault();

    if (data.password == "" || data.confirmPassword == "") {
      toast.error("Password or Confirm Password is required", {
        style: {
          backgroundColor: "#000000",
          color: "#ffffff",
        },
        position: "bottom-right",
      });
    } else if (data.password != data.confirmPassword) {
      toast.error("Confirm Password is not match with Password", {
        style: {
          backgroundColor: "#000000",
          color: "#ffffff",
        },
        position: "bottom-right",
      });
    } else {
      toast.promise(
        changePassword.mutateAsync(data),
        {
          loading: "Loading",
          success: `Change Password Successfully`,
          error: (err) => err,
        },
        {
          style: {
            backgroundColor: "#000000",
            color: "#ffffff",
          },
          position: "bottom-right",
        },
      );
    }
  };
  const changePassword = useMutation({
    mutationFn: (data) => {
      return ChangePasswordApi(data);
    },
    onSuccess: (data) => {
      sessionStorage.removeItem("token");
      navigate(`/login`);
    },
    onError: (error) => {
      throw error.message;
    },
  });
  return (
    <div className="w-full bg-gradient-to-r from-cyan-100 via-transparent ">
      {console.log(data)}
      <Navbar />
      <div className="min-h-screen flex justify-center items-center">
        <div className="  grid grid-cols-12 gap-x-5 w-4/6 rounded-3xl bg-orange-50">
          <div className="col-span-6 bg-gradient-to-t from-orange-600 to-orange-300 rounded-3xl">
            <Lottie animationData={chef} />
          </div>
          <div className="col-span-6 text-lg text-orange-500 text-start pe-8 py-8 px-7 ">
            <h1 className="font-semibold">Change Password</h1>
            <p className="text-black">
              Please change your password to new password
            </p>
            <Input
              withAnimate
              label="New Password"
              id="password"
              type="password"
              placeholder="New Password"
              onChange={handleChange}
            />
            <Input
              withAnimate
              label="Confirm Password"
              id="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              onChange={handleChange}
            />
            <div className="grid grid-cols-1 pt-2">
              <Button
                className=" bg-orange-500 text-white drop-shadow-md rounded-3xl col-span-1"
                type="button"
                onClick={(event) => handleClick(event, data)}
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className=" md:pt-8">
        <Footer />
      </div>
    </div>
  );
}
