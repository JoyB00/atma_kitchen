import { useState } from "react";
import Input from "../Component/Input.jsx";
import InputDate from "../Component/InputDate.jsx";
import Checkbox from "../Component/Checkbox.jsx";
import { NavLink, useNavigate, Form } from "react-router-dom";
import Button from "../Component/Button.jsx";
import { RiseLoader } from "react-spinners";
import { SignUp } from "../api/AuthApi.jsx";
import toast from "react-hot-toast";
export default function FormRegister() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({});
  const [disabled, setDisabled] = useState(true);

  const handleChange = (event) => {
    // console.log(`${event.target.name} : ${event.target.value}`);
    setData({ ...data, [event.target.name]: event.target.value });
  };

  const handleCheck = (e) => {
    let isChecked = e.target.checked;
    if (isChecked) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const register = (event) => {
    event.preventDefault();
    setIsLoading(true);
    if (data.password !== data.confirmPass) {
      toast.error("Password Not Match", {
        style: {
          backgroundColor: "#000000",
          color: "#ffffff",
        },
        position: "bottom-right",
      });
      setIsLoading(false);
    } else {
      SignUp(data)
        .then((res) => {
          console.log(res.message);
          toast.success(res.message, {
            style: {
              backgroundColor: "#000000",
              color: "#ffffff",
            },
            position: "bottom-right",
          });
          setIsLoading(false);
          navigate("/login");
        })
        .catch((err) => {
          toast.error(err.message, {
            style: {
              backgroundColor: "#000000",
              color: "#ffffff",
            },
            position: "bottom-right",
          });
          setIsLoading(false);
          console.log(err.message);
        });
    }
  };
  return (
    <Form onSubmit={register} method="post">
      <Input
        onChange={handleChange}
        withAnimate
        label="Full Name"
        id="fullName"
        type="text"
        placeholder="Full Name"
      />
      <Input
        onChange={handleChange}
        withAnimate
        label="Email"
        id="email"
        type="Email"
        placeholder="Email"
      />
      <Input
        onChange={handleChange}
        withAnimate
        label="Password"
        id="password"
        type="Password"
        placeholder="Create Your Password"
      />
      <Input
        onChange={handleChange}
        withAnimate
        label="Password"
        id="confirmPass"
        type="Password"
        placeholder="Confirm Your Password"
      />
      <div className="grid grid-cols-2 gap-2">
        <div className="col-span-1">
          <Input
            onChange={handleChange}
            withAnimate
            label="PhoneNumber"
            id="phoneNumber"
            type="Number"
            placeholder="Phone Number"
          />
        </div>
        <div className="col-span-1 my-auto">
          <InputDate
            id="dateOfBirth"
            name="dateOfBirth"
            onChange={handleChange}
            placeholder="Date of Birth"
          />
        </div>
      </div>
      <Checkbox
        id="TermOfUse"
        label="I accept the Terms of Use & Privacy Policy"
        onChange={handleCheck}
      />
      <div className="my-5  grid grid-cols-1 ">
        <Button
          withoutAnimate
          disabled={disabled}
          type="submit"
          className={`mx-2 ${
            !disabled ? "bg-orange-500 hover:bg-orange-400" : "bg-orange-200"
          }  col-span-1 rounded-3xl py-3 drop-shadow-md  `}
        >
          {isLoading ? (
            <RiseLoader
              color="#ffffff"
              loading={isLoading}
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
            "Register"
          )}
        </Button>
      </div>
      <div className="flex justify-center">
        <p className="my-auto text-end text-black">Already have an account?</p>
        <NavLink
          className="mx-2 my-auto bg-transparent text-orange-500"
          to="/login"
        >
          Login here
        </NavLink>
      </div>
    </Form>
  );
}
