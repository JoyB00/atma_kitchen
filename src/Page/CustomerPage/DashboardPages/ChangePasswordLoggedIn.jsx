import NavBar from "../../../Component/Navbar";
import Footer from "../../../Component/Footer";
import Input from "../../../Component/Input.jsx";
import Button from "../../../Component/Button.jsx";
import { NavLink, useNavigate, Form } from "react-router-dom";

export default function ChangePasswordLoggedIn() {
  return (
    <>
      <NavBar />
      <div className="flex min-h-screen w-4/6 flex-col justify-center px-20">
        <Header />
        <ChangePasswordLoggedInForm />
      </div>
      <Footer />
    </>
  );
}

export function Header() {
  return (
    <>
      <div className="flex flex-col items-start">
        <span className="text-3xl font-bold text-orange-500">
          Change Password
        </span>
        <span className="text-xl">
          Change your password frequently to keep your account secure!
        </span>
      </div>
    </>
  );
}

export function ChangePasswordLoggedInForm() {
  const changePassword = () => {};

  const navigate = useNavigate();
  const handleChange = (event) => {
    // console.log(`${event.target.name} : ${event.target.value}`);
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const cancel = (event) => {
    event.preventDefault();
    navigate("/CustomerDashboard");
  };

  return (
    <Form onSubmit={changePassword} method="post">
      <Input
        onChange={handleChange}
        withAnimate
        placeholder="Old password"
        id="oldPassword"
        type="password"
      />
      <Input
        onChange={handleChange}
        withAnimate
        placeholder="New password"
        id="newPassword"
        type="password"
      />
      <Input
        onChange={handleChange}
        withAnimate
        placeholder="Confirm new Password"
        id="confirmNewPassword"
        type="password"
      />
      <div className="py-2" />
      <div className="justofy-start flex">
        <Button className="bg-orange-500" withoutAnimate type="submit">
          Save changes
        </Button>
        <div className="px-1" />
        <Button className="" withoutAnimate onClick={cancel}>
          Cancel
        </Button>
      </div>
    </Form>
  );
}
