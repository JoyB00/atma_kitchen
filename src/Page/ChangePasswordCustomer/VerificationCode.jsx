import Navbar from "../../Component/Navbar.jsx";
import Button from "../../Component/Button.jsx";
import Footer from "../../Component/Footer.jsx";
import chef from "../../assets/chef.json";
import Lottie from "lottie-react";
import Input from "../../Component/Input.jsx";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { VerifyCode } from "../../api/AuthApi.jsx";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
export default function VerificationCode() {
  const [data, setData] = useState({ verification_code: "" });
  const handleChange = (event) => {
    setData({ verification_code: event.target.value });
  };
  const navigate = useNavigate();
  const handleClick = (event, data) => {
    event.preventDefault();
    console.log(data);
    toast.promise(
      verifYEmail.mutateAsync(data),
      {
        loading: "Loading",
        success: `Email sent, verify your email address ${verifYEmail.data}`,
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
  };
  const verifYEmail = useMutation({
    mutationFn: (data) => {
      return VerifyCode(data);
    },
    onSuccess: (data) => {
      console.log("sukses", data);
      sessionStorage.setItem("token", data.access_token);
      navigate(`/forgotPassword/${data.access_token}`);
    },
    onError: (error) => {
      throw error.message;
    },
  });
  return (
    <div className="w-full bg-gradient-to-r from-cyan-100 via-transparent ">
      <Navbar />
      <div className="flex min-h-screen items-center justify-center">
        <div className="  grid w-4/6 grid-cols-12 gap-x-5 rounded-3xl bg-orange-50">
          <div className="col-span-6 rounded-3xl bg-gradient-to-t from-orange-600 to-orange-300">
            <Lottie animationData={chef} />
          </div>
          <div className="col-span-6 px-6 pe-8 pt-24 text-start text-lg text-orange-500 ">
            <h1 className="font-semibold">Verification Code</h1>
            <p className="text-black">
              Please check your email to get a Verification code
            </p>
            <Input
              withAnimate
              label="Verification Code"
              id="verification_code"
              type="number"
              placeholder="Verification Code : XXXXXX"
              onChange={handleChange}
            />
            <div className="grid grid-cols-1 pt-2">
              <Button
                className=" col-span-1 rounded-3xl bg-orange-500 text-white drop-shadow-md"
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
