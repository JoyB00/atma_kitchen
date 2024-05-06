import { useState } from "react";
import Button from "../Component/Button.jsx";
import Input from "../Component/Input.jsx";
import { Form, NavLink } from "react-router-dom";
import { SignIn } from "../api/AuthApi.jsx";
import { useNavigate } from "react-router-dom";
import { RiseLoader } from "react-spinners";
import toast from "react-hot-toast";
export default function FormLogin() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    SignIn(data)
      .then((res) => {
        console.log(res.user.role_id);
        if (res.user.role_id === 2) {
          navigate("/AdminDashboard");
        } else if (res.user.role_id === 3) {
          navigate("/MoDashboard");
        } else if (res.user.role_id === 1) {
          navigate("/OwnerDashboard");
        } else {
          navigate("/");
        }
        sessionStorage.setItem("token", res.access_token);
        sessionStorage.setItem("user", JSON.stringify(res.user));

        toast.success(res.message, {
          style: {
            backgroundColor: "#000000",
            color: "#ffffff",
          },
          position: "bottom-right",
        });
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message, {
          style: {
            backgroundColor: "#000000",
            color: "#ffffff",
          },
          position: "bottom-right",
        });
        setLoading(false);
      });
  };

  return (
    <Form onSubmit={handleSubmit} method="post">
      <Input
        withAnimate
        label="Email"
        id="email"
        type="Email"
        placeholder="Email"
        onChange={handleChange}
      />
      <Input
        withAnimate
        label="Password"
        id="password"
        type="Password"
        placeholder="Password"
        onChange={handleChange}
      />
      <div className="flex justify-start mb-5">
        <NavLink
          className="mx-2 bg-transparent my-auto text-orange-500 lg:text-base md:text-sm"
          to="/forgotPassword"
        >
          Forgot Password?
        </NavLink>
      </div>
      <div className="grid  grid-cols-1 mb-5 ">
        <Button
          className="mx-2 bg-orange-500 drop-shadow-md rounded-3xl col-span-1 py-3"
          type="submit"
        >
          {loading ? (
            <RiseLoader
              color="#ffffff"
              loading={loading}
              cssOverride={{
                display: "block",
                margin: "0 auto",
                borderColor: "red",
              }}
              size={10}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            "LOGIN"
          )}
        </Button>
      </div>
    </Form>
  );
}
