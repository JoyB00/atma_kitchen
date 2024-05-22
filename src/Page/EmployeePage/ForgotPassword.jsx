import Navbar from "../../Component/Navbar";
import Footer from "../../Component/Footer";
import { Form, useNavigate, useRouteLoaderData } from "react-router-dom";
import Input from "../../Component/Input";
import { useState } from "react";
import Button from "../../Component/Button";
import toast from "react-hot-toast";
import { ChangePasswordEmployee } from "../../api/AuthApi";
import { useParams } from "react-router-dom";
import { faChessKing } from "@fortawesome/free-solid-svg-icons";

export default function ForgotPasswordEmployeePage() {
  const id = useRouteLoaderData("load-id");
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

  const navigate = useNavigate();
  const changePassword = () => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }
    ChangePasswordEmployee(data).then((res) => {
      toast.success(res.message);
      if (id == 1) {
        navigate("/OwnerDashboard");
      } else if (id == 2) {
        navigate("/AdminDashboard");
      } else if (id == 3) {
        navigate("/MoDashboard");
      }
    });
  };

  return (
    <div>
      <Navbar />
      <div className="flex min-h-screen flex-col justify-center">
        <span className="text-2xl font-bold text-orange-500">
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

export function loader({ params }) {
  const id = params.roleId;
  console.log(id);
  return id;
}
