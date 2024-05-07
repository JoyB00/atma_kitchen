import Navbar from "../../Component/Navbar";
import Footer from "../../Component/Footer";
import { Form } from "react-router-dom";
import Input from "../../Component/Input";
import { useState } from "react";
import Button from "../../Component/Button";
import toast from "react-hot-toast";
import { ChangePasswordEmployee } from "../../api/AuthApi";

export default function ForgotPasswordEmployeePage() {
  const handleChange = (event) => {
    // console.log(`${event.target.name} : ${event.target.value}`);
    setData({ ...data, [event.target.name]: event.target.value });
  };
  let animate = {
    initial: { opacity: 0, y: -100 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };
  const [data, setData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const changePassword = () => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }
    ChangePasswordEmployee(data).then((res) => {
      toast.success(res.message);
    });
  };

  return (
    <div>
      <Navbar />
      <div className="flex flex-col min-h-screen justify-center">
        <span className="text-orange-500 font-bold text-2xl">
          Reset your password
        </span>
        <Form className="px-48">
          <Input
            onChange={handleChange}
            withAnimate
            label="oldPassword"
            id="oldPassword"
            type="password"
            placeholder="Old Password"
          />
          <Input
            onChange={handleChange}
            withAnimate
            label="newPassword"
            id="newPassword"
            type="password"
            placeholder="New Password"
          />
          <Input
            onChange={handleChange}
            withAnimate
            label="confirmPassword"
            id="confirmPassword"
            type="password"
            placeholder="Confirm New Password"
          />
          <Button className="bg-orange-500" onClick={changePassword}>
            <span>Change Password</span>
          </Button>
        </Form>
      </div>
      <Footer />
    </div>
  );
}
