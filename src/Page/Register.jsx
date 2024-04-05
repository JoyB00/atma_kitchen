import Input from "../Component/Input.jsx";
import Navbar from "../Component/Navbar.jsx";
import InputDate from "../Component/InputDate.jsx";
import Checkbox from "../Component/Checkbox.jsx";
import Footer from "../Component/Footer.jsx";
import { NavLink } from "react-router-dom";
import Logo from "../assets/atmak-removebg.png";
import Lottie from "lottie-react";
import delivery from "../assets/delivery.json";
import chef from "../assets/chef.json";
import kue from "../assets/kue.json";
import React from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import Button from "../Component/Button.jsx";

export default function Register() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <>
      <Navbar />
      <div className="w-screen">
        <div className=" md:flex  bg-gradient-to-r from-cyan-100 via-transparent pt-24">
          <div className="w-1/2 pb-16 my-auto max-w-screen-md">
            <Slider {...settings}>
              <div className="px-8  drop-shadow-md">
                <Lottie animationData={kue} />
              </div>
              <div className=" px-8 drop-shadow-md">
                <Lottie animationData={chef} />
              </div>
              <div className="px-6 ms-12 drop-shadow-md">
                <Lottie animationData={delivery} />
              </div>
            </Slider>
          </div>
          <div className="w-1/2 my-auto">
            {/* Box register */}
            <motion.img
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              src={Logo}
              alt=""
              className="w-1/6 mx-auto"
            />
            <motion.div
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-gradient-to-b from-transparent to-orange-400 p-1 mx-20 rounded-3xl"
            >
              <div className="bg-white rounded-3xl px-9 py-8">
                <h2 className="font-semibold text-black text-5xl p-2 text-left">
                  Welcome!
                </h2>
                <p className="font-light text-black px-2 mb-4 text-left">
                  "A slice of delight, crafted with precision and love, a Lapis
                  Legit indulgence awaits.”
                </p>
                <Input
                  label="Full Name"
                  id="Full Name"
                  type="text"
                  placeholder="Full Name"
                />
                <Input
                  label="Email"
                  id="Email"
                  type="Email"
                  placeholder="Email"
                />
                <Input
                  label="Password"
                  id="Password"
                  type="Password"
                  placeholder="Create Your Password"
                />
                <Input
                  label="Password"
                  id="ConfirmPassword"
                  type="Password"
                  placeholder="Confirm Your Password"
                />
                <div className="grid grid-cols-2 gap-2">
                  <div className="col-span-1">
                    <Input
                      label="PhoneNumber"
                      id="PhoneNumber"
                      type="Number"
                      placeholder="Phone Number"
                    />
                  </div>
                  <div className="col-span-1 my-auto">
                    <InputDate placeholder="Date of Birth" />
                  </div>
                </div>
                <Checkbox
                  id="TermOfUse"
                  label="I accept the Terms of Use & Privacy Policy"
                />
                <div className="grid  grid-cols-1 my-5 ">
                  <Button
                    type="button"
                    className="mx-2 bg-orange-500 drop-shadow-md rounded-3xl col-span-1 py-3"
                  >
                    REGISTER
                  </Button>
                </div>
                <div className="flex justify-center">
                  <p className="text-black text-end my-auto">
                    Already have an account?
                  </p>
                  <NavLink
                    className="mx-2 bg-transparent my-auto text-orange-500"
                    to="/login"
                  >
                    Login here
                  </NavLink>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-cyan-100 via-transparent md:pt-20">
          <Footer />
        </div>
      </div>
    </>
  );
}
