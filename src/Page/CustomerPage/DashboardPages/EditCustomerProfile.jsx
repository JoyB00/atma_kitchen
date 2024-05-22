import NavBar from "../../../Component/Navbar";
import Footer from "../../../Component/Footer";
import { NavLink, useNavigate, Form } from "react-router-dom";
import Input from "../../../Component/Input.jsx";
import InputDate from "../../../Component/InputDate.jsx";
import { motion } from "framer-motion";
import Button from "../../../Component/Button.jsx";
import { useState, useEffect } from "react";
import { GetCustomerById, UpdateCustomer } from "../../../api/CustomerApi.jsx";
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
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    gender: "",
    dateOfBirth: "",
  });

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const customerData = await GetCustomerById(); 
        setFormData({
          fullName: customerData.fullName,
          phoneNumber: customerData.phoneNumber,
          gender: customerData.gender,
          dateOfBirth: customerData.dateOfBirth,
        });
      } catch (error) {
        console.log("Error fetching customer data: ", error);
      }
    };
    fetchCustomerData();
  }, []);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await UpdateCustomer(formData); 
      console.log("Customer data updated successfully!");
    } catch (error) {
      console.log("Error updating customer data: ", error);
    }
  };

  const genderOptions = ["Male", "Female", "Prefer not to say"];

  return (
    <Form onSubmit={handleSubmit} method="post">
      <Input
        onChange={handleChange}
        value={formData.fullName}
        name="fullName"
        type="text"
        placeholder="Full Name"
      />
      <Input
        onChange={handleChange}
        value={formData.phoneNumber}
        name="phoneNumber"
        type="number"
        placeholder="Phone Number"
      />
  <div className="py-1" />
    <div className="grid grid-cols-2 gap-2">
      <div className="col-span-1">
      <motion.select
        onChange={handleChange}
        value={formData.gender}
        name="gender"
      >
        {genderOptions.map((gender) => (
          <option value={gender} key={gender}>
            {gender}
          </option>
        ))}
        </motion.select>
        </div>
        <div className="col-span-1 my-auto">
          <Input
            onChange={handleChange}
            value={formData.dateOfBirth}
            name="dateOfBirth"
            type="date"
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
