import NavBar from "../../../Component/Navbar";
import Footer from "../../../Component/Footer";
import { NavLink, useNavigate, Form } from "react-router-dom";
import Input from "../../../Component/Input.jsx";
import InputDate from "../../../Component/InputDate.jsx";
import { motion } from "framer-motion";
import Button from "../../../Component/Button.jsx";
import { useState } from "react";

export default function EditCustomerProfile() {
  return (
    <>
      <NavBar />
      <div className="flex flex-col min-h-screen justify-center">
        <EditCustomerProfileContent />
      </div>
      <Footer />
    </>
  );
}

export function EditCustomerProfileContent() {
  return (
    <>
      <div className="flex flex-col px-20 w-1/2">
        <Header />
        <div className="py-2" />
        <EditForm />
      </div>
    </>
  );
}

export function EditForm() {
  const handleChange = (event) => {
    // console.log(`${event.target.name} : ${event.target.value}`);
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const gender = ["Male", "Female", "Prefer not to say"];
  let animate = {
    initial: { opacity: 0, y: -100 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };
  const editProfile = () => {};
  const navigate = useNavigate();
  const cancel = (event) => {
    event.preventDefault();
    navigate("/CustomerDashboard");
  };

  return (
    
    <Form onSubmit={editProfile} method="post">
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
        label="PhoneNumber"
        id="phoneNumber"
        type="Number"
        placeholder="Phone Number"
      />
      <div className="py-1" />
      <div className="grid grid-cols-2 gap-2">
        <div className="col-span-1">
          <motion.select
            {...animate}
            className="block w-full text-black border-0 py-3.5 px-3 shadow-sm ring-1 ring-inset ring-gray-200 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm rounded-2xl"
            onChange={handleChange}
            name="category_id"
            id="category_id"
            defaultValue={"Prefer not to say"}
          >
            {gender.map((gender) => (
              <option value={gender} key={gender}>
                {gender}
              </option>
            ))}
          </motion.select>
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
      <div className="py-2" />
      <div className="flex justofy-start">
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

export function Header() {
  return (
    <>
      <div className="flex flex-col items-start">
        <span className="font-bold text-orange-500 text-3xl">Edit profile</span>
        <span className="text-xl">Undo your mistake here</span>
      </div>
    </>
  );
}
